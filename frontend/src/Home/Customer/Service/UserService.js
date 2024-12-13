import axios from 'axios';

class UserService {
  constructor() {
    this.baseUrl = 'http://localhost:9193/api/v1/users';
  }

  // // Attempt to log in a user with the provided credentials
  // userLogin(body) {
  //   return axios.post(`${this.baseUrl}/login`, body).then((response) => response.data);
  // }

  // // Register a new user with the provided user data
  // userRegister(body) {
  //   return axios.post(`${this.baseUrl}/register`, body).then((response) => response.data);
  // }

  // Retrieve a list of all users except the currently logged-in user
  getAllUsersExceptCurrentUser() {
    const currentUser = this.currentUser();
    if (!currentUser) {
      return Promise.reject(new Error('No current user found.'));
    }
    return axios
      .get(`${this.baseUrl}/except/${currentUser}`)
      .then((response) => response.data);
  }

  // Retrieve the conversation ID between two users
  getConversationIdByUser1IdAndUser2Id(user1Id, user2Id) {
    return axios
      .get(`${this.baseUrl}/conversation/id`, {
        params: { user1Id, user2Id },
      })
      .then((response) => response.data);
  }

  // Retrieve the currently logged-in user from local storage
  currentUser() {
    return JSON.parse(localStorage.getItem('CustomerUserID'));
  }
}

export default UserService;
