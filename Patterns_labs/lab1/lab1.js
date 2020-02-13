"use strict";

let CATEGORIES = "ABCDE";

class Transport {
    constructor(transportType, driver = null) {
        this.transportType = transportType;
        this.listOfPassengers = [];
        this.driver = driver;
    }

    go() {
        if (this.driver != null && this.listOfPassengers.length > 0) {
            console.log(this.transportType + " go");
        }
        else if (this.listOfPassengers.length == 0) {
            throw new Error("Stay until will be full");
        }
        else throw new Error("Where is a driver?");
    }

    takePassengers(passengers) {
        if (this.transportType == "taxi" && this.listOfPassengers.length + passengers.length > 3)
            throw new Error("Too much passengers");
        else if (this.transportType == "bus" && this.listOfPassengers.length + passengers.length > 39)
            throw new Error("Too much passengers");
        else this.listOfPassengers = this.listOfPassengers.concat(passengers);
    }

    takeDriver(driver) {
        if (this.driver != null)
            throw new Error("Driver already exist");
        else {
            if (driver.category > "A" && this.transportType == "taxi")
                this.driver = driver;
            else if (this.transportType == "taxi")
                throw new Error("No relevant qualifications. Expected B, but got " + driver.category);
            else if (driver.category >= "D" && this.transportType == "bus")
                this.driver = driver;
            else throw new Error("No relevant qualifications. Expected D, but got " + driver.category);
        }
    }
}


class BoardAnyCar {
    constructor() {
        if (new.target === BoardAnyCar) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        else if (this.boardDriver === undefined) {
            throw new TypeError("Must override boardDriver");
        }
        else if (this.boardPassenger === undefined) {
            throw new TypeError("Must override boardPassenger");
        }
    }
}

class BoardTaxi extends BoardAnyCar {
    constructor() { super(); }
    boardDriver() {
        return new TaxiDriver(CATEGORIES[Math.floor(Math.random()*5)]);
    }

    boardPassenger() {
        let passengers = [];
        for (let i=0; i<3; i++){ passengers.push(new Passenger()); }
        return passengers;
    }
}

class BoardBus extends BoardAnyCar {
    constructor() { super(); }
    boardDriver() {
        return new BusDriver(CATEGORIES[Math.floor(Math.random()*5)]);
    }

    boardPassenger() {
        let passengers = [];
        for (let i=0; i<30; i++){ passengers.push(new Passenger()); }
        return passengers;
    }
}

class Driver {
    constructor(category) {
        if (new.target === Driver) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.category = category;
    }

    sitInCar(car) { car.takeDriver(this); }
}

class BusDriver extends Driver {
    constructor(category) {
        super(category);
    }
}

class TaxiDriver extends Driver {
    constructor(category) {
        super(category);
    }
}

class Passenger {
    static id = 0;
    constructor() {
        this.id = Passenger.id;
        Passenger.id += 1;
    }
}


let taxi = new Transport("taxi");
let bus = new Transport("bus");
taxi.takeDriver(new BoardTaxi().boardDriver());
bus.takeDriver(new BoardBus().boardDriver());
bus.takePassengers(new BoardBus().boardPassenger());
taxi.takePassengers(new BoardTaxi().boardPassenger());
taxi.go();
bus.go();
