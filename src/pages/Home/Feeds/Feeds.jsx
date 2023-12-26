
import Feed from "../../../shared/Feed/Feed";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Feeds = () => {
  const axiosSecure = useAxiosSecure();

  const { data: news = [], refetch } = useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feeds");
      return res.data;
    },
  });
  

  return (
    <div>
      <div></div>
      <div className="grid grid-cols-1 gap-2">
        {news.map((feed) => (
          <Feed key={feed._id} feed={feed} refetch={refetch}></Feed>
        ))}
      </div>
    </div>
  );
};

export default Feeds;
