import "./navber.css";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdDelete, MdNotifications, MdPersonalVideo } from "react-icons/md";
import logo from "../../assets/icon/logo.png";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Navber = () => {
  const { user, logOut } = useAuth();
  const [isToggle, setIsToggle] = useState(false);
  const axiosPublic = useAxiosPublic();
  // console.log(user);
  const { data: notifications = [], refetch } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axiosPublic.get("/notification");
      return res.data;
    },
  });

  const handleDelete = async(id)=>{
     try{
      const res =  await axiosPublic.delete(`/notification/${id}`)
      console.log(res.data);
      if(res.data?.acknowledged){
        toast.success("Deleted Success!")
        refetch()
      }
     } catch(err){
      console.log('notifications delete err-->', err);
    }
  }
 

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
    <nav
      id="toNap"
      className="flex justify-between sticky top-0 z-50 bg-white py-2 px-4  items-center   shadow-lg">
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
        <li>
          <NavLink to="/videos" className="text-2xl">
            <MdPersonalVideo />{" "}
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => setIsToggle(!isToggle)}
            className={`flex items-start text-2xl  rounded-md transition-all duration-300 ${
              isToggle ? "text-red-500" : " text-black"
            }`}>
            <MdNotifications />
            <div className="text-xl font-semibold text-blue-500">
              {notifications?.length}
            </div>
          </button>
        </li>
      </ul>
      <div
        className={`rounded-md bg-gray-100 border p-4 shadow-xl ${
          isToggle ? "absolute top-16 md:left-1/2" : "hidden"
        }`}>
        <div className="space-y-2">
          {
            notifications?.length === 0 ? <p className="text-red-500 text-xl text-center">No Notification</p> : notifications.map((notification, idx) => (
              <div key={notification?._id} className="flex items-center gap-3 p-2 rounded-md border bg-gray-50 font-medium">
                <p>{idx + 1}</p>
                <p>{notification?.name}</p>
                <p>posted a {notification?.post_type}</p> at
                <p>{notification?.date.slice(0, 10)}</p>
                <button onClick={()=>handleDelete(notification?._id)} className="btn
                btn-circle text-xl btn-sm"><MdDelete/></button>
              </div>
            ))
          }
        </div>
      </div>
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
            <Link
              to={"/profile"}
              className="justify-between text-xl font-medium">
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
