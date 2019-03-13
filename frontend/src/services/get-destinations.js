import { get, post } from './crud';

class DestinationsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/destination';
    }

    getAllDestinations() {
        return get(`${this.baseUrl}/all`);
    }

    createNewDestination(data) {
        return post(`${this.baseUrl}/create`, data);
    }
}

export default DestinationsService;
