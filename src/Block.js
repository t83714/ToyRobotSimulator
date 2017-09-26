class Block{

    constructor(x,y){
        this.x=x;
        this.y=y;
        this.obj=null;
    }

    place(obj){
        if(this.obj) throw new Error('Cannot place an object on a non-emplty block!');
        this.obj=obj;
    }

    remove(){
        this.obj=null;
    }
}

export default Block;