import Vue from 'vue'
import Vuex from 'vuex'
import {Card} from '../models/card'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
    count: 0,
    totalCount:0,
    currentTurn : [],
    loadingStatus: null,
    gameHasStarted: false,
    gameHasFinished: false,
    gameIsReady:false
  },
  getters: {
    flippedCards(state){
      let lengthOfCompleted = state.images.filter(img => !img.hidden).length;
      console.log(lengthOfCompleted);
      if(state.images.length == lengthOfCompleted){
        return true;
      }
    }
  },
  mutations: {
    RESTART(state){
      state.images = [];
      state.gameIsReady = false;
      state.gameHasFinished = false;
      this.dispatch('fetchImages', 8);

    },
    START_GAME(state){
      state.gameHasStarted = true;
      state.loadingStatus = "Preparing a new deck";
      state.totalCount = 0;
    },
    INCREMENT(state, payload){
        state.count++;
        state.totalCount++;
        state.currentTurn.push(payload);
        this.commit('CHECKCOUNT');
    },
    CHECKCOUNT(state){
      if(state.count == 2) setTimeout(() => {
        this.commit('CHECKVALID');
      }, 1500); 
    },
    CHECKVALID(state){
      if(state.currentTurn[0].id === state.currentTurn[1].id){
        console.log(state.currentTurn[0].id, state.currentTurn[1].id);
        state.currentTurn = [];
        state.count = 0;
      }else{
        state.images[state.currentTurn[0].index].hideCard();
        state.images[state.currentTurn[1].index].hideCard();
        state.currentTurn = [];
        state.count = 0;
      }
    },
    SHUFFLE_IMAGES(state, payload){
      state.loadingStatus = "Shuffling the cards";
      let array = payload;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      state.images = array;
      setTimeout(()=>state.gameIsReady = true, 1000);  
    }
  },
  actions: {
    incrementCount(context, payload){
      if (this.state.count < 2){
        context.commit('INCREMENT', payload);
      }
    },
    async fetchImages(context, payload){
      this.commit('START_GAME');
      
      const imgs = [];
      for(let i = 0; i < payload; i++){
        await fetch("https://picsum.photos/100/150.jpg", {
          method: 'GET'
        }).then(res=> imgs.push(res.url))
        .catch(err=> console.log(err));
      }
      this.dispatch('set_images', imgs);  
    },
    set_images(state, payload){
      const imagesToShuffle = [];
      for(let i = 0; i < payload.length; i++){
        let img1 = new Card(i, payload[i]);
        let img2 = new Card(i, payload[i]);
        imagesToShuffle.push(img1, img2);
      }
      this.commit('SHUFFLE_IMAGES', imagesToShuffle);
    },
    restart(){
      this.commit('RESTART');
    }
  },
  modules: {
  }
})
