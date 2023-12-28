import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Video from "../../../shared/video/Video";


const Videos = () => {
    const axiosSecure = useAxiosSecure();
  
    const { data: videos = [], refetch } = useQuery({
      queryKey: ["video"],
      queryFn: async () => {
        const res = await axiosSecure.get("/videos");
        return res.data;
      },
    });
    return (
        <div>
            <div className="grid grid-cols-1 gap-2">
        {videos.map((video) => (
          <Video key={video._id} videos={video} refetch={refetch}></Video>
        ))}
      </div>
        </div>
    );
};

export default Videos;