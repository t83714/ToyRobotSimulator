import { assert } from 'chai';
import eventBus from '../src/EventBus.js';
import Block from '../src/Block.js';
import Tabletop from '../src/Tabletop.js';

let testTabletop=null;

describe('Test Tabletop Class', function() {
    describe('#Create a Tabletop with default parameter', function() {
        it('should create a 5x5 Tabletop without error', function() {
            testTabletop = new Tabletop(eventBus,Block);
            assert.typeOf(testTabletop,'object');
            assert.equal(testTabletop.blocks.length,5);
            for(let i=0;i<testTabletop.blocks.length;i++){
                assert.equal(testTabletop.blocks[i].length,5);
            }
        });

        it("Each block's position should match tabletop array index", function() {
            for(let x=0;x<testTabletop.blocks.length;x++){
                for(let y=0;y<testTabletop.blocks[x].length;y++){
                    assert.equal(testTabletop.blocks[x][y].x,x);
                    assert.equal(testTabletop.blocks[x][y].y,y);
                }
            }
        });

        /*
        it('Newly created block object should have position 3,5', function() {
            assert.equal(testBlock.x, 3);
            assert.equal(testBlock.y, 5);
        });

        it('Should allow place an object on the block', function() {
            var testObj={};
            testBlock.place(testObj);
            assert.equal(testBlock.obj, testObj);
        });

        it('Attempt to place another object before remove object on block will trigger an error', function(done) {
            try{
                var testObj2={};
                testBlock.place(testObj2);
            }catch(e){
                assert.equal(e.message, "Cannot place an object on a non-emplty block!");
                done();
                return;
            }
            done(new Error("No error has been thrown!"));
        });

        it('Should allow an object to be remove from block', function() {
            testBlock.remove();
        });

        it('Place another object after remove object on block will not trigger an error', function() {
            var testObj3={};
            testBlock.place(testObj3);
            assert.equal(testBlock.obj, testObj3);
        });*/

    });
});