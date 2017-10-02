import * as CmdTypes from "./types";

/**
 * Class representing a command.
 */
class Command {
    /**
     * Create an instance of Command
     * @param {object} eventBus reference of the glabal event emitter 
     * @param {string} cmd Command string. 
     * @param {Command~executionCallback} executionCallback 
     * @param {Command~onExecutionComplete} onExecutionComplete 
     * Callback function. Defines how command should be executed
     */
    constructor(eventBus, cmd, executionCallback, onExecutionComplete) {
        if (!cmd || !this.isValidCmd(cmd)) throw new Error("Invalid cmd: "+cmd);
        if (!executionCallback || typeof executionCallback!="function") {
            throw new Error("Invalid executionCallback!");
        }
        this.eventBus=eventBus;
        this.cmd=cmd;
        this.executionCallback=executionCallback;
        this.onExecutionComplete=onExecutionComplete?onExecutionComplete:null;
    }

    /**
     * Check whether a string is a valid command string
     * @param {string} cmd command string
     * @return {boolean}
     */
    isValidCmd(cmd) {
        return CmdTypes[cmd]?true:false;
    }

    /**
     * Send the current command to player via global event emitter 
     * for player to process
     * @param {object} payload 
     */
    send(payload) {
        if (!payload) payload=null;
        this.eventBus.emit("cmd", this.cmd, this, payload);
    }

    /**
     * Execute command
     * @param {Robot} robot 
     * @param {Tabletop} tabletop 
     * @param {object} payload 
     */
    execute(robot, tabletop, payload) {
        try {
            this.executionCallback(robot, tabletop, payload);
        } catch (e) {
            if (this.onExecutionComplete && typeof this.onExecutionComplete=="function") {
                this.onExecutionComplete(e);
            }
            throw e;
        }
        if (this.onExecutionComplete && typeof this.onExecutionComplete=="function") {
            this.onExecutionComplete();
        }
    }
}

/**
 * Callback used by Command class constructor
 * @callback Command~executionCallback
 * @param {Robot} robot
 * @param {Tabletop} tabletop
 * @param {object} payload
 */

/**
 * Callback used by Command class constructor
 * @callback Command~onExecutionComplete
 * @param {Error} err
 */

export default Command;
