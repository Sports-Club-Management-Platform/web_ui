import config from "@/config";
import { createClient } from "./client";
import { GamePost } from "@/lib/types";

const client = createClient(config.API_GAME_URL);

const GamesService = {
  async getGames() {
    return client.get("");
  },
  async getGame(id: string) {
    return client.get(`/${id}`);
  },
  async createGame(data: GamePost) {
    return client.post("", data);
  },
  async updateGame(id: number, data: GamePost) {
    return client.put(`/${id}`, data);
  },
  async deleteGame(id: number) {
    return client.delete(`/${id}`);
  },
};

export { GamesService };
