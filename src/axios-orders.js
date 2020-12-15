import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilderv2-d9994.firebaseio.com/'
})

export default instance;
