/* eslint-disable react/prop-types */
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import ReactPlayer from "react-player";
import ReelComment from "../../Components/ReelsCommant/ReelComme";

const Reel = ({ reel }) => {
  const { name, title, time, auther_image, reels } = reel;
  // console.log(reel);
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
        <div className="flex flex-col p-5 space-y-10 text-xl bg-gray-300 rounded-md w-fit absolute bottom-32 right-3">
            <button><FaRegHeart /></button>
            <button><ReelComment/></button>
            <button><IoIosShareAlt /></button>
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
