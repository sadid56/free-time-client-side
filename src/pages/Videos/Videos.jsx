import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Video from "../../shared/video/Video";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";

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
      <SectionHelmet title={"Free Time | Videos"}/>
     
        {
        videos?.length === 0 ? <p className="text-xl text-center text-red-600 mt-20 font-medium">No Video!</p> : <div className="md:mx-20">  
        {videos.map((video) => (
          <Video key={video?._id} refetch={refetch} videos={video} />
        ))}
      </div>
      }
        
      
    </section>
  );
};

export default Videos;
