<template>
  <div class="game-play">
    
    <div class="heading">
      <h1>POKEMON MEMMORIES</h1>
      <h3>PLAY</h3>
      <span>Time: </span><span> {{ displayduration }}</span>
    </div>

    <div class="control">
        <Button 
          class_name ="btn btn-primary"
           @click-action = "playNew"
        
        >New Play</Button>
        <Button 
          class_name ="btn btn-warn"
          @click-action = "playBreak"
        >Play Break</Button>
       
        <Button 
          class_name ="btn btn-danger"
          @click-action = "playCancel"
        >Cancel</Button>
    </div>
    
    <div class="card-wrapper" :style = "styleCardWrapper" >
      <card class="card"
        v-for="card in cardsContext"
        :key="card.index"
        :ref="'card-' + card.index"
        :card="card"
        :rules="rules"
        :height="height"
        @onFlip="checkRule($event)"
      >
      </card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import Button from './Button.vue';

export default {
  name: 'Interact',

  data() {
    return {
      rules: [],
      duration: -1,
      intervalId:0,
      flippedCount:0,
      isBreaked: false,
    };

  },

  props: {
    config: {
      type: Object,
      default: () => {},
    },

    cardsContext: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.height = this.config.rows > 4 ? 80 : 100;
  },

  computed: {
    isPlayed () {
        if (this.cardsContext.length === this.flippedCount) {
           clearInterval(this.intervalId);
           return true
        } 
         else return false
    }, 

    displayduration(){
      if (this.duration === -1 )
         return '';
        
      let ms = '0' + (this.duration % 100).toString() ;
      return Math.floor(this.duration/100)  + ':' + ms.slice(-2)
    },

    styleCardWrapper() {
      return {
        gridTemplateColumns: `repeat(${this.config.cols}, auto)`,
        gridTemplateRows: `repeat(${this.config.rows}, auto)`,
        'grid-gap': this.config.rows > 4 ? '5px' : '10px',
      };
    },
  },

  components: {
    Card,
    Button,
  },

  methods: {
    playCancel() {
       this.$emit('PlayCancel')
    }, 

    playBreak(){
        clearInterval(this.intervalId);
        this.isBreaked = true;
    },

    playNew(){
        this.isBreaked = false;
        this.duration = -1;
        clearInterval(this.intervalId);
        this.flippedCount = 0;
        this.rules = [];
        const cardLength = this.cardsContext.length
        for(let i=0 ; i < cardLength; i++) 
          this.$refs[`card-${i}`].onFlipBackCard();
    },

    timerStart() {
          if (this.isBreaked)
            this.isBreaked = false
          else
            this.duration = 0;

          this.intervalId = setInterval (() => {
                this.duration++
          }, 10) 
  
      },

    checkRule(card) {

      if (this.duration== -1 || this.isBreaked ){
         this.timerStart()
      }
     
      if (this.rules.length == 2) {
        return;
      } else this.rules.push(card);

      if (this.rules.length == 2) {
        if (this.rules[0].value === this.rules[1].value) {
          this.rules = [];
          this.flippedCount +=2;

        } else {
          setTimeout(() => {
            this.$refs[`card-${this.rules[0].index}`].onFlipBackCard();
            this.$refs[`card-${this.rules[1].index}`].onFlipBackCard();
            this.rules = [];
          }, 800);
        }
      }
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  display: grid;
  position: relative;
  margin: 10px auto;
  padding: 20px 20px;
  height: calc(100vh -100px);
  align-items: center;
  justify-content: center;
  grid-gap: 5px;
  background-color: var(--dark);
 
}
.heading{
 color: white
}

.control {
  margin-top: 35px;
}

</style>
