import http from "./httpService";
import {apiEndpoint} from "../config";

export function getRentals() {
    return http.get(apiEndpoint + '/rentals');
}
export default { getRentals };