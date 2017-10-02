import * as FacingOptions from "./FacingOptions.js";

/**
 * Class representing a robot 
 */
class Robot {
    /**
     * create a instance of robot class
     * @param {string} [facing] the initial facing of the robot.
     */
    constructor(facing) {
        this.facing=null;
        this.tabletop=null;
        this.x=null;
        this.y=null;
        if (facing) this.setFacing(facing);
    }

    /**
     * Check whether the robot has been placed on tabletop
     * @return {boolean}
     */
    isOnTabletop() {
        return this.tabletop?true:false;
    }

    /**
     * Set the facing of the robot
     * @param {string} f 
     */
    setFacing(f) {
        if (typeof f!="string") {
            throw new Error("Invalid facing parameter type!");
        }
        f=f.toUpperCase();
        if (!FacingOptions.isValid(f)) {
            throw Error("Invalid facing parameter value: "+f);
        }
        this.facing=f;
    }

    /**
     * Place robot on x,y position of tabletop with f facing
     * @param {Tabletop} tabletop 
     * @param {number} x
     * @param {number} y 
     * @param {string} f facing of the robot
     */
    place(tabletop, x, y, f) {
        if (!tabletop) throw new Error("Invalid tabletop parameter!");
        if (tabletop.isOutOfBoundary(x, y)) {
            throw new Error(x+","+y+" is out of tabletop boundary!");
        }
        this.setFacing(f);
        this.tabletop=tabletop;
        this.x=x;
        this.y=y;
    }

    /**
     * Make robot turn left
     */
    left() {
        if (!this.isOnTabletop()) return;
        if (!this.facing) return;
        let degree=FacingOptions.facingToDegree(this.facing);
        degree-=90;
        this.facing=FacingOptions.degreeToFacing(degree);
    }

    /**
     * Make robot turn right
     */
    right() {
        if (!this.isOnTabletop()) return;
        if (!this.facing) return;
        let degree=FacingOptions.facingToDegree(this.facing);
        degree+=90;
        this.facing=FacingOptions.degreeToFacing(degree);
    }

    /**
     * Make robot move further
     */
    move() {
        if (!this.isOnTabletop()) return;
        let [dx, dy]=FacingOptions.getFacingMoment(this.facing);
        let nx=this.x+dx;
        let ny=this.y+dy;
        if (this.tabletop.isOutOfBoundary(nx, ny)) return;
        this.x=nx;
        this.y=ny;
    }

    /**
     * Make robot report current position
     * @return {object}
     */
    report() {
        if (!this.isOnTabletop()) return;
        return {
            x: this.x,
            y: this.y,
            facing: this.facing,
        };
    }
}

export default Robot;
