/* eslint-disable react/prop-types */
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import { FaRegHeart } from "react-icons/fa";
import ReelComment from "../ReelsCommant/ReelComme";
import { IoIosShareAlt } from "react-icons/io";
const ProfileReel = ({ reel, refetch }) => {
  const { name, title, time, likes, comments, _id, auther_image, reels } = reel;
  const axiosPublic = useAxiosPublic();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isToggle, setIsToggle] = useState(false);
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
  
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure delete this reels ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/reels/${_id}`);
        // console.log(res.data);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your reel has been deleted !",
            icon: "success",
          });
          refetch()
        }
      }
    });
  };

  return (
    <div className="p-3 border rounded-md">
      
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
          <button
            onClick={handleDelete}
            className="text-xl text-white bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600 transform-all duration-300">
            <MdDelete />
          </button>
          
         
        </div>
      </div>
      <h5 className="font-medium my-5">{title}</h5>

      <div className=" relative">
        <ReactPlayer
          controls
          // playing={true}
          volume={"#357"}
          url={reels}
          width="100%"
          height="100%"
        />
        <div className="flex flex-col py-5 px-3 space-y-10 text-xl bg-slate-200 rounded-full w-fit absolute bottom-32 right-0">
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

      {/* react  */}
      {/* <div className="flex justify-between mt-5 px-16 border-2 p-2 rounded-md">
        {liked ? (
          <button className="flex items-center text-pink-500 gap-1 text-xl">
            <BiSolidLike /> {likeCount}
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-xl">
            <AiOutlineLike /> {likeCount}
          </button>
        )}
        <CommentsModal comments={comments} id={_id} refetch={refetch} />
        <button
            onClick={shareHandler}
            className="text-xl flex   gap-1 items-center">
            <CiShare2 /> Share
          </button>
      </div> */}
    </div>
  );
};

export default ProfileReel;
