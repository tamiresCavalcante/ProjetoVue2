import axios from 'axios';


const api = axios.create({
    baseURL: 'https://run.mocky.io/v3/1a724142-9ae6-46cd-86cd-3ddffc589228'
});

export default api;