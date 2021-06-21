<template>
    <div class="level"
        @click= "handleLevelSelect"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Level',
    methods:{
        handleLevelSelect(){
           this.$emit('LevelSelect');
        }
    }

}
</script>
<style scopred>

.level {
    display:flex;
    flex-direction: column;
    width: 120px;
    height: 120px;
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 1px, 1px 2px rgba(0,0,0,0.8);
    transition: transform 0.5s;
    border: 2px solid white;
}
.level:hover {
    background-color: aliceblue;
    color: rgba(0,0,0,0.7);
    transform: scale(0.98);
}

.level ~ .level { 
    margin-left: 5px;
}

p {
    padding:0;
    margin:0;
}
</style>