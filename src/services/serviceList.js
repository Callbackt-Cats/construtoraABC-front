import api from './api';

export default function List(url) {
    const response = api.get(url, {
    }).then(response => {
        return response;
    });
    return response;
}