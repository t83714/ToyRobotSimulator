import * as CmdTypes from './types';
import Command from './Command.js';

export let PLACE = new Command(CmdTypes.PLACE,function(robot,tabletop,payload){
    let {x,y,facing}=payload;
    robot.place(tabletop,x,y,facing);
});

export let MOVE = new Command(CmdTypes.MOVE,function(robot,tabletop){
    robot.move();
});

export let LEFT = new Command(CmdTypes.LEFT,function(robot,tabletop){
    robot.left();
});

export let RIGHT = new Command(CmdTypes.RIGHT,function(robot,tabletop){
    robot.right();
});

export let REPORT = new Command(CmdTypes.REPORT,function(robot,tabletop){
    robot.report();
});