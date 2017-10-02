/**
 * Class representing a tabletop
 */
class Tabletop {
    /**
     * create a tabletop
     * @param {number} [width=5] width of the tabletop to be created
     * @param {number} [height=5] height of the tabletop to be created
     */
    constructor(width=5, height=5) {
        this.width=width;
        this.height=height;
    }

    /**
     * Check whether a position is out of the boundary of the tabletop
     * @param {*} x 
     * @param {*} y 
     * @return {boolean}
     */
    isOutOfBoundary(x, y) {
        if (x<0 || y<0) return true;
        if (x>(this.width-1)) return true;
        if (y>(this.height-1)) return true;
        return false;
    }
}

export default Tabletop;
