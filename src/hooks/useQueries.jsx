import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

const BASE_URL = 'http://127.0.0.1:8000';

const getFetchData = async (url, token) => {
    const {data} = await axios.get(`${BASE_URL}${url}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return data;
}

export const useFetchQuery = (url = '',  token, queryName = '') => {
    return useQuery({
        queryKey: [queryName],
        queryFn: () => getFetchData(url, token)
    });
}

