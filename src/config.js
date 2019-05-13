import axios from 'axios';

const API_BASE = 'http://localhost:7900/';

export default axios.create({
  baseURL: API_BASE,
  withCredentials: false, // true in live
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
