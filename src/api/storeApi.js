import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

//// Users ////

export const authUser = async ({data}) => {
    const resp = axios.post('/auth/login', data);
    return resp;
}

export const createUser = async ({data}) => {
    const resp = await axios.post('/auth/register', data);
    return resp;
}

export const editUser = async ({params, data, token}) => {
    const resp = await axios.put(`${BASE_URL}/api/users/edit/${params.id}`, data, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return resp.data;
}

//// Companies ////

export const createCompany = async ({data, token}) => {
    const resp = await axios.post(`${BASE_URL}/api/companies/create`, data, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return resp;
}

//// GAMES ////

export const createGame = async ({data, token}) => {
    const resp = await axios.post(`${BASE_URL}/api/games/create`, data, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return resp;
}