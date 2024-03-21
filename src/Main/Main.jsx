import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sideber from "../pages/Home/Sideber/Sideber";

const Main = () => {
  return (
      <div className="flex gap-5 w-full bg-gray-200">
        <div className="w-1/4">
          {/* Left Sidebar */}
          <div className="sticky top-0 h-screen overflow-y-auto">
            {/* Content of left sidebar */}
           <Sideber/>
          </div>
        </div>
        <div className="w-1/2">
          {/* Main Content */}
          <div className="overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <div className="w-1/4 mr-3">
          {/* Right Sidebar chat content */}
          <div className="sticky top-2 h-screen overflow-y-auto bg-white p-5 rounded-md">
            {/* Content of right sidebar */}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam, consectetur ratione enim praesentium magni dolores alias autem iure fugit, repellendus iusto odit tempore iste laborum nostrum quidem assumenda non, illo cum. Consequuntur, tenetur incidunt asperiores repellendus voluptatem ullam deserunt nemo quasi, magni perferendis debitis expedita. At quae consequatur vel recusandae a deleniti dignissimos, id repudiandae. Nobis quia iure cupiditate voluptas culpa aliquid at debitis nisi ea vitae officia saepe libero veniam error deleniti ducimus vero earum sint, aliquam quis illo! Voluptate esse dolores aut omnis eveniet harum consequuntur modi! Sequi quia earum voluptate deserunt ducimus, architecto natus! Cumque, dolor!</p>
          </div>
        </div>
    </div>
  );
};

export default Main;
