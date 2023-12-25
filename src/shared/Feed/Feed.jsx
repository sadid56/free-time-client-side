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

const Feed = ({ feed , refetch}) => {
  const { name, article, time, likes, comments, _id } = feed;
  const axiosPublic = useAxiosPublic()
  const [liked, setLiked] = useState(false)
  // const {user}= useAuth()
  const [likeCount, setLikeCount] = useState(likes); 

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

  // const shareOnFacebook = () => {
  //   const feedUrl = `${window.location.origin}/feeds/${_id}`; // Change this URL based on your actual URL structure

  //   // Open Facebook Share Dialog
  //   window.FB.ui({
  //     method: "share",
  //     href: feedUrl,
  //   });
  // };
// console.log(comments);
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
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{time.slice(0,10)}</p>
        </div>
      </div>
      <h5 className="font-medium my-5">{article}</h5>

      {/* react  */}
      <div className="flex justify-between px-10 my-5 border-2 p-2 rounded-md">
        {
          liked ? <button className="flex items-center text-pink-500 gap-1 text-xl">
          <BiSolidLike /> {likeCount}
        </button> :
        <button onClick={handleLike} className="flex items-center gap-1 text-xl">
        <AiOutlineLike /> {likeCount}
      </button>
        }
         <CommentsModal comments={comments} id={_id} refetch={refetch}/>
        {/* <FeedsShareModal/> */}
        <button onClick={shareHandler} className="flex items-center gap-1 text-xl"><IoIosShareAlt /> Share</button>
      </div>
    </div>
  );
};

export default Feed;
