import { useQuery } from "@tanstack/react-query";
import Navber from "../../shared/Navber/Navber";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Reel from "../../shared/Reel/Reel";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";


const Reels = () => {
    const axiosSecure = useAxiosSecure()
    const {data: reels = []} = useQuery({
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
           <div>
           <div className=" w-[30%] space-y-3 mx-auto h-screen">
                {
                    reels.map(reel => <Reel key={reel._id} reel={reel}/>)
                }
           </div>
           </div>
        </div>
    );
};

export default Reels;