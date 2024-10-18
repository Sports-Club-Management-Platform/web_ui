import config from "@/config";
import { createClient } from "./client";
import { ClubPost } from "@/lib/types";

const client = createClient(config.API_USER_URL);

const ClubService = {
    async getClubs() {
        return client.get("/clubs");
    },
    async getClub(id: string) {
        return client.get(`/clubs/${id}`);
    },
    async createClub(data: ClubPost) {
        return client.post("/clubs", data);
    },
    async updateClub(id: string, data: ClubPost) {
        return client.put(`/clubs/${id}`, data);
    },
    async deleteClub(id: string) {
        return client.delete(`/clubs/${id}`);
    },
};

export { ClubService };