import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const requests=axios.create({
    timeout:5000,
})
requests.interceptors.request.use((config)=>{
    nprogress.start();
    return config;
})
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res
},error => {
    return error
})
export default requests