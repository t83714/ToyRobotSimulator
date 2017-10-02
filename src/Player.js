/**
 * Controller Class; Coordinates command execution. 
 */
class Player {
    /**
     * Player class constructor
     * @param {object} eventBus reference of the glabal event emitter
     * @param {object} RobotClass reference of Robot Class
     * @param {object} TabletopClass reference of Tabletop Class
     * @param {number} [w=5] width of tabletop to be created; default to 5
     * @param {number} [h=5] height of tabletop to be created; default to 5
     */
    constructor(eventBus, RobotClass, TabletopClass, w=5, h=5) {
        if (!eventBus) throw new Error("Invalid empty eventBus parameter!");
        if (!RobotClass) throw new Error("Invalid empty RobotClass parameter!");
        if (!TabletopClass) {
            throw new Error("Invalid empty TabletopClass parameter!");
        }

        this.eventBus=eventBus;
        this.tabletop=new TabletopClass(w, h);
        this.robot=new RobotClass();
        this.commandListener=this.commandListener.bind(this);
    }

    /**
     * Start to accept & process command
     */
    startToPlay() {
        this.eventBus.on("cmd", this.commandListener);
    }

    /**
     * Stop to accept & process command
     */
    stopToPlay() {
        this.eventBus.removeListener("cmd", this.commandListener);
    }

    /**
     * Event callback
     * @param {string} cmdType command 
     * @param {Command} command 
     * @param {object} payload 
     */
    commandListener(cmdType, command, payload) {
        if (!payload) payload=null;
        command.execute(this.robot, this.tabletop, payload);
    }
}

export default Player;
