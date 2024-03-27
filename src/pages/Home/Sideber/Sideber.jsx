import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import feedimg from "../../../assets/icon/feeds.png";
import reelsimg from "../../../assets/icon/reels.png";
import freindimg from "../../../assets/icon/freinds.png";
import notificationimg from "../../../assets/icon/notification.png";
import bookmarkimg from "../../../assets/icon/bookmark.png";
import setingimg from "../../../assets/icon/setting.png";
import logoutimg from "../../../assets/icon/logout.png";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
const data = [
  {
    id: 1,
    path: "/",
    icon: feedimg,
    name: "Feeds",
  },
  {
    id: 2,
    path: "/reels",
    icon: reelsimg,
    name: "Reels",
  },
  {
    id: 4,
    path: "/notification",
    icon: notificationimg,
    name: "Notification",
  },
  {
    id: 5,
    path: "/save-post",
    icon: bookmarkimg,
    name: "Bookmark",
  },
  {
    id: 3,
    path: "/add-conversation",
    icon: freindimg,
    name: "Add Conversation",
  },
];
// style={{boxShadow:"0px 0px 20px gray"}}
const Sideber = () => {
  const { user, logOut } = useAuth();
  const [progress, setProgress] = useState(0);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Success !");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // click to show top progress bar
  const handleClick = () => {
    setProgress(60);
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  };

  useEffect(() => {
    return () => setProgress(0);
  }, []);

  return (
    <div className="bg-white flex flex-col p-5 justify-between  z-30 rounded-md my-2 h-[97vh] ml-3 py-5">
      <LoadingBar
        color="#3974bb"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="">
        <h2 className="text-3xl font-bold pl-3 mb-5 italic">
          Free <span className="text-primary">Time</span>
        </h2>
        <div className="hover:bg-gray-200 p-2 rounded-md">
          <Link to="/profile">
            <div className="flex items-center gap-2">
              <div className="avatar online">
                <div className="w-10 ring-2 ring-blue-600 rounded-full">
                  <img src={user && user?.photoURL} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold">Profile</h2>
            </div>
          </Link>
        </div>
        <ul id="sid" className="flex flex-col gap-3  text-xl mt-2">
          {data.map((item) => (
            <li onClick={handleClick} key={item.id}>
              <NavLink
                to={item.path}
                className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-2">
                <img src={item?.icon} className="w-7" alt="" />{" "}
                <span className="font-medium text-gray-600">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <ul>
        <li onClick={handleClick}>
          <NavLink
            to="/setting"
            className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-2 text-xl">
            <img src={setingimg} className="w-7" alt="" /> Setting
          </NavLink>
        </li>
        <li>
          <button
            className="flex items-center gap-2 hover:bg-gray-200 rounded-md p-2 text-xl w-full"
            onClick={handleLogOut}>
            <img src={logoutimg} className="w-7" alt="" /> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sideber;
