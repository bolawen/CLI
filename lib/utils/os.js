const OS = require("os");

function getOsVersion(){
    return OS.arch();
}

function isMacIntel(){
    const osVersion = getOsVersion();
    return osVersion !== "arm64";
}

function getCurrentOsVersion(){
    if(isMacIntel()){
        return "intel"
    }
    return "m1"
}

module.exports = {
    getOsVersion,
    isMacIntel,
    getCurrentOsVersion
}