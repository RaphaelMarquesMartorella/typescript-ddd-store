import EventInterface from "../../@shared/event/event.interface";
import CustomerCreatedEvent from "./customer-created.event";

export default class CustomerAdressUpdatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: CustomerCreatedEvent;

    constructor(eventData: CustomerCreatedEvent) {
        this.eventData = eventData.eventData;
        this.dataTimeOccurred = new Date();
    }

    changeAddress(adress: string): CustomerCreatedEvent {
        this.eventData.adress = adress
        return this.eventData;
    }

}