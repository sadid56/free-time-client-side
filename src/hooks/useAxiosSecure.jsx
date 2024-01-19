import axios from "axios";

const axiosSecure  = axios.create({
    baseURL: 'https://free-time-server-side.vercel.app/'
})

const useAxiosSecure = () => {
    return axiosSecure
}
 
export default useAxiosSecure;