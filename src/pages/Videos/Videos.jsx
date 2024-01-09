import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Video from "../../shared/video/Video";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";
import Navber from "../../shared/Navber/Navber";
import Sideber from "../Home/Sideber/Sideber";

const Videos = () => {
  const axiosSecure = useAxiosSecure();
  // const {user} = useAuth()
  const { data: videos = [], refetch } = useQuery({
    queryKey: ["video"],
    queryFn: async () => {
      const res = await axiosSecure.get("/videos");
      return res.data;
    },
  });
  return (
    <section>
      <Navber/>
      <SectionHelmet title={"Free Time | Videos"}/>
      <div className="flex justify-between gap-20">
        <div className="md:w-[30%] fixed top-0 overflow-y-auto">
        <Sideber/>
        </div>
        <div className="md:w-[70%] md:ml-[30%] md:mx-20"> 
        {
        videos?.length === 0 ? <p className="text-xl text-center text-red-600 mt-20 font-medium">No Video!</p> : <div>  
        {videos.map((video) => (
          <Video key={video?._id} refetch={refetch} videos={video} />
        ))}
      </div>
      }
        </div>
      </div>
    </section>
  );
};

export default Videos;
