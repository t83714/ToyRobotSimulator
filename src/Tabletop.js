class Tabletop{

    constructor(eventBus,width=5,height=5){
        if(!eventBus) throw new Error('Invalid empty eventBus parameter!');
        this.eventBus=eventBus;
        this.width=width;
        this.height=height;
    }

    isOutOfBoundary(x,y){
        if(x<0 || y<0) return true;
        if(x>(this.width-1)) return true;
        if(y>(this.height-1)) return true;
        return false;
    }
}

export default Tabletop;