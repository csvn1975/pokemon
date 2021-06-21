<template>
  <div id="app">
    <div class="game-box">
      <MainScreen
        @level-select = "handleBeforeStart"
        v-if = "matchStatus === 'default'"
        :matchLevels = "matchLevels"
      > Level {{rows}} x {{rows}}
      </MainScreen>

      <Interact
          v-if = "matchStatus === 'play'"
          :config = "setting.config"
          :cardsContext = "cardsContext"
          @play-cancel = "matchStatus = 'default'"
      ></Interact>

    </div>
      
  </div>
</template>

<script>
import MainScreen from './components/MainScreen.vue'
import Interact from './components/Interact.vue'
import MatchLevels from '@/config/app.js'
import {array_shuff, array_range, array_random } from '@/utilities/array_func.js'

export default {
  name: 'App',
  data(){
    return {
      setting: {
         config: {},
      },
      cardsSeleted: [],
      cardsContext: [],
      matchLevels: MatchLevels,
      matchStatus: 'default',
    }
  },

  methods:{
    setCardsContext(cards) {
      cards.forEach((card, index) => {
        this.cardsContext.push({
          value : card,
          index : index,
          img : `images/${card}.png`,
        })
      }) 
    },
   
    handleBeforeStart(config) {
   
      this.setting.config = { ... config }

      /* random card number  */
      let cards = array_random( array_range(1, 64), config.totalOfBlocks / 2) ;

      /* duplicatio a card and mixer position*/
      cards = array_shuff([...cards, ...cards]);
      this.setCardsContext(cards);
      this.matchStatus = 'play';

    }, 
  }, 
  

  components:{
    MainScreen,
    Interact,
  }
}
</script>

<style scoped>
* {
  padding:0;
  margin:0;
}

.game-box {
  margin-top: 20px;
  text-align:center;
  justify-content: center;
  height: 500px;
}

.game-box > h1 {
   color: red;
}
div.button {
  background-color: white
}

</style>
