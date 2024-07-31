import axios, {Axios} from 'axios';


// TODO improve this because there's a lot of repetition (get, post, delete are pretty much exactly the same)
class APIClass {
    private client: Axios;

    constructor() {
        this.client = axios.create({
            baseURL: "/api/",
            timeout: 10000
        })
    }

    private handleError(err: any) {
        if(err.response) {
            alert("Bad response: " + err.response.data.detail);
        }
        else if (err.request) {
            alert("Bad request: " + err.request);
        }
        else {
            alert("Unknown error: " + err);
        }
    }
        
    // TODO these functions are literally all the same
    


    async get(endpoint: string, parameters: Object = {}) {
        endpoint = endpoint.trim();

        try {
            const res = await this.client.get(endpoint, { params: parameters });
            return res.data;
        } 
        catch(err) { 
            this.handleError(err);
            throw err; // for caller to use
        }
    }

    async post(endpoint: string, data: Object) {
        endpoint = endpoint.trim();

        try {
            const res = await this.client.post(endpoint, data);
            return res.data;
        }
        catch(err) {
            this.handleError(err);
            throw err; // for caller to use
        }
    }

    async patch(endpoint: string, data: Object) {
        endpoint = endpoint.trim();

        try {
            const res = await this.client.patch(endpoint, data);
            return res.data;
        }
        catch(err) {
            this.handleError(err);
            throw err; // for caller to use
        }
    }

    async delete(endpoint: string) {
        endpoint = endpoint.trim();

        try {
            const res = await this.client.delete(endpoint);
            return res.data;
        }
        catch(err) {
            this.handleError(err);
            throw err; // for caller to use
        }
    }
}

const API = new APIClass();
export default API;
