const FacingOptions={
    "NORTH":{
        degree : 0,
        movement : [0,1]
    },
    "EAST":{
        degree : 90,
        movement : [1,0]
    },
    "SOUTH":{
        degree : 180,
        movement : [0,-1]
    },
    "WEST":{
        degree : 270,
        movement : [-1,0]
    },
};

export let degreeToFacing=function(degree){
    let rDegree=(degree+360)%360;
    for(let f in FacingOptions){
        if(rDegree==FacingOptions[f].degree) return f;
    }
    throw new Error("Invalid degree: "+degree);
};

export let facingToDegree=function(facing){
    if(!isValid(facing)) throw new Error('Invalid facing:'+facing);
    return FacingOptions[facing].degree;
};

export let isValid=function(f){
    if(!f || typeof f!='string') return false;
    for(let idx in FacingOptions){
        if(idx==f) return true;
    }
    return false;
};

export let getFacingMoment=function(facing){
    if(!isValid(facing)) throw new Error('Invalid facing:'+facing);
    return FacingOptions[facing].movement;
};