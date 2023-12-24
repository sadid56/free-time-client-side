import useAuth from "../../hooks/useAuth";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";
import coverImg from "../../assets/images/cover.jpeg";
import { FaLink, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosSchool, IoMdHome } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { GiSelfLove } from "react-icons/gi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const tabsList = ["Your Feeds", "Your Reels", "Your Videos"]
  const [currentTab, setCurrentTab] = useState("Your Feeds")
  return (
    <section className="max-w-5xl mx-auto">
      <SectionHelmet title={`${user?.displayName} - Profile`} />
      <div className="relative">
        <div className=" h-[400px]">
          <img
            className="w-full object-cover h-[400px] rounded-md"
            src={coverImg}
            alt=""
          />
        </div>
        <div className="avatar absolute -bottom-4 left-10">
          <div className="w-36 rounded-full ring ring-pink-500 ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
        <div className="flex justify-between items-end px-5 ml-[200px] mt-5">
          <div>
            <h2 className="text-4xl  font-bold">{user?.displayName}</h2>
            <p className="text-gray-500 font-medium">{user?.email}</p>
          </div>
          <div>
            <button className="text-xl flex items-center gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300">
            <FaUserEdit /> Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-3 mt-10">
        {/* bio */}
        <div className="space-y-3">
        <textarea className="textarea textarea-secondary w-full h-[100px] overflow-y-scroll"  placeholder="Bio"></textarea>
        <p className="text-gray-600 font-medium flex items-center gap-1"><MdOutlineEmail /> {user?.email}</p>
        <p className="text-gray-600 font-medium flex items-center gap-1"><IoIosSchool /> Work At - School</p>
        <p className="text-gray-600 font-medium flex items-center gap-1"><IoMdHome /> Home - Bogura</p>
        <p className="text-gray-600 font-medium flex items-center gap-1"><IoIosSchool /> School - Jamunna</p>
        <p className="text-gray-600 font-medium flex items-center gap-1"><GiSelfLove /> Relation - Single</p>
        <p className="text-gray-600 font-medium flex items-center gap-1"><CiCalendarDate /> Joined - 12-3-03-2023</p>
        <Link target="_blank" className="text-gray-600 font-medium flex items-center gap-1 link link-hover" ><FaLink /> Link</Link>
        </div>
        {/* content */}
        <div className="col-span-2">
        <Tabs>
            <TabList className="flex flex-wrap justify-center items-center gap-5 cursor-pointer text-xl font-medium ">
                {
                    tabsList.map(tab => <Tab onClick={()=> setCurrentTab(tab)} className={`bg-gray-300 rounded-md py-2 px-4 outline-none ${currentTab === tab ? "text-pink-500" : undefined}`} key={tab}>{tab}</Tab>)
                }
            </TabList>
            <TabPanel>
                <p>no feed available</p>
            </TabPanel>
            <TabPanel>
                <p>no reels available</p>
            </TabPanel>
            <TabPanel>
                <p>no video available</p>
            </TabPanel>
        </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Profile;
