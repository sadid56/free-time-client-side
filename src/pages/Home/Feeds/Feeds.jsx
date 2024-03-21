import Feed from "../../../shared/Feed/Feed";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import AddPostModal from "../../../Components/AddPostModal/AddPostModal";
import AddReelsModal from "../../../Components/AddReelsModal/AddReelsModal";

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
    <div className=" w-full">
      <div className="">
      <div className="p-5 my-2 rounded-md shadow-md space-y-4 border bg-white">
        <div className="flex items-center gap-2 ">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
          <h2 className="px-4 py-2 rounded-full bg-gray-200 font-semibold text-slate-500 w-full">
            Hey {user?.displayName}, share your feelings ?
          </h2>
        </div>
        <hr />
        <div className="flex items-center gap-5 justify-center">
          <AddPostModal refetch={refetch} />
          <AddReelsModal refetch={refetch}/>
        </div>
      </div>
      {news?.length === 0 ? (
        <p className="text-center text-red-600 font-medium mt-20">No Post !</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 bg-white rounded-md">
          {news.map((feed) => (
            <Feed key={feed._id} feed={feed} refetch={refetch}></Feed>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Feeds;



{/* <div>
import Feed from "../../../shared/Feed/Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import AddPostModal from "../../../Components/AddPostModal/AddPostModal";
import AddReelsModal from "../../../Components/AddReelsModal/AddReelsModal";
import AddVideoModal from "../../../Components/AddVideoModal/AddVideoModal";
import AddverticeContent from "../../../shared/addverticContent/AddverticeContent";
import InfiniteScroll from "react-infinite-scroll-component";

const Feeds = () => {
  // const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const getArticles = async ({ pageParam = 0 }) => {
    const res = await fetch(
      `https://free-time-server-side.vercel.app/feeds?limit=10&offset=${pageParam}`
    );
    const data = await res.json();

    return { ...data, prevOffset: pageParam };
  };
  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: getArticles,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 10 > lastPage.articlesCount) {
        return false;
      }
      return lastPage.prevOffset + 10;
    },
  });

  console.log(data?.pages);

  const articles = data?.pages?.reduce((acc, page) => {
    console.log(acc);
    console.log(page);
    if (page && page.email) {
      return [...acc, ...page.email];
    }
    return acc;
  }, []);

  console.log(articles);

  return (
    <div className="flex w-full gap-3">
      <div className="md:w-[65%]">
        <div className="p-5 my-3 rounded-md shadow-md space-y-4 border">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="User Avatar" />
              </div>
            </div>
            <h2 className="px-4 py-2 rounded-full bg-gray-200 font-semibold text-slate-500 w-full">
              Hey {user?.displayName}, share your feelings ?
            </h2>
          </div>
          <hr />
          <div className="flex items-center gap-5 justify-center">
            <AddPostModal refetch={refetch} />
            <AddReelsModal refetch={refetch} />
            <AddVideoModal refetch={refetch} />
          </div>
        </div>
        {data?.length === 0 ? (
          <p className="text-center text-red-600 font-medium mt-20">
            No Post !
          </p>
        ) : (
          <InfiniteScroll
            dataLength={articles ? articles.length : 0}
            next={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<div>Loading...</div>}>
            <div className="grid grid-cols-1 gap-2">
              {articles?.map((feed) => (
                <Feed key={feed._id} feed={feed} refetch={refetch} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <div className="hidden md:block w-[35%]  mt-3">
        <AddverticeContent />
      </div>
    </div>
  );
};

export default Feeds;

</div> */}