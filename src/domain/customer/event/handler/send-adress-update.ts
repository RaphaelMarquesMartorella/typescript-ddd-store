import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAdressUpdatedEvent from "../customer-adress-updated";

export default class SendAdressUpdated implements EventHandlerInterface<CustomerAdressUpdatedEvent> {
    handle(event: CustomerAdressUpdatedEvent): void {
        console.log(`Adress from the client: ${event.eventData.id}, ${event.eventData.name}, was altered to adress:${event.eventData.adress}`)
    }
}