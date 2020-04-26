"use strict";

class IObserver {
    constructor() {
        if (new.target === IObserver) {
            throw new TypeError("Cannot construct Abstract instances directly");
        } else if (this.Update === undefined) {
            throw new TypeError("Must override Update");
        }
    }
}

class IObservable {
    constructor() {
        if (new.target === IObservable) {
            throw new TypeError("Cannot construct Abstract instances directly");
        } else if (this.NotifyObservers === undefined) {
            throw new TypeError("Must override NotifyObservers");
        } else if (this.RemoveObserver === undefined) {
            throw new TypeError("Must override RemoveObserver");
        } else if (this.RegisterObserver === undefined) {
            throw new TypeError("Must override RegisterObserver");
        }
    }
}

class Deanery extends IObservable {
    constructor() {
        super();
        this.observers = [];
        this.journals = {};

    }

    RegisterObserver(obs) {
        this.observers.push(obs);
    }

    RemoveObserver(obs) {
        for (let obser in this.observers) {
            if (obs.name == this.observers[obser].name) {
                this.observers.splice(this.observers[obser], 1);
            }
        }
    }

    NotifyObservers() {
        for (let observer in this.observers) {
            let department = this.observers[observer];
            for (let teacher in department.teachers){
                let teach = department.teachers[teacher];
                let concreteJournal = this.journals[teach.name];
                let lastProgress = concreteJournal[concreteJournal.length - 1];
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth();
                let day = now.getDate() - 7;
                if (day < 0){
                    month = now.getMonth() - 1;
                    if (month < 0) {
                        year = now.getFullYear() - 1;
                        month = 12;
                    }
                    day = 23;
                }
                let checkDate = new Date(year, month, day);
                if (lastProgress.date.getDate() < checkDate.getDate()) {
                    this.observers[observer].Update(teach.name);
                }
            }
        }
    }

    initJournal(name) {
        this.journals[name] = [];
    }

    addJournal(name, journal) {
        this.journals[name].push(journal);
    }
}

class Department extends IObserver {
    constructor(name, deanery){
        super();
        this.name = name;
        this.teachers = [];
        deanery.RegisterObserver(this);
    }

    Update(name){
        console.log('Учитеь с кафедры ' + this.name + ' по имени ' + name + ' не заполняет журнал')
    }

    addTeacher(teacher){
        this.teachers.push(teacher);
    }
}

class Progress { // успеваемость
    constructor(date) {
        this.date = date; //new Date(2011, 0, 1);
    }
}

class Teacher {
    constructor(department, name, deanery){
        this.name = name;
        this.department = department;
        this.deanery = deanery;
        deanery.initJournal(name);
        department.addTeacher(this);
    }

    createProgress(date){
        let journal = new Progress(date);
        this.deanery.addJournal(this.name, journal);
    }
}

let deanery = new Deanery();
let IPOVS = new Department('IPOVS', deanery);
let OF = new Department('OF', deanery);
let VM_1 = new Department("VM_1", deanery);
let Kozhan = new Teacher(VM_1, "Kozhan", deanery);
let Ilushechkin = new Teacher(IPOVS, "Ilushechkin", deanery);
let POFESSOR_KOLDAEV = new Teacher(IPOVS, "POFESSOR_KOLDAEV", deanery);
let Morozova = new Teacher(OF, "Morozova", deanery);
let Hahalin = new Teacher(VM_1, "Hahalin", deanery);

for (let i=1; i<18; i+=7){
    Kozhan.createProgress(new Date(2020, 3, i));
    Ilushechkin.createProgress(new Date(2020, 3, i));
    POFESSOR_KOLDAEV.createProgress(new Date(2020, 3, i));
    Morozova.createProgress(new Date(2020, 3, i));
    Hahalin.createProgress(new Date(2020, 3, i));
}

Kozhan.createProgress(new Date(2020, 3, 25));
POFESSOR_KOLDAEV.createProgress(new Date(2020, 3, 25));
Morozova.createProgress(new Date(2020, 3, 25));
deanery.NotifyObservers();

