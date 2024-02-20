import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
    id: string;
    name: string;
    sirname: string;
    age: number;
    adress: string;

    constructor(eventData:{ [key: string]: any}){
        this.eventData = eventData;
        this.dataTimeOccurred = new Date();
    }
}