import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAdressUpdated from "../customer-adress-updated";

export default class SendAdressUpdated implements EventHandlerInterface<CustomerAdressUpdated> {
    handle(event:CustomerAdressUpdated) {
        console.log(`Adress from the client: ${event.eventData.id}, ${event.eventData.name}, was altered to adress:${event.eventData.adress}`)
    }
}