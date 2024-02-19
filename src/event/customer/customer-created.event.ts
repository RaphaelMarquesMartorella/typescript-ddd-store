import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;
    id: string;
    name: string;
    sirname: string;
    age: number;
    adress: string;

    constructor(eventData:{ [key: string]: any}){
        this.eventData = eventData;
        this.dataTimeOccured = new Date();
    }
}