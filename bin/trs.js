#!/usr/bin/env node -r @std/esm

import chalk from "chalk";
import vorpal from "vorpal";
import * as commands from "../src/commands";
import Player from "../src/Player.js";
import eventBus from "../src/EventBus.js";
import Robot from "../src/Robot.js";
import Tabletop from "../src/Tabletop.js";

const player=new Player(eventBus,Robot,Tabletop);
eventBus.on('output',function(output){
    console.log(chalk.green(`Output:${output}`));
});

function parseIntNumber(v){
    try{
        v=parseInt(v);
        if(isNaN(v)) return 0;
        return v;
    }catch(e){
        return 0;
    }
}

const cli=new vorpal();
cli.command("PLACE <x,y,facing>")
    .description("Place robot on x,y position of tabletop with <facing>")
    .action(function(args, callback){
        try{
            let parts=args['x,y,facing'].split(',');
            if(parts.length!=3) throw new Error('Require parameter in x,y,facing format!');
            let [x,y,facing]=parts;
            x=parseIntNumber(x);
            y=parseIntNumber(y);
            facing=facing.toUpperCase();
            commands.PLACE().send({
                x,
                y,
                facing
            });
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
        }
        callback();
    });

cli.command("MOVE")
    .description("Move robot one step further")
    .action(function(args, callback){
        try{
            commands.MOVE().send();
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
            console.log(e);
        }
        callback();
    });

cli.command("LEFT")
    .description("Make robot turn left")
    .action(function(args, callback){
        try{
            commands.LEFT().send();
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
        }
        callback();
    });

cli.command("RIGHT")
    .description("Make robot turn RIGHT")
    .action(function(args, callback){
        try{
            commands.RIGHT().send();
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
        }
        callback();
    });

cli.command("REPORT")
    .description("Ask robot to report current position")
    .action(function(args, callback){
        try{
            commands.REPORT().send();
        }catch(e){
            console.log(chalk.red(`Error: ${e.message}`));
        }
        callback();
    });

cli.delimiter('RobotSimulation~$').show();

process.on('uncaughtException', (err) => {
    console.log(chalk.red('Error: '+err.message));
 });