import {createClient} from "./client.tsx";
import config from "../../config";

const client = createClient(config.API_TICKETS_URL);

const TicketService = {
  async getTickets() {
    return client.get("/");
  },
  async getTicketByGameId(gameId: string) {
    return client.get(`/game/${gameId}`);
  },
}

export { TicketService };