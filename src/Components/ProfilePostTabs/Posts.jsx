/* eslint-disable react/prop-types */
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdClose, MdDelete } from "react-icons/md";
import UpdatePostModal from "./UpdatePostModal";
import Swal from "sweetalert2";
import PostCommentModal from "../../shared/VideoCommentModal/VideoCommentsModal";

const Posts = ({ post, refetch }) => {
  const { name, article, time, likes, comments, _id, auther_image, image, feelings } =
    post;
  const [likeCount, setLikeCount] = useState(likes);
  const axiosPublic = useAxiosPublic();
  const [liked, setLiked] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure delete this post ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/feeds/${_id}`);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted !",
            icon: "success",
          });
          refetch()
        }
      }
    });
  };
  return (
    <div className="p-2 border rounded-md">
      <div className="flex justify-between items-center gap-2 relative">
      <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={auther_image} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium flex items-center gap-3">
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
              ? "absolute right-4 top-9 bg-slate-700 p-5 rounded-md shadow-md"
              : "hidden"
          } flex flex-col gap-2 `}>
          <button
            onClick={handleDelete}
            className="text-xl text-white bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600 transform-all duration-300">
            <MdDelete />
          </button>
          <UpdatePostModal
            post={post}
            setIsToggle={setIsToggle}
            refetch={refetch}
          />
        </div>
      </div>
      <h5 className="font-medium my-5">{article}</h5>

      <div>
        {image ? (
          <img
            src={image}
            className="object-cover h-[450px] w-full rounded-md"
            alt=""
          />
        ) : (
          ""
        )}
      </div>

      {/* react  */}
      <div className="flex justify-between px-10 my-2 border-2 p-2 rounded-md">
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
        <PostCommentModal comments={comments} id={_id} refetch={refetch} />
        {/* <FeedsShareModal/> */}
        <button
          onClick={shareHandler}
          className="flex items-center gap-1 text-xl text-gray-500">
          <IoIosShareAlt /> Share
        </button>
      </div>
    </div>
  );
};

export default Posts;
