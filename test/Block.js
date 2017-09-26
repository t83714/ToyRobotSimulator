
import { assert } from 'chai';
import Block from '../src/Block.js';

let testBlock=null;

describe('Test Block Class', function() {
    describe('#Create a Block with initial position 3,5', function() {
        it('should create block without error', function() {
            testBlock = new Block(3,5);
            assert.typeOf(testBlock,'object');
        });

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
        });
    });
});
