import * as FacingOptions from './FacingOptions.js';

class Robot{

    constructor(eventBus,facing){
        if(!eventBus) throw new Error('Invalid empty eventBus parameter!');
        this.eventBus=eventBus;
        this.facing=null;
        this.tabletop=null;
        this.x=null;
        this.y=null;
        if(facing) this.setFacing(facing);
        eventBus.addListener.on();
    }

    setFacing(f){
        if(typeof f!='string') throw new Error('Invalid facing parameter type!');
        f=f.toUpperCase();
        if(FacingOptions.isValid(f) === -1) throw Error("Invalid facing parameter value: "+f);
        this.facing=f;
    }

    place(tabletop,x,y,f){
        if(!tabletop) throw new Error("Invalid empty tabletop parameter!");
        if(!x) throw new Error("Invalid empty tabletop x!");
        if(!y) throw new Error("Invalid empty tabletop y!");
        this.tabletop=tabletop;
        this.x=x;
        this.y=y;
        this.setFacing(f);
    }

    left(){
        if(!this.facing) return;
        let degree=this.facingToDegree(this.facing);
        degree-=90;
        this.facing=this.degreeToFacing(degree);
    }

    right(){
        if(!this.facing) return;
        let degree=this.facingToDegree(this.facing);
        degree+=90;
        this.facing=this.degreeToFacing(degree);
    }

    move(){
        let [dx,dy]=FacingOptions.getFacingMoment(this.facing);
        let nx=this.x+dx;
        let ny=this.y+dy;
        if(this.tabletop.isOutOfBoundary(nx,ny)) return;
        //-- todo to complete
    }
}
Robot.facingOptions={}["WEST","NORTH","EAST","SOUTH"];
