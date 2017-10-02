import * as CmdTypes from "./types";
import Command from "./Command.js";
import globalEventBus from "../EventBus.js";

export let place = function(eventBus, onExecutionComplete) {
    return new Command(eventBus?eventBus:globalEventBus, CmdTypes.PLACE, function(robot, tabletop, payload) {
        let {x, y, facing}=payload;
        robot.place(tabletop, x, y, facing);
    }, onExecutionComplete);
};

export let move = function(eventBus, onExecutionComplete) {
    return new Command(eventBus?eventBus:globalEventBus, CmdTypes.MOVE, function(robot, tabletop) {
        robot.move();
    }, onExecutionComplete);
};

export let left = function(eventBus, onExecutionComplete) {
    return new Command(eventBus?eventBus:globalEventBus, CmdTypes.LEFT, function(robot, tabletop) {
        robot.left();
    }, onExecutionComplete);
};

export let right = function(eventBus, onExecutionComplete) {
    return new Command(eventBus?eventBus:globalEventBus, CmdTypes.RIGHT, function(robot, tabletop) {
        robot.right();
    }, onExecutionComplete);
};

export let report = function(eventBus, onExecutionComplete) {
    return new Command(eventBus?eventBus:globalEventBus, CmdTypes.REPORT, function(robot, tabletop) {
        const pinfo=robot.report();
        const eventEmitter=eventBus?eventBus:globalEventBus;
        eventEmitter.emit("output", pinfo.x+","+pinfo.y+","+pinfo.facing);
    }, onExecutionComplete);
};
