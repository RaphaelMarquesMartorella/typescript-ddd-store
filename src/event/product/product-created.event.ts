import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;
    constructor(eventData: { [key: string]: any}) {
        this.dataTimeOccured = new Date();
        this.eventData = eventData;
    }
}