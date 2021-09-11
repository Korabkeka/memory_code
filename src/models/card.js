export class Card{
    constructor(id, url, hidden = true){
        this.id = id;
        this.url = url;
        this.hidden = hidden;
    }
    showCard(){
        return this.hidden = false;
    }
    hideCard(){
        return this.hidden = true;
    }
}