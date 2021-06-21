<template>
<div class="screen">
    <h1>Poke Memories</h1>
    <p>Select mode to start game</p>
    <div class="modes">
      <Level 
        v-for= "(level, index) in matchLevels"
        :key = "index"
        @level-select = "handleLevelSelect(level.cols, level.rows)"
        >
        <span class='title'>{{level.title}}</span>
        <span class='desc'>{{level.desc}}</span>
      </Level>
    </div>
  </div>

</template>

<script>

import Level from '@/components/Level.vue';
export default {
  name: 'MainScreen',

  data(){
    return{
    }
  },

  props:{
    matchLevels: {
      type : Array,
      default: ()=> []
    }
  },

  methods:{
    handleLevelSelect(cols, rows){
      var config = {
         totalOfBlocks: cols * rows,
         rows: rows,
         cols: cols,
      }
      
      this.$emit('LevelSelect', config)
    }
  }, 

  components:{
    Level,
  }
  
};
</script>

<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
}

.screen h1 {
  font-size: 4.5rem;
  text-transform: uppercase;
}

.screen p {
  font-size: 2rem;
}

.modes {
  display: flex;
  margin-top: 2rem;
}

.modes button {
  font: var(--font);
  width: 150px;
  height: 150px;
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--light);
  color: var(--light);
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 0 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.modes button:hover {
  background-color: var(--light);
  color: var(--dark);
}

.modes button span:first-child {
  font-size: 2rem;
}

.modes button span:last-child {
  display: block;
  font-size: 1.25rem;
  margin-top: 0.5rem;
}
</style>
