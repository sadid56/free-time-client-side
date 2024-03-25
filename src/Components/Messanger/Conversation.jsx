/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Conversation = ({ data,currentUser,online,
//   refetch,
setCurrentChat,
}) => {
  const axiosPublic = useAxiosPublic();
  // get conversation  data with id
  const userId = data?.members.find((id) => id !== currentUser);
  const { data: conversationData, isLoading } = useQuery({
    queryKey: ["conversationData", userId],
    queryFn: () =>
      axiosPublic.get(`/user/${userId}`).then((response) => response.data),
  });
//   console.log(conversationData);
  // conversation skeliton loading
  if (isLoading) {
    return (
      <div className="relative flex w-64 animate-pulse gap-2 p-4">
        <div className="h-10 w-10 rounded-full bg-slate-400"></div>
        <div className="flex-1">
          <div className="mb-1 h-4 w-[80%] rounded-lg bg-slate-400 text-lg"></div>
          <div className="h-2 w-[30%] rounded-lg bg-slate-400 text-sm"></div>
        </div>
      </div>
    );
  }
  return (
      <div onClick={() => setCurrentChat(data)} className={`avatar border-2 rounded-full border-primary ${online ? "online" : ""} cursor-pointer`}>
        <div className="w-10 rounded-full ">
          <img src={conversationData?.photo} />
        </div>
    </div>
  );
};

export default Conversation;
