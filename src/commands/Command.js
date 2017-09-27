import * as CmdTypes from "./types";
import eventBus from "../EventBus.js";
import chalk from "chalk";

class Command{

    constructor(cmd,executionCallback){
        try{
            if(!cmd || !this.isValidCmd(cmd)) throw new Error("Invalid cmd: "+cmd);
            if(!executionCallback || typeof executionCallback!='function') throw new Error("Invalid executionCallback!");
            this.cmd=cmd;
            this.executionCallback=executionCallback;
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
        }
    }

    isValidCmd(cmd){
        return CmdTypes[cmd]?true:false;
    }

    send(payload){
        if(!payload) payload=null;
        eventBus.emit('cmd',this.cmd,this,payload);
    }

    execute(robot,tabletop,payload){
        try{
            this.executionCallback(robot,tabletop,payload);
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
        }
    }
}

export default Command;