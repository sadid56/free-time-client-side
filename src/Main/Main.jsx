import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sideber from "../pages/Home/Sideber/Sideber";

const Main = () => {
  return (
      <div className=" bg-gray-200 w-full">
        {/* only mobile device navber */}
        <div className="block md:hidden fixed w-full z-50">
          <Navber/>
        </div>
       <div className="md:flex gap-6  max-w-[1380px] mx-auto">
       <div className="md:w-1/4">
          {/* Left Sidebar */}
          <div className="hidden md:block sticky top-0 h-screen overflow-y-auto">
            {/* Content of left sidebar */}
           <Sideber/>
          </div>
        </div>
        <div className="md:w-[44%] pt-14 md:pt-0">
          {/* Main Content */}
          <div className="overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <div className="md:w-[30%] hidden md:block mr-3">
          {/* Right Sidebar chat content */}
          <div className="sticky top-2 h-screen overflow-y-auto bg-white p-5 rounded-md">
            {/* Content of right sidebar */}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsam, consectetur ratione enim praesentium magni dolores alias autem iure fugit, repellendus iusto odit tempore iste laborum nostrum quidem assumenda non, illo cum. Consequuntur, tenetur incidunt asperiores repellendus voluptatem ullam deserunt nemo quasi, magni perferendis debitis expedita. At quae consequatur vel recusandae a deleniti dignissimos, id repudiandae. Nobis quia iure cupiditate voluptas culpa aliquid at debitis nisi ea vitae officia saepe libero veniam error deleniti ducimus vero earum sint, aliquam quis illo! Voluptate esse dolores aut omnis eveniet harum consequuntur modi! Sequi quia earum voluptate deserunt ducimus, architecto natus! Cumque, dolor! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aspernatur suscipit assumenda blanditiis possimus ex accusantium. Asperiores, suscipit. Quo, molestias labore! Reprehenderit quisquam consectetur aperiam. Doloremque maxime porro veritatis fugit harum! Minima, dolore ratione ipsa earum quas repellendus rerum sed nisi commodi et incidunt ut eius inventore explicabo ullam eum maxime magnam velit ea voluptates officiis! Incidunt voluptatibus aut dolore iste, repudiandae velit sed fugiat quo ipsa provident vitae dolor pariatur quibusdam nihil, qui quae sunt amet quidem corrupti atque quisquam laudantium! Pariatur, praesentium at? Dignissimos, beatae eum culpa cumque voluptatibus eveniet, voluptas aperiam, est atque harum ullam eaque. Quibusdam! </p>
          </div>
        </div>
       </div>
    </div>
  );
};

export default Main;
