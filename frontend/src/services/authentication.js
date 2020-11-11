import { post } from './crud';

class UserService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/auth/';
  }

  processLogRequest(ending, data) {
    return post(this.baseUrl + ending, data);
  }

  logoutCurrentUser() {
    return post(this.baseUrl + 'logout');
  }
}

export default UserService;
