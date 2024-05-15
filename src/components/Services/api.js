import axios from 'axios'
import Cookies from 'js-cookie';
import config from '../public/config'

const Api = () => {
    const authToken = Cookies.get("authToken", {
      domain: process.env.REACT_APP_DOMAIN,
    });
    return axios.create({
        baseURL: config.api,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            authorization: authToken ? `Bearer ${authToken}` : null,
           
        }
    })
}

export default Api