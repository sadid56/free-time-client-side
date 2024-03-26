import "./navber.css";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaBookmark, FaHome, FaUserCircle } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import logo from "../../assets/icon/logo.png";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { MdMessage, MdNotifications } from "react-icons/md";

const Navber = () => {
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
    <nav className="bg-white fixed top-0 w-full shadow-lg py-1 px-4 z-50">
      <div
      id="toNap"
      className="flex justify-between   items-center  max-w-7xl mx-auto">
      <img src={logo} className="w-10 md:w-16" alt="" />
      <ul className={`flex items-center gap-8 md:gap-28 `}>
        <li>
          <NavLink to="/" className="text-2xl">
            <FaHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/reels" className="text-2xl">
            <SiYoutubeshorts />
          </NavLink>
        </li>
        <li className="block md:hidden">
          <NavLink to="/chat" className="text-2xl">
            <MdMessage/>
          </NavLink>
        </li>
        <li className="block md:hidden">
          <NavLink to="/notification" className="text-2xl">
            <MdNotifications/>
          </NavLink>
        </li>

      </ul>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user && user?.photoURL} />
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3 border shadow-2xl ">
          <li>
            <Link
              to={"/profile"}
              className=" text-xl font-medium flex items-center">
             <FaUserCircle /> Profile
            </Link>
          </li>
          <li>
            <Link
              to={"/save-post"}
              className=" text-xl font-medium flex items-center">
             <FaBookmark /> Bookmark
            </Link>
          </li>
          <li>
          <Link
              to={"/setting"}
              className=" text-xl font-medium">
              <IoMdSettings /> Setting
            </Link>
          </li>
          <button className="btn border shadow-md text-xl" onClick={handleLogOut}>
            <TbLogout2/> Log Out
          </button>
        </ul>
      </div>
    </div>
    </nav>
  );
};

export default Navber;
