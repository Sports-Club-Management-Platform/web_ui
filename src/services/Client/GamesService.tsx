import config from "@/config";
import { createClient } from "./client";
import { GamePost } from "@/lib/types";

const client = createClient(config.API_USER_URL)

const GamesService = {
    async getGames() {
        return client.get("/games");
    },
    async getGame(id: string) {
        return client.get(`/games/${id}`);
    },
    async createGame(data: GamePost) {
        return client.post("/games", data);
    },
    async updateGame(id: string, data: GamePost) {
        return client.put(`/games/${id}`, data);
    },
    async deleteGame(id: string) {
        return client.delete(`/games/${id}`);
    },
};

export { GamesService };