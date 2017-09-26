import EventEmitter from 'events';

const emitter = new EventEmitter();

emitter.on('uncaughtException', function (err) {
    console.log(chalk.red('uncaughtException: '+err.message));
});

export default emitter;