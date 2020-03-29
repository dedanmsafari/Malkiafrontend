import http from "./httpService";
import {apiEndpoint} from "../config";

function customerUrl(customerId) {
    return (`${apiEndpoint}/customers/${customerId}`)
}
export function saveCustomer(customer) {
    if (customer._id) {
        const body = {
            ...customer
        };
        delete body._id;
        return http.put(customerUrl(customer._id), body);

    }
    return http.post(apiEndpoint + '/customers',customer);
}
export function getCustomers() {
    return http.get(apiEndpoint + '/customers');
}
export function getCustomer(customerId) {
    return http.get(customerUrl(customerId));
}
