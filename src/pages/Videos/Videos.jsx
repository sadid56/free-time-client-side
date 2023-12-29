import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Video from "../../shared/video/Video";

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
    <div>
      {videos.map((video) => (
        <Video key={video?._id} refetch={refetch} videos={video} />
      ))}
    </div>
  );
};

export default Videos;
