import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sideber from "../pages/Home/Sideber/Sideber";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
// import AddverticeContent from "../shared/addverticContent/AddverticeContent";

const Main = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <div>
      <div className="md:hidden flex justify-end sticky top-0">
        <button
          className="text-2xl mr-2 mt-1 transition-all duration-1000"
          onClick={() => setIsToggle(!isToggle)}>
          {isToggle ? <MdClose /> : <FiAlignJustify />}
        </button>
      </div>
      <Navber />
      <div className="md:flex bg-[#f0f2f5]">
        <div
          className={`w-[60%] md:w-[30%] z-50   border-r-2 min-h-screen fixed overflow-y-scroll transition-all duration-1000 ${
            isToggle ? "block " : "hidden md:block"
          }`}>
          {/* sideber */}
          <Sideber />
        </div>
        <div onClick={()=>setIsToggle(false)} className="md:w-[70%] md:ml-[30%]">
          {/* main content */}
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Main;
