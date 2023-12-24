import { NavLink } from "react-router-dom";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { MdOndemandVideo } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import "./sidebar.css";

const Sideber = () => {
  return (
    <div>
      <ul id="sid" className="space-y-5 pl-5 text-xl pt-6">
        <li>
          <NavLink to="/" className="flex items-center gap-1">
            <FaRegNewspaper /> Feeds
          </NavLink>
        </li>
        <li>
          <NavLink to="/shorts" className="flex items-center gap-1">
            <SiYoutubeshorts /> Short
          </NavLink>
        </li>
        <li>
          <NavLink to="/videos" className="flex items-center gap-1">
            <MdOndemandVideo /> Videos
          </NavLink>
        </li>
        <li>
          <NavLink to="/message" className="flex items-center gap-1">
            <HiMiniChatBubbleOvalLeft className="text-xl" /> Message
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sideber;
