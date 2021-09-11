<template>
  <div class="home">
    <h1>MEMORY</h1>
    <button v-if="!gameHasStarted" @click.stop.prevent="getImages">New Game</button>
    <game-board v-else></game-board>
  </div>
</template>

<script>
import GameBoard from '../components/GameBoard.vue'
import Store from '../store'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
    GameBoard
  },
  computed:{
    ...mapState(['gameHasStarted'])
  },
  methods: {
    getImages(){
      Store.dispatch('fetchImages', 8)
    }
  }
}
</script>

<style lang="scss" scoped>
  h1{
    margin: 50px;
  }
  button{
    position: relative;
    width: 20%;
    min-width: 200px;
    height: 50px;
    font-size: 2em;
    top: 30vh;
    border: none;
    border-radius: 20px;
    background-color: rgb(160, 66, 32);
    color: white;
    &:hover{
      transform: scale(1.08);
    }
    &:focus{
      transform: scale(1.08);
      background-color: rgb(196, 114, 84);
    }
  }
</style>
