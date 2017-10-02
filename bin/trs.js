#!/usr/bin/env node -r @std/esm

import chalk from "chalk";
import Vorpal from "vorpal";
import * as commands from "../src/commands";
import Player from "../src/Player.js";
import eventBus from "../src/EventBus.js";
import Robot from "../src/Robot.js";
import Tabletop from "../src/Tabletop.js";

const player=new Player(eventBus, Robot, Tabletop);
player.startToPlay();

eventBus.on("output", function(output) {
    process.stdout.write(chalk.green("Output:"+output+"\n"));
});

/**
 * Parse string to int; Will return 0 for invalid string format
 * @param {*} v input string
 * @return {number} parse result
 */
function parseIntNumber(v) {
    try {
        v=parseInt(v);
        if (isNaN(v)) return 0;
        return v;
    } catch (e) {
        return 0;
    }
}

const cli=new Vorpal();
cli.command("PLACE <x,y,facing>")
    .description("Place robot on x,y position of tabletop with <facing>")
    .action(function(args, callback) {
        try {
            let parts=args["x,y,facing"].split(",");
            if (parts.length!=3) {
                throw new Error("Require parameter in x,y,facing format!");
            }
            let [x, y, facing]=parts;
            x=parseIntNumber(x);
            y=parseIntNumber(y);
            facing=facing.toUpperCase();
            commands.place().send({
                x,
                y,
                facing,
            });
        } catch (e) {
            process.stdout.write(chalk.red("Error: "+e.message+"\n"));
        }
        callback();
    });

cli.command("MOVE")
    .description("Move robot one step further")
    .action(function(args, callback) {
        try {
            commands.move().send();
        } catch (e) {
            process.stdout.write(chalk.red("Error: "+e.message+"\n"));
        }
        callback();
    });

cli.command("LEFT")
    .description("Make robot turn left")
    .action(function(args, callback) {
        try {
            commands.left().send();
        } catch (e) {
            process.stdout.write(chalk.red("Error: "+e.message+"\n"));
        }
        callback();
    });

cli.command("RIGHT")
    .description("Make robot turn RIGHT")
    .action(function(args, callback) {
        try {
            commands.right().send();
        } catch (e) {
            process.stdout.write(chalk.red("Error: "+e.message+"\n"));
        }
        callback();
    });

cli.command("REPORT")
    .description("Ask robot to report current position")
    .action(function(args, callback) {
        try {
            commands.report(eventBus).send();
        } catch (e) {
            process.stdout.write(chalk.red("Error: "+e.message+"\n"));
        }
        callback();
    });

cli.delimiter("RobotSimulation~$").show();

process.on("uncaughtException", (err) => {
    process.stdout.write(chalk.red("Error: "+err.message+"\n"));
});
