import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Friend from "../../../shared/Friend/Friend";


const Friends = () => {
    const axiosPublic = useAxiosPublic()
    const {data: friends = []} = useQuery({
        queryKey:['friends'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    // console.log(friends);
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
            {
                friends?.map(friend => <Friend key={friend?._id} friend={friend}/>)
            }
        </div>
    );
};

export default Friends;