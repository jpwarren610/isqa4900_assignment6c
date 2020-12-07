import axios from "axios";
const API_URL = "https://jpwarren610.pythonanywhere.com/";

export class APIService {
  constructor() {}

  getCook(param_pk) {
    const url = `${API_URL}/api/cooks/${param_pk}`;
    let jwtToken = localStorage.getItem("token");
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.get(url, { headers: { Authorization: `jwt ${jwtToken}` } });
  }

  getCookList() {
    const url = `${API_URL}/api/cooks/`;
    let jwtToken = localStorage.getItem("token");
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.get(url, { headers: headers });
  }

  addNewCook(cook) {
    const url = `${API_URL}/api/cooks/`;
    let jwtToken = localStorage.getItem("token");
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.post(url, cook, { headers: headers });
  }

  updateCook(cook) {
    const url = `${API_URL}/api/cooks/${cook.pk}`;
    let jwtToken = localStorage.getItem("token");
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.put(url, cook, { headers: headers });
  }

  deleteCook(cook_Pk) {
    const url = `${API_URL}/api/cooks/${cook_Pk}`;
    let jwtToken = localStorage.getItem("token");
    const headers = { Authorization: `jwt ${jwtToken}` };
    return axios.delete(url, { headers: headers });
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
}
