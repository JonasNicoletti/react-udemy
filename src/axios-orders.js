import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burger-7867d.firebaseio.com/'
})

export default instance;