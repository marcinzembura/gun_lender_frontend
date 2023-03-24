class Utils {
  getJWTToken() {
    const accessToken = localStorage.getItem('user');
    return accessToken != null ? { Authorization: accessToken } : {}; 
  }
}

export default new Utils();

