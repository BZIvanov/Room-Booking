import { post } from './crud';

class UserService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/auth/';
    }

    processLogRequest(ending, data) {
        return post(this.baseUrl + ending, data);
    }
}

export default UserService;
