import axios from 'axios';
import Cookies from 'js-cookie';

const Authorization = Cookies.get('__s');

const API_BASE = 'http://localhost:7900/';

export default axios.create({
  baseURL: API_BASE,
  withCredentials: false, // true in live
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization
  }
});
