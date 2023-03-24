import axios from 'axios';
import Utils from './Utils';
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const API_BASE_URL = "http://localhost:8080/";

class GunService {
  getGuns() {
    return axios.get(API_BASE_URL + 'gun');  
  }

  getGun(id) {
    console.log(API_BASE_URL + 'gun/' + id);
    return axios.get(API_BASE_URL + 'gun/' + id, { headers: Utils.getJWTToken() });        
  }

  addGun(gun) {
    return axios.post(API_BASE_URL + 'gun', gun, { headers: Utils.getJWTToken() });        
  }

  deleteGun(id) {
    console.log(API_BASE_URL + 'gun/' + id);
    return axios.delete(API_BASE_URL + 'gun/' + id, { headers: Utils.getJWTToken() });        
  }

  editGun(id, gun) {
    console.log(API_BASE_URL + 'gun', gun);
    return axios.patch (API_BASE_URL + 'gun/' + id, gun, { headers: Utils.getJWTToken() });        
  }
}

export default new GunService();