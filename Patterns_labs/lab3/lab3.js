"use strict";


let MAX_WEIGHT = 60;
let MIN_WEIGHT = 5;



class Man {
    constructor() {
        if (new.target === Man) {
            throw new TypeError("Cannot construct Abstract instances directly");
        } else if (this.getWeight === undefined) {
            throw new TypeError("Must override getWeight");
        }
     }

    addMan(man) {
        console.log("error");
    }
}
class Pilot extends Man {
    constructor(){
        super();
    }

    getWeight(){
        return 0;
    }
}

class Stewardess extends Man {
    constructor(){
        super();
    }

    getWeight(){
        return 0;
    }
}

class Passenger extends Man {
    constructor(weight){
        super();
        if (weight < MIN_WEIGHT)
        this.weight = MIN_WEIGHT;
        else if (weight > MAX_WEIGHT)
        this.weight = MAX_WEIGHT;
        else this.weight = weight;
    }
    getWeight(){
        return this.weight;
    }
}

class Composite extends Man{
    constructor(){
        super();
        this.mans = [];
    }

    addMan(man){
        this.mans.push(man);
    }

    getMan(ind){
        if (ind < this.mans.length)
            return this.mans[ind];
        else return undefined;  
    }

    getWeight(){
        let weight = 0;
        for (let man in this.mans){
            weight += this.mans[man].getWeight();
        }
        return weight;
    }
}

class Plane{
    constructor(){
        this.economyClass = new Composite();
        this.businessClass = new Composite();
        this.firstClass = new Composite();
        this.stewardesses = new Composite();
        this.pilots = new Composite();
    }

    createEconomyClass(){
        for (let i=0; i<150; i++){
            this.economyClass.addMan(new Passenger(Math.random()*60));       
        }
        return this.economyClass;
    }

    createBusinessClass(){
        for (let i=0; i<20; i++){
            this.businessClass.addMan(new Passenger(Math.random()*60));
        }
        return this.businessClass;
    }

    createFirstClass(){
        for (let i=0; i<10; i++){
            this.firstClass.addMan(new Passenger(Math.random()*60));
        }
        return this.firstClass;
    }

    createStewardesses(){
        for (let i=0; i<6; i++){
            this.stewardesses.addMan(new Stewardess());
        }
        return this.stewardesses;
    }

    createPilots(){
        for (let i=0; i<2; i++){
            this.pilots.addMan(new Pilot());
        }
        return this.stewardesses;
    }

    getEconomyWeight(){
        return this.economyClass.getWeight();
    }

    getFirstWeight(){
        return this.firstClass.getWeight();
    }
    getBusinessWeight(){
        return this.businessClass.getWeight();
    }
    getWeight(){
        return this.getFirstWeight() + this.getBusinessWeight() + this.getEconomyWeight();
    }
    testLoad(maxWeight){
        let totalWeight = this.getBusinessWeight() + this.getEconomyWeight() + this.getFirstWeight();
        console.log("Max weight of plane " + maxWeight);
        if (totalWeight <= maxWeight)
        {
            console.log("Plane is not overloaded");
        }
        else
        {
            let extraWeight = totalWeight - maxWeight;
            console.log("Plane is overload by " + extraWeight);
            let i = 0;
            while (this.economyClass.getMan(i) != undefined)
            {
                extraWeight -= this.economyClass.getMan(i).getWeight();
                i++;
                if (extraWeight <= 0)
                    break;
            }
            console.log("Baggage of " + i + " passengers of economy class removed from flight");
        }
    }
}



let plane = new Plane();
plane.createPilots();
plane.createStewardesses();
plane.createFirstClass();
plane.createEconomyClass();
plane.createBusinessClass();
console.log('total weight of baggage ' + plane.getWeight());
let maxWeight = 4000;
console.log('weight of baggage of first class ' + plane.getFirstWeight());
console.log('weight of baggage of business class ' + plane.getBusinessWeight());
console.log('weight of baggage of economy class ' + plane.getEconomyWeight());
plane.testLoad(maxWeight);