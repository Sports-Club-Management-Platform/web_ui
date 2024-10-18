import config from "@/config";
import { createClient } from "./client";
import { PavilionPost } from "@/lib/types";


const client = createClient(config.API_USER_URL);

const PavilionsService = {
    async getPavilions() {
        return client.get("/pavilions");
    },
    async getPavilion(id: string) {
        return client.get(`/pavilions/${id}`);
    },
    async createPavilion(data: PavilionPost) {
        return client.post("/pavilions", data);
    },
    async updatePavilion(id: string, data: PavilionPost) {
        return client.put(`/pavilions/${id}`, data);
    },
    async deletePavilion(id: string) {
        return client.delete(`/pavilions/${id}`);
    },
};

export { PavilionsService };