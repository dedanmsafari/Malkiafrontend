import http from './httpService';

import {
    apiEndpoint
} from '../config';
import jwtDecode from "jwt-decode";

const apiUrl = apiEndpoint + '/auth';
const tokenKey = "token";


http.setJwt(getjwt());

export async function auth(email ,password) {

    const {data: jwt} = await http.post(apiUrl, {
        email,
        password
    })
    localStorage.setItem(tokenKey,jwt);
}

export function  loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
}
export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (ex) {
          return null;
      }
    
}
function getjwt() {
    
    return localStorage.getItem(tokenKey);
}
export default {
auth,logout,getCurrentUser,loginWithJwt,getjwt
};