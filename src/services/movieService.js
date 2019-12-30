import http from './httpService';
import {
    apiEndpoint
} from '../config';

function movieUrl(movieId) {
    return (`${apiEndpoint}/movies/${movieId}`)
}
export function getMovies() {
    return http.get(apiEndpoint + '/movies');
}
export function saveMovie(movie) {
    if (movie._id) {
        const body = {
            ...movie
        };
        delete body._id;
        return http.put(movieUrl(movie._id), body);

    }
    return http.post(apiEndpoint + '/movies', movie);
}
export function getMovie(movieId) {
    return http.get(movieUrl(movieId));
}
export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}