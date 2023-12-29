/* eslint-disable react/prop-types */
import { FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import ReactPlayer from "react-player";
import ReelComment from "../../Components/ReelsCommant/ReelComme";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Reel = ({ reel, refetch }) => {
  const { name, title, time, auther_image, reels, _id, comments, likes } = reel;
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const axiosPublic = useAxiosPublic();
  // console.log(reel);
  const shareHandler = async () => {
    const feedUrl = `${window.location.origin}/reels/${_id}`;
    if ("share" in navigator) {
      await navigator.share({
        title: "Share",
        text: "Share this url",
        url: feedUrl,
      });
    } else {
      toast.error("Share not supported by your browser");
    }
  };
  const handleLike = async () => {
    try {
      await axiosPublic.post(`/reels/likes/${_id}`);
      setLiked(true);
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      // console.log(res.data);
    } catch (err) {
      console.log("post error-->", err);
    }
  };
  return (
    <div className="border rounded-md shadow-md p-1">
      <div className="relative">
        <div className="flex items-center gap-2 absolute  p-3 bg-[rgba(0,0,0,0.5)] w-full">
          <div className="avatar right-1">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl text-white font-bold">{name}</h3>
          </div>
        </div>
        <ReactPlayer
          controls
          // playing={true}
          volume={"#357"}
          url={reels}
          width="100%"
          height="100%"
        />
        <div className="flex flex-col py-5 px-3 space-y-10 text-xl bg-slate-200 rounded-full w-fit absolute bottom-32 right-3">
          {liked ? (
            <button className="flex flex-col items-center text-pink-500 gap-1 text-xl">
              <FaRegHeart /> {likeCount}
            </button>
          ) : (
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1 text-xl">
              <FaRegHeart /> {likeCount}
            </button>
          )}
          <ReelComment refetch={refetch} id={_id} comments={comments} />
          <button onClick={shareHandler}>
            <IoIosShareAlt />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-1 ml-2">
        <h3 className="text-xl font-medium  ">{title}</h3>
        <p className="text-sm text-gray-500">{time?.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default Reel;
