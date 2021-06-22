<template>
  <div class="card" :style="styleCard">
    <div
      class="card__inner"
      @click="toggleCard" 
      :class="{ 'is-flipped': isFlipped }"     
    >
      <div class="card__face card__face--front">
        <div class="card__content"
           :style="{
            'background-size': `${height * 0.75 / 3 }px ${(height * 0.75) / 3}px`,
          }"
        ></div>
      </div>

      <div class="card__face card__face--back">
        <div class="card__content" :style="styleBackFace"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  data() {
    return {
      isFlipped: false,
      styleCard: {}
    };
  },
 
  props: {
    height: {
      type: Number,
      default: () => 100,
    },

    rules: {
        type: Array,
        default:()=> []
    },

    card: {
      type: Object,
      default: () => {},
    },
  },

  mounted() {
    this.styleCard = {
      width: this.height * 0.75 + 'px',
      height: this.height + 'px',  
      perspective:  `${this.height*0.5}px`
    }
  },

  computed: {
    styleBackFace() {
      return {
        backgroundImage: `url(${require('@/assets/' + this.card.img)})`,
      };
    },
  },

  methods: {
    toggleCard() {
       if (this.isFlipped || this.rules.length === 2) return
          this.isFlipped = true;
       this.$emit('onFlip', this.card);
    },

    onFlipBackCard() {
      this.isFlipped = false;
    },

  },
};
</script>

<style scopes lang="css">

.card {
  display: inline-block;
   margin-right: 1rem;
  margin-bottom: 1rem;
}

.card__inner {
  position: relative;
  height: 100%;
  width: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
}


.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  backface-visibility: hidden;
  box-shadow: 0 3px 18px 3px rgba(0, 0, 0, 0.4);
}

.card__inner.is-flipped {
  transform: rotateY(-180deg);
}

.card__face--front .card__content {
  width: 100%;
  height: 100%;
  background: url('../assets/images/icon_back.png') no-repeat center center;
 
}

.card__face--back {
  background-color: var(--light);
  transform: rotateY(-180deg);
}

.card__face--back .card__content {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
