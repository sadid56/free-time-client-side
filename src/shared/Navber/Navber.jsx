import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiAlignJustify, FiX,  } from "react-icons/fi";

const Navber = () => {
    const [isOpen, setIsOpen] = useState(false)
    return ( 
        <div className="flex justify-between sticky top-0 z-10 bg-white items-center px-0 md:px-5 py-4 shadow-lg">
            <h3 className="text-3xl font-bold hidden md:block">Free Time</h3>
            <button onClick={()=> setIsOpen(!isOpen)} className="md:hidden pl-5">{!isOpen ? <FiAlignJustify className="text-2xl" /> : <FiX className="text-2xl"/>}</button>
            <ul className={`flex items-center gap-6 bg-gray-600 text-white p-10 md:p-0 md:text-black md:bg-transparent ${isOpen ? 'flex-col  md:flex-row absolute md:relative top-20 md:top-0' : 'hidden md:flex'}`}>
                <li><NavLink to='/'>Feed</NavLink></li>
                <li><NavLink>Shorts</NavLink></li>
                <li><NavLink>Videos</NavLink></li>
                <li><NavLink>Feed</NavLink></li>
            </ul>
            <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
        </div>
     );
}
 
export default Navber;