var SmartHouseObject = function(name, id){
    this.name = name;
    this.id = id;
    this.type = "SmartHouseObject template";
    this.isEnabled = true;
    this.getInfo = function () {
        return `Type: ${this.type}.\n Name - ${this.name},\n ID - ${this.id},\n State: ${this.isEnabled ? "Enabled" : "Disabled"}.`; 
    }
    return this;
}
var Lamp = function(name, id, model){
    SmartHouseObject.call(this, name, id);
    this.type = "Smart Lamp";
    this.model = model;
    this.__isOn = false;
    this.__brightness = 100;
    this.__red = 255;
    this.__green = 255;
    this.__blue = 255;

    this.getInfo = function () {
        return `\nType: ${this.type}.\n Name - ${this.name},\n ID - ${this.id},\n State: ${this.isEnabled ? "Enabled" : "Disabled"},\n` +
        ` Switched: ${this.getSetSwitch() ? "On" : "Off"},\n Brightness: ${this.getSetBrightness()},\n Colour scheme:` +
        ` rgb(${this.getSetColour().red}, ${this.getSetColour().green}, ${this.getSetColour().blue}).\n`; 
    }
    this.__isValidColor = function(colour){
        if (colour >= 0 && colour <= 255){
            return true;
        }
        else{
            return false;
        }
    }
    this.__isValidBrightness = function(number){
        if (number >= 0 && number <= 100){
            return true;
        }
        else{
            return false;
        }
    }
    this.getSetSwitch = function(boolvar){
        if (typeof boolvar === 'boolean'){
            this.__isOn = boolvar;
            return this.__isOn;
        }
        else{
            return this.__isOn;
        }
    }
    this.getSetColour = function(colours){
        if (colours === undefined || typeof(colours) !== 'object'){
            return colours = {
                red: this.__red,
                green: this.__green,
                blue: this.__blue
            }
        }
        else {
            if (colours.red !== undefined && this.__isValidColor(colours.red)){
                this.__red = colours.red;
            }
            if (colours.green !== undefined && this.__isValidColor(colours.green)){
                this.__green = colours.green;
            }
            if (colours.blue !== undefined && this.__isValidColor(colours.blue)){
                this.__blue = colours.blue;
            }
            return colours = {
                red: this.__red,
                green: this.__green,
                blue: this.__blue
            }
        }
    }  
    this.getSetBrightness = function(number){
        if (number === undefined){
            return this.__brightness;
        }
        else {
            if (this.__isValidBrightness(number)){
                this.__brightness = number;
            }

        }
        return this.__brightness;
    }   
    return this;
}
var Lock = function(name, id, model){
    SmartHouseObject.call(this, name, id);
    this.model = model;
    this.type = "Smart Lock";
    this.__isLocked = false;
    this.__telephoneConnection = {
        isConnected: false,
        telephoneNumber: "",
        telephoneId: "",
    }

    this.lock = function(){
        this.__isLocked = true;
    }
    this.unlock = function(){
        this.__isLocked = fasle;
    }
    this.__isValidTelNumber = function(number){
         if (number.length === 13 && (!isNaN(number))){
            return true;
        }
        else {
            return false;
        }
    }
    this.getConnectionInfo = function(){
        if (!this.__telephoneConnection.isConnected){
            return "Not connected.";
        }
        else{
            return `Connected.\n Telephone number: ${this.__telephoneConnection.telephoneNumber}.\n Device ID: ${this.__telephoneConnection.telephoneId}.`;
        }
    }
    this.connectToTelephone = function(telNumber){
        if (this.__isValidTelNumber(telNumber)){
            this.__telephoneConnection.isConnected = true;
            this.__telephoneConnection.telephoneNumber = telNumber;
            this.__telephoneConnection.telephoneId = (Math.floor(Math.random() * 9000 + 1000)) + "";
            return `Telephone number ${this.__telephoneConnection.telephoneNumber} connected successfully, device ID: ${this.__telephoneConnection.telephoneId}.`;
        }
        else{
            return "Connection failed";
        }
    }
    this.getInfo = function () {
        return `\nType: ${this.type}.\n Name - ${this.name},\n ID - ${this.id},\n State: ${this.isEnabled ? "Enabled" : "Disabled"},\n` +
        ` Lock state: ${this.__isLocked ? "Locked" : "Unlocked"},\n Telephone connection status: ${this.getConnectionInfo()}\n`; 
    }
    return this;
}
var HeatingSystem = function(name, id, model){
    SmartHouseObject.call(this, name, id);
    this.model = model;
    this.type = "Heating system";
    this.__isOn = false;
    this.__temperature = 18;
    this.getSetSwitch = function(boolvar){
        if (typeof boolvar === 'boolean'){
            this.__isOn = boolvar;
            return this.__isOn;
        }
        else{
            return this.__isOn;
        }
    }  
    this.__isValidTemperature = function(number){
        if ((!isNaN(number)) && number >= 15 && number <= 30){
            return true;
        }
        else {
            return false;
        }
    }
    this.getSetTemperature = function(number){
        if (number === undefined){
            return this.__temperature;
        }
        else {
            if (this.__isValidTemperature(number)){
                this.__temperature = number;
            }
        }
        return this.__temperature;
    }
    this.addDegree = function(){
        if (this.__isValidTemperature(this.__temperature + 1)){
            this.__temperature++;
        }
    }
    this.subDegree = function(){
        if (this.__isValidTemperature(this.__temperature - 1)){
            this.__temperature--;
        }   
    }      
    this.getInfo = function () {
        return `\nType: ${this.type}.\n Name - ${this.name},\n ID - ${this.id},\n State: ${this.isEnabled ? "Enabled" : "Disabled"},\n` +
        ` Switched: ${this.getSetSwitch() ? "On" : "Off"},\n Temperature: ${this.getSetTemperature()}.\n`; 
    }
}

Lamp.prototype = Object.create(SmartHouseObject.prototype);
Lamp.prototype.constructor = Lamp;
Lock.prototype = Object.create(SmartHouseObject.prototype);
Lock.prototype.constructor = Lock;
HeatingSystem.prototype = Object.create(SmartHouseObject.prototype);
HeatingSystem.prototype.constructor = HeatingSystem;
