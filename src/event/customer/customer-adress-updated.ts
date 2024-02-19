import EventInterface from "../@shared/event.interface";
import CustomerCreatedEvent from "./customer-created.event";

export default class CustomerAdressUpdatedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: CustomerCreatedEvent;

    constructor(eventData: CustomerCreatedEvent) {
        this.eventData = eventData.eventData;
        this.dataTimeOccured = new Date();
    }

    changeAddress(adress: string): CustomerCreatedEvent {
        this.eventData.adress = adress
        return this.eventData;
    }

}