import {createClient} from "./client.tsx";
import config from "../../config";
import { TicketPost, TicketUpdate, TicketBuy } from "@/lib/types.ts";

const client = createClient(config.API_TICKETS_URL);

const TicketService = {
  async getTickets() {
    return client.get("");
  },

  async getTicketById(ticketId: string) {
    return client.get(`/${ticketId}`);
  },
  
  async getTicketByGameId(gameId: string) {
    return client.get(`/game/${gameId}`);
  },
  
  async createTicket(ticket: TicketPost) {
    const formData = new FormData();

    // Append all ticket fields to FormData
    Object.entries(ticket).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value, value.name);
      } else {
        formData.append(key, value.toString());
      }
    });

    return client.post("", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async updateTicket(ticketId: string, ticket: TicketUpdate) {
    return client.put(`/${ticketId}`, ticket);
  },

  async deleteTicket(ticketId: string) {
    return client.delete(`/${ticketId}`);
  },

  async buyTicket(ticket: TicketBuy) {
    return client.post("/buy", ticket);
  },

  async validateTicket(ticketId: string) {
    return client.post(`/${ticketId}/validate`);
  }

}

export { TicketService };