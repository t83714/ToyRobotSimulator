import EventEmitter from 'events';

let emitter;

function init(){
    emitter = new EventEmitter();
    
    emitter.on('uncaughtException', function (err) {
        console.log(chalk.red('uncaughtException: '+err.message));
    });
};

init();

export let reset=function(){
    emitter.removeAllListeners('cmd');
    emitter.removeAllListeners('output');
    emitter=null;
    init();
};
export default emitter;