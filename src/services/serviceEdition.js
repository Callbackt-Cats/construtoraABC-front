import api from './api';

export default async function Edition(url, data) {
    const response = await api.post(url, data);
    if (response.status == 200) {
       return true;
    }else{
        return false;
    }
}