/* eslint-disable react/prop-types */
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import CommentsModal from "../CommentsModal/CommentsModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
// import useAuth from "../../hooks/useAuth";

const Feed = ({ feed }) => {
  const { name, article, time, likes, comments, _id } = feed;
  const axiosPublic = useAxiosPublic()
  const [liked, setLiked] = useState(false)
  // const {user}= useAuth()
  const [likeCount, setLikeCount] = useState(likes); 

  const handleLike = async()=>{
        try{
          const res = await axiosPublic.post(`/feeds/likes/${_id}`)
          setLiked(true)
          setLikeCount((prevLikeCount) => prevLikeCount + 1);
          console.log(res.data);
        }catch(err){
          console.log('post error-->', err);
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
          liked ? <button className="flex items-center gap-1 text-xl">
          <BiSolidLike /> {likeCount}
        </button> :
        <button onClick={handleLike} className="flex items-center gap-1 text-xl">
        <AiOutlineLike /> {likeCount}
      </button>
        }
         <CommentsModal comments={comments}/>
        <button className="flex items-center gap-1 text-xl">
          Share <IoIosShareAlt />
        </button>
      </div>
    </div>
  );
};

export default Feed;
