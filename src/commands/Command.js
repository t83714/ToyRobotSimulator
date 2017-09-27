import * as CmdTypes from "./types";
import eventBus from "../EventBus.js";

class Command{

    constructor(cmd,executionCallback){
        if(!cmd || !this.isValidCmd(cmd)) throw new Error("Invalid cmd: "+cmd);
        if(!executionCallback || typeof executionCallback!='function') throw new Error("Invalid executionCallback!");
        this.cmd=cmd;
        this.executionCallback=executionCallback;
    }

    isValidCmd(cmd){
        return CmdTypes[cmd]?true:false;
    }

    send(payload){
        if(!payload) payload=null;
        eventBus.emit('cmd',this.cmd,this,payload);
    }

    execute(robot,tabletop,payload){
        this.executionCallback(robot,tabletop,payload);
    }
}

export default Command;