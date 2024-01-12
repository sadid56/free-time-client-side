import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sideber from "../pages/Home/Sideber/Sideber";
// import AddverticeContent from "../shared/addverticContent/AddverticeContent";

const Main = () => {
    return ( 
        <div>
            <Navber/>
            <div className="flex bg-[#f0f2f5]">
        <div className="md:w-[30%]  border-r-2 min-h-screen fixed overflow-y-scroll hidden md:block">
          {/* sideber */}
          <Sideber />
        </div>
        <div className="md:w-[70%] md:ml-[30%]">
          {/* main content */}
          <Outlet />
        </div>
         {/* addcontent */}
        {/* <div className="md:w-[30%] sticky top-0  px-10 mt-5 hidden md:block">
          <AddverticeContent/>
        </div> */}
      </div>
        </div>
     );
}
 
export default Main;