import axios from "axios";

const axiosMessanger  = axios.create({
    baseURL: 'http://localhost:5000/'
})
//http://localhost:9000/
const useAxiosMessanger = () => {
    return axiosMessanger
}
 
export default useAxiosMessanger;