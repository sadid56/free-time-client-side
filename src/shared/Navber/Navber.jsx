import { useState } from "react";
import './navber.css'
import { Link, NavLink } from "react-router-dom";
import { FiAlignJustify, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdNotifications, MdPersonalVideo } from "react-icons/md";
import logo  from '../../assets/icon/logo.png'

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  // console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Success !");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <nav id="toNap" className="flex justify-between sticky top-0 z-10 py-2 px-4 bg-white items-center px-0  shadow-lg">
       <img src={logo} className="w-16" alt="" />
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden pl-5">
        {!isOpen ? (
          <FiAlignJustify className="text-2xl" />
        ) : (
          <FiX className="text-2xl" />
        )}
      </button>
      <ul
        className={`flex items-center gap-10 bg-gray-600 text-white p-10 md:p-0 md:text-black md:bg-transparent ${
          isOpen
            ? "flex-col  md:flex-row absolute md:relative top-20 md:top-0"
            : "hidden md:flex"
        }`}>
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
        <li>
          <NavLink to="/videos" className="text-2xl">
          <MdPersonalVideo />
          </NavLink>
        </li>
        <li>
          <NavLink className="text-2xl">
          <MdNotifications />
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
          className="mt-3 z-[1] p-2 menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-3 border shadow-md">
          <li>
            <Link to={"/profile"} className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <button className="btn" onClick={handleLogOut}>
            Log Out
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navber;
