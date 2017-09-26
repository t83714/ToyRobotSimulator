class Tabletop{

    constructor(eventBus,BlockClass,width=5,height=5){
        if(!eventBus) throw new Error('Invalid empty eventBus parameter!');
        if(!BlockClass) throw new Error('Invalid empty BlockClass parameter!');
        this.blocks=null;
        this.eventBus=eventBus;
        this.createTabletop(BlockClass,width,height);
    }

    createTabletop(BlockClass,w,h){
        if(this.blocks) throw new Error('Cannot re-create table!');
        if(w<1) throw new Error("Cannot create tabletop with incorrect width: "+w);
        if(h<1) throw new Error("Cannot create tabletop with incorrect height: "+h);
        this.blocks=[];
        for(let x=0;x<w;x++){
            let col=[];
            for(let y=0;y<h;y++){
                let newBlock = new BlockClass(x,y);
                col.push(newBlock);
            }
            this.blocks.push(col);
        }
    }

    isOutOfBoundary(x,y){
        if(x<0 || y<0) return true;
        if(x>(this.blocks.length-1)) return true;
        if(y>(this.blocks[x].length-1)) return true;
        return false;
    }
}

export default Tabletop;