import { useQuery } from "@tanstack/react-query";
import Navber from "../../shared/Navber/Navber";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Reel from "../../shared/Reel/Reel";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";


const Reels = () => {
    const axiosSecure = useAxiosSecure()
    const {data: reels = [], refetch} = useQuery({
        queryKey: ['feels'],
        queryFn: async()=>{
                const res = await axiosSecure.get("/reels")
                return res.data
        }
    }) 
    // console.log(reels);
    return (
        <div>
            <Navber/>
            <SectionHelmet title={"Free Time | Reels"}/>
           <div className=" md:w-[30%] mx-auto">
           {
            reels?.length === 0 ? <p className="text-red-500 text-center font-semibold mt-10">No Reels Available !</p> : <div className="grid grid-cols-1 gap-3">
            {
                reels.map(reel => <Reel key={reel._id} reel={reel} refetch={refetch}/>)
            }
       </div>
           }
           </div>
        </div>
    );
};

export default Reels;