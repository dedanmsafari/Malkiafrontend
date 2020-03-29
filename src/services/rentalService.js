import http from "./httpService";
import {apiEndpoint} from "../config";

function rentalUrl(rentalId) {
    return (`${apiEndpoint}/rentals/${rentalId}`)
}

export function getRentals() {
    return http.get(apiEndpoint + '/rentals');
}
export function saveRental(rental) {
    if (rental._id) {
        const body = {
            ...rental
        };
        delete body._id;
        return http.post(apiEndpoint + '/returns', body);

    }
    return http.post(apiEndpoint + '/rentals', rental);
}

export function getRental(rentalId) {
    return http.get(rentalUrl(rentalId));
}