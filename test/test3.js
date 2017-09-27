import { assert } from 'chai';

import * as commands from "../src/commands";
import Player from "../src/Player.js";
import eventBus,{ reset as eventBusReset } from "../src/EventBus.js";
import Robot from "../src/Robot.js";
import Tabletop from "../src/Tabletop.js";

eventBusReset();

const player=new Player(eventBus,Robot,Tabletop);
let lastOutput=null;

describe('Test Robot Command Sequence Three', function() {
    
    it('PLACE 1,2,EAST', function() {
        commands.PLACE().send({
            x:1,
            y:2,
            facing:'EAST'
        });
    });

    it('MOVE', function() {
        commands.MOVE().send();
    });

    it('MOVE', function() {
        commands.MOVE().send();
    });

    it('LEFT', function() {
        commands.LEFT().send();
    });

    it('MOVE', function() {
        commands.MOVE().send();
    });

    it('REPORT',function(done) {
        let callBack=function(output){
            lastOutput=output;
            done();
            eventBus.removeListener('output',callBack);
        }
        eventBus.on('output',callBack);
        commands.REPORT().send();
    });

    it('Output should be: 3,3,NORTH', function() {
        assert.equal(lastOutput,'3,3,NORTH');
    });
});