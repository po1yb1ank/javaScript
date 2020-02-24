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
        if (this.transportType == "bus") {
            passengers.forEach(element => {
                if (element instanceof Child) console.log('Проезд бесплатный');
                else if (element instanceof Adult) console.log('Проезд за полную стоимость');
                else console.log('Проезд со скидкой');
            });
        } else {
            passengers.forEach(element => {
                if (element instanceof Child) console.log('Проезд в детском кресле');
                else console.log('Проезд в обычном кресле');
            });
        }
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
        return new TaxiDriver(CATEGORIES[Math.floor(Math.random() * 5)]);
    }

    boardPassenger() {
        let passengers = [];
        for (let i = 0; i < 3; i++) { passengers.push(new Passenger()); }
        return passengers;
    }
}

class BoardBus extends BoardAnyCar {
    constructor() { super(); }
    boardDriver() {
        return new BusDriver(CATEGORIES[Math.floor(Math.random() * 5)]);
    }

    boardPassenger() {
        let passengers = [];
        for (let i = 0; i < 30; i++) { passengers.push(new Passenger()); }
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

class SingleDriver {
    static driver = undefined;
    constructor(category) {
        if (new.target === SingleDriver) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        else if (SingleDriver.driver === undefined) {
            this.category = category;
            SingleDriver.driver = this;
        } else { return SingleDriver.driver };

    }

    getInstance() {
        return SingleDriver.driver;
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

class Child extends Passenger {
    constructor() {
        super();
        console.log("Create child");
    }
}

class Adult extends Passenger {
    constructor() {
        super();
        console.log("Create Adult");
    }
}

class Beneficiary extends Passenger {
    constructor() {
        super();
        console.log("Create beneficiary");
    }
}


class TransportBuilder {
    constructor() {
        if (new.target === TransportBuilder) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }
    createAuto() { };
    buildBeneficiary() { };
    buildChild() { };
    buildAdult() { };
    buildDriver() { };
}


class TaxiTransportBuilder extends TransportBuilder {
    constructor() { super(); };
    createAuto() {
        this.transport = new Transport("taxi");
    }
    buildAdult() { this.transport.takePassengers([new Adult()]); }
    buildChild() { this.transport.takePassengers([new Child()]); }
    buildDriver() { this.transport.takeDriver(new TaxiDriver("B")); }
}

class BusTransportBuilder extends TransportBuilder {
    constructor() { super(); };
    createAuto() {
        this.transport = new Transport("bus");
    }
    buildAdult() { this.transport.takePassengers([new Adult()]); }
    buildChild() { this.transport.takePassengers([new Child()]); }
    buildBeneficiary() { this.transport.takePassengers([new Beneficiary()]); }
    buildDriver() { this.transport.takeDriver(new BusDriver("D")); }
}

class Director {
    constructor() { };
    createTransport(builder) {
        builder.createAuto();
        builder.buildAdult()
        builder.buildChild();
        builder.buildBeneficiary();
        builder.buildDriver();
        return builder.transport;
    }
}

let dir = new Director();
let taxiBuilder = new TaxiTransportBuilder();
let busBuilder = new BusTransportBuilder();

let taxi = dir.createTransport(taxiBuilder);
let bus = dir.createTransport(busBuilder);
taxi.go();
bus.go();
