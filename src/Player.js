class Player{

    constructor(eventBus,RobotClass,TabletopClass,w=5,h=5){
        if(!eventBus) throw new Error("Invalid empty eventBus parameter!");
        if(!RobotClass) throw new Error("Invalid empty RobotClass parameter!");
        if(!TabletopClass) throw new Error("Invalid empty TabletopClass parameter!");
        
        this.tabletop=new TabletopClass(w,h);
        this.robot=new RobotClass(eventBus);

        eventBus.on('cmd',this.commandListener.bind(this));
    }

    commandListener(cmdType,command,payload){
        if(!payload) payload=null;
        command.execute(this.robot,this.tabletop,payload);
    }
}

export default Player;