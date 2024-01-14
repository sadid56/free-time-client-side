/* eslint-disable react/prop-types */
import { FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import ReactPlayer from "react-player";
import ReelComment from "../../Components/ReelsCommant/ReelComme";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useInView } from "react-intersection-observer";
import { MdBookmark } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Reel = ({ reel, refetch }) => {
  const { name, title, time, auther_image, reels, _id, comments, likes } = reel;
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const [ref, inView, ] = useInView();
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
  // console.log(inView);
  // console.log(entry);
  const handleAddSave = async()=>{
    try{
     const postInfo = {
       name: name,
       title: title,
       time: time,
       email: user?.email,
       auther_image:auther_image,
       video: reels,
     }
     const res = await axiosSecure.post("/playlist", postInfo)
     if(res.data?.acknowledged){
       toast.success("Video added Success !")
     }
    }catch(err){
     toast.error(err?.message)
    }
  }
  return (
    <div ref={ref} className="border rounded-md shadow-md  relative h-[100vh]">
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
       <div className="w-full h-[100vh]">
       <ReactPlayer
          controls
          playing={inView}
          volume={0.5}
          url={reels}
          width="100%"
          height="100%"
        />
       </div>
        <div className="flex flex-col py-5 px-3 space-y-10 text-xl bg-slate-200 rounded-full w-fit absolute bottom-32 md:-right-14 right-2">
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
          <button onClick={handleAddSave}>
            <MdBookmark/>
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-1  absolute bottom-0 bg-[rgba(0,0,0,0.5)] w-full z-50">
        <h3 className="text-xl font-medium  text-white">{title}</h3>
        <p className="text-sm text-gray-200">{time?.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default Reel;
