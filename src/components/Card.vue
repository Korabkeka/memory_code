<template>
    <div class="card"  @click.stop.prevent="flippCard">
        <div class="card-inner" v-bind:class="{'hidden': img.hidden, 'shown':!img.hidden}">
            <div class="cardFront">
                <img src="dosdecarte.jpg" alt="">
            </div>
            <div class="cardBack">
                <img :src="img.url" alt="">
            </div>
        </div>    
    </div>
</template>

<script>
import Store from '../store'
import {mapState} from 'vuex';
export default {
    name: "Card",
    props: ['img'],
    watch: {

    },
    computed: {
        ...mapState(['count', 'images'])
    },
    methods: {
        flippCard(){
            if(this.img.hidden && this.count < 2){
                this.img.showCard();
                Store.dispatch('incrementCount', {id:this.img.id, index: this.images.indexOf(this.img)});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .card{
        width: 100px;
        height: 150px;
        margin: 5px;
        perspective: 1000px;
        &-inner{
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            //transform: rotateY(180deg);
            &.shown{
                animation-name: flip;
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
            }
            &.hidden{
                animation-name: unflip;
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
            }
        }
        &Front{
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            background-color: black;
            background-image: url("dosdecarte.jpg");
            background-size: contain;
            background-repeat: no-repeat;
            //transform: rotateY(180deg);
        }
        &Back{
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            transform: rotateY(180deg);
        }
    }
    @keyframes flip {
        from{
            transform: rotateY(0);
        }
        to{
            transform: rotateY(180deg);
        }
    }
    @keyframes unflip {
        from{
            transform: rotateY(180deg);
        }
        to{
            transform: rotateY(0);
        }
    }
</style>