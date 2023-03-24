import axios from 'axios';
import Utils from './Utils';
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const API_BASE_URL = "http://localhost:8080/";

class AmmoService {
  getAmmo() {
    return axios.get(API_BASE_URL + 'ammo', { headers: Utils.getJWTToken() });  
  }
  // getAmmo() {
  //   return axios.get(API_BASE_URL + 'ammo');  
  // }

  addAmmo(ammo) {
    return axios.post(API_BASE_URL + 'ammo', ammo, { headers: Utils.getJWTToken() });        
  }

  deleteAmmo(id) {
    console.log(API_BASE_URL + 'ammo/' + id);
    return axios.delete(API_BASE_URL + 'ammo/' + id, { headers: Utils.getJWTToken() });        
  }

  editAmmo(id, ammo) {
    console.log(API_BASE_URL + 'ammo/' + id, ammo);
    return axios.patch (API_BASE_URL + 'ammo/' + id, ammo, { headers: Utils.getJWTToken() });        
  }
}

export default new AmmoService();