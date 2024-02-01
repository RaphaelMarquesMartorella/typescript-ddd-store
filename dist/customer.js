"use strict";
class Costumer {
    constructor(id, name, adress) {
        this._id = id;
        this._name = name;
        this._adress = adress;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get adress() {
        return this._adress;
    }
    set id(id) {
        this._id = id;
    }
    set name(name) {
        this._name = name;
    }
    set adress(adress) {
        this._adress = adress;
    }
}
