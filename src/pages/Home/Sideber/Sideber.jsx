import { Link, NavLink } from "react-router-dom";
import {  MdBookmarkAdded } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { FaRegNewspaper, FaUserFriends } from "react-icons/fa";
import "./sidebar.css";
import useAuth from "../../../hooks/useAuth";
import { TbLogout2 } from "react-icons/tb";
import toast from "react-hot-toast";
import { IoMdSettings } from "react-icons/io";

const data = [
  {
    id:1,
    path:"/",
    icon:<FaRegNewspaper />,
    name:"Feeds"
  },
  {
    id:2,
    path:"/friends",
    icon:<FaUserFriends/>,
    name:"Friends"
  },
  {
    id:3,
    path:"/reels",
    icon:<SiYoutubeshorts/>,
    name:"Reels"
  },
  {
    id:4,
    path:"/save-post",
    icon:<MdBookmarkAdded/>,
    name:"Bookmark"
  },
]
// style={{boxShadow:"0px 0px 20px gray"}}
const Sideber = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Success !");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div  className="bg-white flex flex-col p-5 justify-between  z-30 rounded-md my-2 h-[97vh] ml-3 py-5">
    <div className="">
    <div className="hover:bg-gray-200 p-2 rounded-md">
          <Link to="/profile" >
          <div className="flex items-center gap-2">
            <div className="avatar online">
              <div className="w-10 ring-2 ring-blue-600 rounded-full">
                <img src={user && user?.photoURL} />
              </div>
            </div>
            <h2 className="text-xl font-semibold">{user && user?.displayName}</h2>
          </div>
          </Link>

      </div>
      <ul id="sid" className="flex flex-col gap-3  text-xl mt-5">
        {
          data.map(item => <li key={item.id}>
            <NavLink to={item.path} className="flex items-center gap-1 hover:bg-gray-200 rounded-md p-2">
              {item.icon} {item.name}
            </NavLink>
          </li>)
        }
      </ul>
    </div>
      <ul>
        <li><NavLink to="/setting" className="flex items-center gap-1 hover:bg-gray-200 rounded-md p-2 text-xl"><IoMdSettings /> Setting</NavLink></li>
        <li><button className="flex items-center gap-1 hover:bg-gray-200 rounded-md p-2 text-xl w-full" onClick={handleLogOut}>
            <TbLogout2/> Log Out
          </button></li>
      </ul>
    </div>
  );
};

export default Sideber;
