import Feed from "../../../shared/Feed/Feed";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import AddPostModal from "../../../Components/AddPostModal/AddPostModal";
import AddReelsModal from "../../../Components/AddReelsModal/AddReelsModal";
import AddVideoModal from "../../../Components/AddVideoModal/AddVideoModal";

const Feeds = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: news = [], refetch } = useQuery({
    queryKey: ["feeds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feeds");
      return res.data;
    },
  });

  return (
    <div>
      <div className="p-5 my-3 rounded-md shadow-md space-y-4 border">
        <div  className="flex items-center gap-2">
        <div className="avatar">
  <div className="w-10 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>
<h2 className="px-4 py-2 rounded-full bg-gray-200 font-semibold text-slate-600 w-full">Hey {user?.displayName}, share your feelings ?</h2>
        </div>
        <hr />
        <div className="flex items-center gap-5 justify-between">
        <AddPostModal refetch={refetch}/>
             <AddReelsModal/>
              <AddVideoModal refetch={refetch}/>
        </div>
      </div>
      {
        news?.length === 0 ? <p className="text-center text-red-600 font-medium mt-20">No Post !</p> : <div className="grid grid-cols-1 gap-2">
        {news.map((feed) => (
          <Feed key={feed._id} feed={feed} refetch={refetch}></Feed>
        ))}
      </div>
      }
    </div>
  );
};

export default Feeds;
