class Player{

    constructor(eventBus,RobotClass,TabletopClass,w=5,h=5){
        if(!eventBus) throw new Error("Invalid empty eventBus parameter!");
        if(!RobotClass) throw new Error("Invalid empty RobotClass parameter!");
        if(!TabletopClass) throw new Error("Invalid empty TabletopClass parameter!");
        
        this.tabletop=new TabletopClass(w,h);
        this.robot=new RobotClass();

        eventBus.on('cmd',this.commandListener.bind(this));
    }

    createTabletop(TabletopClass,w=5,h=5){
        if(this.tabletop) throw new Error("Cannot re-create tabletop!");
        if(!TabletopClass) throw new Error("Invalid empty TabletopClass parameter!");
        this.tabletop=new TabletopClass(w,h);
    }

    createRobot(){
        if(this.robot) throw new Error("Cannot re-create robot!");
        this.robot=new this.RobotClass(w,h);
    }

    commandListener(cmdType,command,payload){
        if(!payload) payload=null;
        command.execute(this.robot,this.tabletop,payload);
    }
}

export default Player;