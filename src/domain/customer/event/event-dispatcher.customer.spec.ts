import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAdressUpdatedEvent from "./customer-adress-updated";
import CustomerCreatedEvent from "./customer-created.event";
import SendAdressUpdated from "./handler/send-adress-update";
import SendConsoleLogHandler1 from "./handler/send-console.log-handler1";
import SendConsoleLogHandler2 from "./handler/send-console.log-handler2";

describe("Domain events tests Customer", () => {
  it("should register an created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogHandler1();
    const eventHandler2 = new SendConsoleLogHandler2();

    eventDispatcher.register("CustomerCreatedEvent", [eventHandler1, eventHandler2]);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);
  });
  it("should register an updated adress event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendAdressUpdated();

    eventDispatcher.register("CustomerAdressUpdatedEvent", [eventHandler]);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressUpdatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAdressUpdatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAdressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogHandler1();
    const eventHandler2 = new SendConsoleLogHandler2();

    eventDispatcher.register("CustomerCreatedEvent", [eventHandler1, eventHandler2]);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      1
    );

  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogHandler1();
    const eventHandler2 = new SendConsoleLogHandler2();

    eventDispatcher.register("CustomerCreatedEvent", [eventHandler1, eventHandler2]);

    expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler1);
      expect(
          eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler1();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "id",  
      name: "Raphael",
      sirname: "Martorella",
      age: 19,
      adress: "silly street",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();


  });
  it("should notify all updated adress event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendAdressUpdated();
    const eventHandlerCreate = new SendConsoleLogHandler1();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");    
    eventDispatcher.register("CustomerAdressUpdatedEvent", [eventHandler, eventHandlerCreate]);

    expect(
      eventDispatcher.getEventHandlers["CustomerAdressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
        id: "id",  
        name: "Raphael",
        sirname: "Martorella",
        age: 19,
        adress: "silly street",
      });

    const customerUpdatedAdressEvent = new CustomerAdressUpdatedEvent(customerCreatedEvent);

    expect(customerUpdatedAdressEvent.eventData).toEqual(expect.objectContaining({
        id: "id",  
        name: "Raphael",
        sirname: "Martorella",
        age: 19,
        adress: "silly street",
    }));

    customerUpdatedAdressEvent.changeAddress("silly street, number 0")

    expect(customerUpdatedAdressEvent.eventData).toEqual(expect.objectContaining({
        id: "id",  
        name: "Raphael",
        sirname: "Martorella",
        age: 19,
        adress: "silly street, number 0",
    }));

    eventDispatcher.notify(customerUpdatedAdressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});