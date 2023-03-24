import axios from 'axios';
import Utils from './Utils';
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const API_BASE_URL = "http://localhost:8080/";

class LendingService {
  getLending() {
    return axios.get(API_BASE_URL + 'lending', { headers: Utils.getJWTToken() });  
  }

  addLending(lending) {
    return axios.post(API_BASE_URL + 'lending', lending, { headers: Utils.getJWTToken() });        
  }

  deleteLending(id) {
    return axios.delete(API_BASE_URL + 'lending/' + id, { headers: Utils.getJWTToken() });        
  }

  editLending(id, lending) {
    return axios.patch (API_BASE_URL + 'lending/' + id, lending, { headers: Utils.getJWTToken() });        
  }
}

export default new LendingService();