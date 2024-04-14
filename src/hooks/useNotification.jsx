import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useNotification = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    console.log(user?.email);
    const {data:nofitications = [], refetch:notifyRefetch, isLoading} = useQuery({
        queryKey: ["notifications", user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`notification?email=${user?.email}`);
            console.log(res.data);
            return res.data
        }
    })
    return [nofitications, notifyRefetch, isLoading]
};

export default useNotification;