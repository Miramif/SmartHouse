
const SMO = require('./SmartHouseObjects');
var SmartHouse = {
    lamps : [],
    locks : [],
    heatingSystems: [],
    addNewLamp : function(name, model){
        let id = Math.floor(10000 + Math.random() * 10000) + "";
        while( this.lamps.some(function(value){ return value.id == id;}) == 1){
            id = Math.floor(10000 + Math.random() * 10000) + "";
        }
        this.lamps.push(new SMO.Lamp(name, id, model));
    },
    addNewLock : function(name, model){
        let id = Math.floor(1000 + Math.random() * 1000) + "";
        while(this.locks.some(function(value){ return value.id == id;}) == 1){
            id = Math.floor(1000 + Math.random() * 1000) + "";
        }
        this.locks.push(new SMO.Lock(name, id, model));
    },
    addNewHeatingSystem : function(name, model){
        let id = Math.floor(100 + Math.random() * 100) + "";
        while(this.heatingSystems.some(function(value){ return value.id == id;}) == 1){
            id = Math.floor(100 + Math.random() * 100) + "";
        }
        this.heatingSystems.push(new SMO.HeatingSystem(name, id, model));
    },
    getListOfDevices: function(){
        let buf = "";
        buf += "Heating systems:\n";
        this.heatingSystems.forEach(function(value, index){
            buf += `#${index}. Device name: ${value.name}, Device id: ${value.id}\n`;
        })
        buf += "\nSmart locks:\n";
        this.locks.forEach(function(value, index){
            buf += `#${index}. Device name: ${value.name}, Device id: ${value.id}\n`;
        })
        buf += "\nSmart lamps:\n";
        this.lamps.forEach(function(value, index){
            buf += `#${index}. Device name: ${value.name}, Device id: ${value.id}\n`;
        })
        return buf;
    },
    getExListOfDevices: function(){
        let buf = "";
        buf += "Heating systems:\n";
        this.heatingSystems.forEach(function(value, index){
            buf += value.getInfo();
        })
        buf += "\nSmart locks:\n";
        this.locks.forEach(function(value, index){
            buf += value.getInfo();
        })
        buf += "\nSmart lamps:\n"
        this.lamps.forEach(function(value, index){
            buf += value.getInfo();
        })
        return buf;
    },
}

SmartHouse.addNewLamp("Lamp1","XI-322");
SmartHouse.addNewLamp("Lamp2","XI-332");

SmartHouse.addNewLock("Lock1","ZRS1");
SmartHouse.addNewLock("Lock2","ZRS2");

SmartHouse.addNewHeatingSystem("CHS1","GTX1080");
SmartHouse.addNewHeatingSystem("CHS2","RTX2080");

console.log(SmartHouse.getListOfDevices());
console.log(SmartHouse.getExListOfDevices());

SmartHouse.lamps[0].getSetColour({red: 120, green: 110, blue: 60});
SmartHouse.lamps[0].getSetSwitch(true);
SmartHouse.lamps[1].getSetBrightness(60);

console.log(SmartHouse.locks[0].connectToTelephone("+380444322255"));
SmartHouse.locks[1].lock();

SmartHouse.heatingSystems[0].getSetTemperature(24);
SmartHouse.heatingSystems[0].getSetSwitch(true);
SmartHouse.heatingSystems[1].getSetTemperature(15);
SmartHouse.heatingSystems[1].getSetSwitch(true);
SmartHouse.heatingSystems[0].getSetTemperature(100);

SmartHouse.heatingSystems[0].addDegree();
SmartHouse.heatingSystems[0].addDegree();
SmartHouse.heatingSystems[0].subDegree();
SmartHouse.heatingSystems[1].subDegree();

console.log(SmartHouse.getExListOfDevices());

console.dir(SmartHouse);