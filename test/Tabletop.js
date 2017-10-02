import {assert} from "chai";
import Tabletop from "../src/Tabletop.js";

let tabletop;

describe("Test Tabletop Class", function() {
    it("Create an instance of Tabletop class with width 6 & height 8", function() {
        tabletop=new Tabletop(6, 8);
        assert.typeOf(tabletop, "object");
    });

    it("The width of created Tabletop instance should be 6", function() {
        assert.equal(tabletop.width, 6);
    });

    it("The height of created Tabletop instance should be 8", function() {
        assert.equal(tabletop.height, 8);
    });

    it("Should return true when call method isOutOfBoundary with 1, 4", function() {
        assert.equal(tabletop.isOutOfBoundary(1, 4), false);
    });

    it("Should return false when call method isOutOfBoundary with 7, 8", function() {
        assert.equal(tabletop.isOutOfBoundary(7, 8), true);
    });
});
