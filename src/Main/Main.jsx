import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sideber from "../pages/Home/Sideber/Sideber";

const Main = () => {
    return ( 
        <div>
            <Navber/>
            <div className="flex">
        <div className="w-[30%] bg-[#f0f2f5] border-r-2 min-h-screen fixed overflow-y-scroll">
          {/* sideber */}
          <Sideber />
        </div>
        <div className="w-[40%] ml-[30%]">
          {/* main content */}
          <Outlet />
        </div>
      </div>
        </div>
     );
}
 
export default Main;