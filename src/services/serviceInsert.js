import api from './api';

export default async function Insert(url, data) {
    const response = await api.put(url, data);
    if (response.status == 200) {
       return true;
    }else{
        return false;
    }
}