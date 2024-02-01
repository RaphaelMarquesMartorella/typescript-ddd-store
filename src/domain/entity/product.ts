export default class Product {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        if (!id) {
            throw new Error("Id is required");
        }
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }

    validate() {
        if (this._id === "") {
            throw new Error("Id is required");
        }
        if (this._name === "") {
            throw new Error("Name is required")
        }
        if (this._price < 0) {
            throw new Error("Price must be greater than zero")
        }
        return true;
    }

    public changeName(name: string) {
        this._name = name;
        this.validate();
    }
    public changePrice(price: number) {
        this._price = price;
        this.validate();
    }
}