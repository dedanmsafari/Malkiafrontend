import http from "./httpService";
import {apiEndpoint} from "../config";

export function getCustomers() {
    return http.get(apiEndpoint + '/customers');
}
export default { getCustomers };