import * as FacingOptions from "./FacingOptions.js";

class Robot{

    constructor(eventBus,facing){
        if(!eventBus) throw new Error('Invalid empty eventBus parameter!');
        this.eventBus=eventBus;
        this.facing=null;
        this.tabletop=null;
        this.x=null;
        this.y=null;
        if(facing) this.setFacing(facing);
    }

    isOnTabletop(){
        return this.tabletop?true:false;
    }

    setFacing(f){
        if(typeof f!='string') throw new Error('Invalid facing parameter type!');
        f=f.toUpperCase();
        if(FacingOptions.isValid(f) === -1) throw Error("Invalid facing parameter value: "+f);
        this.facing=f;
    }

    place(tabletop,x,y,f){
        if(!tabletop) throw new Error("Invalid tabletop parameter!");
        if(!x) throw new Error("Invalid x parameter!");
        if(!y) throw new Error("Invalid y parameter!");
        if(tabletop.isOutOfBoundary(x,y)) throw new Error(`${x},${y} is out of tabletop boundary!`);
        this.tabletop=tabletop;
        this.x=x;
        this.y=y;
        this.setFacing(f);
    }

    left(){
        if(!this.isOnTabletop()) return;
        if(!this.facing) return;
        let degree=this.facingToDegree(this.facing);
        degree-=90;
        this.facing=this.degreeToFacing(degree);
    }

    right(){
        if(!this.isOnTabletop()) return;
        if(!this.facing) return;
        let degree=this.facingToDegree(this.facing);
        degree+=90;
        this.facing=this.degreeToFacing(degree);
    }

    move(){
        if(!this.isOnTabletop()) return;
        let [dx,dy]=FacingOptions.getFacingMoment(this.facing);
        let nx=this.x+dx;
        let ny=this.y+dy;
        if(this.tabletop.isOutOfBoundary(nx,ny)) return;
        this.x=nx;
        this.y=ny;
    }

    report(){
        if(!this.isOnTabletop()) return;
        eventBus.emit('output',`${this.x},${this.y},${this.facing}`);
    }
}
Robot.facingOptions={}["WEST","NORTH","EAST","SOUTH"];

export default Robot;
