import Address from "./address";
import Customer from "./customer";

describe("Costumer unit tests", () => {
    it("should throw an error when id is empty", () => {
        expect(() => new Customer("", "John Doe")).toThrowError("Id is required");
    })

    it("should throw an error when name is empty", () => {
        expect(() => new Customer("123", "")).toThrowError("Name is required");
    })

    it("should change name", () => {
        const costumer = new Customer("123", "John Doe");
        costumer.changeName("Jane Doe");
        expect(costumer.name).toBe("Jane Doe");
    })
    it("should activate customer", () => {
        const costumer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "12345", "City");
        costumer.Address = address;

        costumer.activate();

        expect(costumer.isActive()).toBe(true);
    })
    it("should deactivate customer", () => {
        const costumer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "12345", "City");
        costumer.Address = address;

        costumer.deactivate();

        expect(costumer.isActive()).toBe(false);
    })
    it("should throw an error when address is undefined when you active a customer", () => {
        
        expect(() => { 
            const costumer = new Customer("123", "John Doe");
            costumer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
    });
    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(20);
        expect(customer.rewardPoints).toBe(30);
    });

});