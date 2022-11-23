import createApiClient from "./api.service";

class ReviewService {
    constructor(baseUrl = "/api/reviews"){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }
    async create(data) {
        // data.body = data.body.replaceAll('\n','');
        return (await this.api.post("/",data)).data;
    }
    async deleteAll(){
        return (await this.api.delete("/")).data;
    }
    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id,data){
        // data.body = data.body.replaceAll('\n','<div></div>');
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteAllSource(id_source){
        return (await this.api.delete(`/allsource/${id_source}`)).data;
    }
}

export default new ReviewService();