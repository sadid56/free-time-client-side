import { Link, NavLink } from "react-router-dom";
import {  MdBookmarkAdded, MdOndemandVideo, MdPlaylistAdd } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import "./sidebar.css";
import useAuth from "../../../hooks/useAuth";


const Sideber = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#f0f2f5] z-50 min-h-screen">
      <ul id="sid" className="space-y-5 pl-5 text-xl pt-6">
        <li>
          <Link to="/profile">
          <div className="flex items-center gap-2">
            <div className="avatar online">
              <div className="w-10 ring-2 ring-blue-600 rounded-full">
                <img src={user && user?.photoURL} />
              </div>
            </div>
            <h2 className="text-xl font-semibold">{user && user?.displayName}</h2>
          </div>
          </Link>
        </li>
        <li>
          <NavLink to="/" className="flex items-center gap-1">
            <FaRegNewspaper /> Feeds
          </NavLink>
        </li>
        <li>
          <NavLink to="/reels" className="flex items-center gap-1">
            <SiYoutubeshorts /> Short
          </NavLink>
        </li>
        <li>
          <NavLink to="/videos" className="flex items-center gap-1">
            <MdOndemandVideo /> Videos
          </NavLink>
        </li>
        <li>
          <NavLink to="/save-post" className="flex items-center gap-1">
            <MdBookmarkAdded /> Save Post
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlist" className="flex items-center gap-1">
            <MdPlaylistAdd /> Playlist
          </NavLink>
        </li>
       
      </ul>
    </div>
  );
};

export default Sideber;
