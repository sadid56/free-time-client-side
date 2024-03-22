/* eslint-disable react/prop-types */
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosShareAlt } from "react-icons/io";
import { MdBookmarkAdd, MdClose } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import PostCommentModal from "../VideoCommentModal/VideoCommentsModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

const Feed = ({ feed, refetch}) => {
  const {
    name,
    article,
    time,
    likes,
    comments,
    _id,
    auther_image,
    image,
    video,
    feelings
  } = feed;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isToggle, setIsToggle] = useState(false);
  const [ref, inView] = useInView();
  const {user} = useAuth()
  const { data: savePosts = []} = useQuery({
    queryKey: ["savePosts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/post-save?email=${user?.email}`);
      return res.data;
    },
  });

  const handleLike = async () => {
    try {
      await axiosPublic.post(`/feeds/likes/${_id}`);
      setLiked(true);
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      // console.log(res.data);
    } catch (err) {
      console.log("post error-->", err);
    }
  };
  const shareHandler = async () => {
    const feedUrl = `${window.location.origin}/feeds/${_id}`;
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
  const isExist = savePosts?.find(post=> post?.PrevId === _id)
 const handleAddSave = async()=>{
   if(isExist){
    toast.error("Already saved this post !")
   }else{
    try{
      const postInfo = {
        name: name,
        article: article,
        time: time,
        email: user?.email,
        auther_image:auther_image,
        image: image,
        feelings: feelings,
        PrevId: _id
      }
      const res = await axiosSecure.post("/post-save", postInfo)
      if(res.data?.acknowledged){
        toast.success("Post added Success !")
      }
     }catch(err){
      toast.error(err?.message)
     }
   }
 }

  return (
    <div ref={ref} className="p-2 border rounded-md bg-white shadow">
      <div className="flex justify-between items-center gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className=" font-medium flex items-center gap-3">
              {name}{" "}
              <span className="text-[16px] font-normal text-gray-400">
                {feelings ? (
                  <p>
                    Feelings with{" "}
                    <span className="font-medium text-gray-950">
                      {feelings}
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </span>
            </h3>
            <p className="text-sm text-gray-500">{time?.slice(0, 10)}</p>
          </div>
        </div>
        <button onClick={() => setIsToggle(!isToggle)} className={`text-2xl `}>
          {isToggle ? <MdClose /> : <HiDotsVertical />}
        </button>
        <div
          className={`${
            isToggle
              ? "absolute right-4 top-9 bg-white p-5 rounded-md shadow-md"
              : "hidden"
          } flex flex-col gap-2 `}>
          <button
            onClick={shareHandler}
            className="flex items-center gap-1 text-xl text-white hover:bg-slate-600 bg-slate-400 px-4 py-2 rounded-md transform-all duration-300">
            <IoIosShareAlt /> Share
          </button>
          <button onClick={handleAddSave} className="flex items-center gap-1 text-xl text-white hover:bg-slate-600 bg-slate-400 px-4 py-2 rounded-md transform-all duration-300"><MdBookmarkAdd/> Save</button>
        </div>
      </div>
      <h5 className="font-medium my-5">{article}</h5>

      <div className={`${image || video ? "block" : "hidden"}`}>
        {image ? (
          <img
            src={image}
            className="object-cover  w-full rounded-md"
            alt=""
          />
        ) : (
          <div className="h-[350px] w-full bg-black">
            <ReactPlayer
        style={{
          borderRadius: '20px' 
        }}
        progressInterval={1000}
          controls
          playing={inView}
          volume={0.5}
          url={video}
          width="100%"
          height="100%"
        />
          </div>
        )}
      </div>
 

      {/* react  */}
      <div className="flex justify-between mt-5 px-5 md:px-16 border-2 p-2 rounded-md">
        {liked ? (
          <button className="flex items-center text-pink-500 gap-1 text-xl">
            <BiSolidLike /> {likeCount}
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-xl text-gray-500">
            <AiOutlineLike /> {likeCount}
          </button>
        )}
        <PostCommentModal comments={comments} refetch={refetch} id={_id} />
      </div>
    </div>
  );
};

export default Feed;
