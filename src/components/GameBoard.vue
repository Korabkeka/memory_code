<template>
    <div>
        <section>
            
            <div class="status" v-if="!gameIsReady">
                <p> {{ loadingStatus }}</p>
            </div>
            <div v-else class="gameBoard">
                <transition name="slideIn">
                    <div class="endGameScreen" v-if="flippedCards">
                        <p> Congratulation! You won in {{ totalCount }} moves!</p>
                        <button @click.stop.prevent="restart">PLAY AGAIN</button>
                    </div>
                </transition>
                
                <ul >
                    <card class="card" v-for="(img, index) in images" :img="img" :key="index"></card>
                </ul>
            </div>
            

        </section>
    </div>
</template>

<script>
import Card from './Card.vue'
import {mapActions, mapGetters, mapState} from 'vuex'
export default {
    name: "GameBoard",
    components: {
        Card
    },
    computed: {
        ...mapState(['images', 'gameIsReady', 'loadingStatus', 'gameHasFinished', 'totalCount']),
        ...mapGetters(['flippedCards'])
    },
    methods:{
        ...mapActions(['restart'])
    }
}
</script>

<style lang="scss" scoped>
    .status{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top:42vh;
        left: 35vw;
        width: 30%;
        min-width: 200px;
        height: 50px;
        font-size: 2em;
        padding: 10px;
        background-color: black;
        color: white;
    }
    .gameBoard{
        width: 500px;
        height: 680px;
        margin: 0 auto;
        overflow: hidden;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        width: 440px;
        justify-content: space-around;
        margin: 20px auto;
        padding: 10px;
    }
    .endGameScreen{
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 10;
        width: 500px;
        height: 680px;
        background-color: whitesmoke;
        opacity: 0.9;
        justify-content: center;
        align-items: center;
        & p{
            font-size: 3rem;
        }
        & button{
            width: 30%;
            height: 50px;
            background-color: rgba($color: rgb(196, 113, 58), $alpha: 1.0);
            border-radius: 20px;
            border-style: double;
            font-weight: 900;
            &:hover{
                background-color: rgba($color: rgb(121, 61, 22), $alpha: 1.0);
                transform: scale(1.05);
            }
        }
    }
    .slideIn-enter-active{
        transition: all;
        transition-duration: 1s;
        transform: translateY(0);
    }
    .slideIn-enter{
        transform: translateY(-1000px);
    }
</style>