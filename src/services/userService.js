import http from './httpService';
import {
    apiEndpoint
} from '../config';

const apiUrl = apiEndpoint + '/users'

export function register(user) {

    return http.post(apiUrl, {
        name: user.name,
        email: user.username,
        password: user.password
    });
}