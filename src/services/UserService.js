import axios from "axios";
import Utils from './Utils';
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const API_BASE_URL = "http://localhost:8080/";

class UserService {
  loginUser(user) {
    return axios.post(API_BASE_URL + 'login', user); 
  }

  getUser() {
    return axios.get(API_BASE_URL + 'user',  { headers: Utils.getJWTToken() }); 
  }

  registerUser(user) {
    console.log(API_BASE_URL + 'register');
    return axios.post(API_BASE_URL + 'register', user);        
  }

  deleteUser(id) {
    console.log(API_BASE_URL + 'user/' + id);
    return axios.delete(API_BASE_URL + 'user/' + id, { headers: Utils.getJWTToken() });        
  }

  editUser(id, user) {
    console.log(API_BASE_URL + 'user', user);
    return axios.patch(API_BASE_URL + 'user/' + id, user, { headers: Utils.getJWTToken() });        
  }

  updatePassword(id, password){
    return axios.patch(API_BASE_URL + 'user/' + id +'/password',password,{ headers: Utils.getJWTToken() }); 
  }

  updateRole(id, role){
    return axios.patch(API_BASE_URL + 'user/' + id +'/role',role,{ headers: Utils.getJWTToken() }); 
  }

  getCurrentUserData() {
    return axios.get(API_BASE_URL + 'me', { headers: Utils.getJWTToken() });
  }
}

export default new UserService();
