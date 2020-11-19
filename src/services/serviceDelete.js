import api from './api';

export default async function Delete(url, id) {
    const response = await api.delete(`${url}${id}`); 
    if (response.status == 200) {
       return true;
    }else{
        return false;
    }
}