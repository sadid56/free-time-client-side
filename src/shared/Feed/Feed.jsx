/* eslint-disable react/prop-types */
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import CommentsModal from "../CommentsModal/CommentsModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
// import useAuth from "../../hooks/useAuth";

// import FeedsShareModal from "../../Components/FeedsShareModal/FeedsShareModal";
import toast from "react-hot-toast";
import { IoIosShareAlt } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

const Feed = ({ feed , refetch}) => {
  const { name, article, time, likes, comments, _id, auther_image, image } = feed;
  const axiosPublic = useAxiosPublic()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes); 
  const [isToggle, setIsToggle] = useState(false);
  const handleLike = async()=>{
        try{
          await axiosPublic.post(`/feeds/likes/${_id}`)
          setLiked(true)
          setLikeCount((prevLikeCount) => prevLikeCount + 1);
          // console.log(res.data);
        }catch(err){
          console.log('post error-->', err);
        }
  }
  const shareHandler = async () => {
    const feedUrl = `${window.location.origin}/feeds/${_id}`; 
    if ("share" in navigator) {
      await navigator.share({
        title: "Share",
        text: "Share this url",
        url: feedUrl
      })
    } else {
      toast.error("Share not supported by your browser")
    }
  }

  return (
    <div className="p-5 border rounded-md">
      <div className="flex justify-between items-center gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium">{name}</h3>
            <p className="text-sm text-gray-500">{time?.slice(0, 10)}</p>
          </div>
        </div>
        <button onClick={() => setIsToggle(!isToggle)} className={`text-2xl `}>
          {isToggle ? <MdClose /> : <HiDotsVertical />}
        </button>
        <div
          className={`${
            isToggle
              ? "absolute right-4 top-9 bg-slate-700 p-5 rounded-md shadow-md"
              : "hidden"
          } flex flex-col gap-2 `}>
          <button onClick={shareHandler} className="flex items-center gap-1 text-xl text-white hover:bg-slate-600 bg-slate-400 px-4 py-2 rounded-md transform-all duration-300"><IoIosShareAlt /> Share</button>
        </div>
      </div>
      <h5 className="font-medium my-5">{article}</h5>

      <div>
        <img src={image} className="object-cover h-[450px] w-full" alt="" />
      </div>

      {/* react  */}
      <div className="flex justify-between mt-5 px-16 border-2 p-2 rounded-md">
        {
          liked ? <button className="flex items-center text-pink-500 gap-1 text-xl">
          <BiSolidLike /> {likeCount}
        </button> :
        <button onClick={handleLike} className="flex items-center gap-1 text-xl">
        <AiOutlineLike /> {likeCount}
      </button>
        }
         <CommentsModal comments={comments} id={_id} refetch={refetch}/>
        
      </div>
    </div>
  );
};

export default Feed;
