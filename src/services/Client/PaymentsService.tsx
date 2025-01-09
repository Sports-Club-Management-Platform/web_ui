import { createClient } from "./client";
import config from "../../config";

const client = createClient(config.API_PAYMENTS_URL);

const PaymentsService = {
  async create_checkout_session(price_id: string, quantity: number) {
    return client.post("/create-checkout-session" +
        `?price_id=${price_id}&quantity=${quantity}`
    );
  },

  async getTicketStock(ticket_id: number) {
    return client.get(`/stock/${ticket_id}`);
  }
};

export { PaymentsService };
