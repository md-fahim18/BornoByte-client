
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bornobyte.vercel.app/',
  
  });



const AxiosPublic = () => {
    return instance
};

export default AxiosPublic;