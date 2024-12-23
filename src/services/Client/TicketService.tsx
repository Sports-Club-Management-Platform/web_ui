import {createClient} from "./client.tsx";
import config from "../../config";

const client = createClient(config.API_TICKETS_URL);

const TicketService = {
  async getTickets() {
    return client.get("/");
  },
}

export { TicketService };