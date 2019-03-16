import { get, post, remove } from './crud';

class DestinationsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/destination';
    }

    getAllDestinations() {
        return get(`${this.baseUrl}/all`);
    }

    getCurrentDestination(id) {
        return get(`${this.baseUrl}/specific/${id}`);
    }

    createNewDestination(data) {
        return post(`${this.baseUrl}/create`, data);
    }

    editCurrentDestination(id, data) {
        return post(`${this.baseUrl}/edit/${id}`, data);
    }

    deleteCurrentDestination(id) {
        return remove(`${this.baseUrl}/delete/${id}`);
    }

    visitCurrentDestination(id) {
        return post(`${this.baseUrl}/like/${id}`);
    }

    unsubscribeCurrentDestination(id) {
        return post(`${this.baseUrl}/unlike/${id}`);
    }
}

export default DestinationsService;
