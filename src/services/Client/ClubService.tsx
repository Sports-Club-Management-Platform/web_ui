import config from "@/config";
import { createClient } from "./client";
import { ClubPost } from "@/lib/types";

const client = createClient(config.API_CLUBS_URL);

const ClubService = {
    async getClubs() {
        return client.get("/");
    },
    async getClub(id: string) {
        return client.get(`/${id}`);
    },
    async createClub(data: ClubPost) {
        return client.post("/", data);
    },
    async updateClub(id: string, data: ClubPost) {
        return client.put(`/${id}`, data);
    },
    async deleteClub(id: string) {
        return client.delete(`/${id}`);
    },
};

export { ClubService };