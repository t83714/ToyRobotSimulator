class Player{

    constructor(eventBus,RobotClass,TabletopClass,w=5,h=5){
        if(!eventBus) throw new Error("Invalid empty eventBus parameter!");
        if(!RobotClass) throw new Error("Invalid empty RobotClass parameter!");
        this.RobotClass=RobotClass;
        this.tabletop=null;
        this.robot=null;
        this.createTabletop(TabletopClass,w,h);
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

    commandListener(cmd,x,y,f){
        switch(cmd){
            case "PLACE" : this.executeCmdPlace(x,y,f);break;
            case "MOVE" : this.executeCmdMove();break;
        }
    }

    executeCmdPlace(x,y,f){
        if(!this.robot){
            this.createRobot();
        }
        this.robot.setFacing(f);
        this.robot.setTabletop(this.tabletop);
        this.robot.x=x;
        this.robot.y=y;
        this.tabletop.place(this.robot,x,y);
    }

    executeCmdMove(){
        if(!this.robot){
            return;
        }
        this.robot.move();
        this.tabletop.place(this.robot,x,y);
    }







}