import axios from "axios";

const axiosSecure  = axios.create({
    baseURL: 'http://localhost:9000/'
})

//https://free-time-server-side.vercel.app/

const useAxiosSecure = () => {
    return axiosSecure
}
 
export default useAxiosSecure;