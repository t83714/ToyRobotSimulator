import EventEmitter from "events";
import chalk from "chalk";

let emitter;

/**
 * Create instance of new gloabl event emitter
 */
function init() {
    emitter = new EventEmitter();

    emitter.on("uncaughtException", function(err) {
        process.stdout.write(chalk.red("uncaughtException: "+err.message+"\n"));
    });
}

init();

/**
 * Reset gloable gloabl event emitter
 */
export let reset=function() {
    emitter.removeAllListeners("cmd");
    emitter.removeAllListeners("output");
    emitter=null;
    init();
};
export default emitter;
