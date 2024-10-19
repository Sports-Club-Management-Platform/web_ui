import config from "@/config";
import { createClient } from "./client";
import { PavilionPost } from "@/lib/types";


const client = createClient(config.API_PAVILIONS_URL);

const PavilionsService = {
    async getPavilions() {
        return client.get("/");
    },
    async getPavilion(id: string) {
        return client.get(`/${id}`);
    },
    async createPavilion(data: PavilionPost) {
        return client.post("/", data);
    },
    async updatePavilion(id: string, data: PavilionPost) {
        return client.put(`/${id}`, data);
    },
    async deletePavilion(id: string) {
        return client.delete(`/${id}`);
    },
};

export { PavilionsService };