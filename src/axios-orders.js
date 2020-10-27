import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-36206.firebaseio.com/'
})

export default instance;
