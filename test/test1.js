import { assert } from 'chai';

import * as commands from "../src/commands";
import Player from "../src/Player.js";
import eventBus from "../src/EventBus.js";
import Robot from "../src/Robot.js";
import Tabletop from "../src/Tabletop.js";

const player=new Player(eventBus,Robot,Tabletop);
let lastOutput=null;

describe('Test Robot Command Sequence One', function() {
    it('PLACE 0,0,NORTH', function() {
        commands.PLACE.send({
            x:0,
            y:0,
            facing:'NORTH'
        });
    });

    it('MOVE', function() {
        commands.MOVE.send();
    });

    it('REPORT',function(done) {
        eventBus.on('output',function(output){
            lastOutput=output;
            done();
        });
        commands.REPORT.send();
    });

    it('Output should be: 0,1,NORTH', function() {
        assert.equal(lastOutput,'0,1,NORTH');
    });
});