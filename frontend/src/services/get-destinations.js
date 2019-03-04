import { get } from './crud';

class DestinationsService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/destination';
        this.allDestinationsUrl = `${this.baseUrl}/all`;
    }

    getAllDestinations() {
        return get(this.allDestinationsUrl);
    }
}

export default DestinationsService;
