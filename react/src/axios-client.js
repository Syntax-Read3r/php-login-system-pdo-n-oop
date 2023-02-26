import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// put intercepters... These are special functions which will be executed before the request is send or after a response is received

axiosClient.interceptors.request.use((config) => {

    const token = localStorage.getItem('ACCESS_TOKEN')

    config.headers.Authorization = `Bearer ${token}`

    return config;
})

// Above is the request interceptor
// Below is the response interceptor

axiosClient.interceptors.response.use((response) => {


    return response
}, (error) => {
    const {response} = error
    // here I am checking if the response status is 401, meaning the user is not auth or the token does not exist
    if(response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    } else {
        throw error
    }
})

export default axiosClient;