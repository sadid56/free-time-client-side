import useAuth from "../../hooks/useAuth";
import SectionHelmet from "../../shared/SectionHelmet/SectionHelmet";
import coverImg from "../../assets/images/cover.jpeg";
import {FaLink} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosSchool, IoMdHome } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { GiSelfLove } from "react-icons/gi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import Navber from "../../shared/Navber/Navber";
import CreateProfileModal from "../../Components/CreateProfileModal/CreateProfileModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EditProfileModal from "../../Components/EditProfileModal/EditProfileModal";
import CoverPhotoEditModal from "../../Components/CoverPhotoEditModal/CoverPhotoEditModal";
import ProfilePicUpdateModal from "../../Components/ProfilePicUpdateModal/ProfilePicUpdateModal";

const Profile = () => {
  const { user } = useAuth();
  const tabsList = ["Your Feeds", "Your Reels", "Your Videos"];
  const axiosPublic = useAxiosPublic();
  const [currentTab, setCurrentTab] = useState("Your Feeds");
  const { data: profiles = [], refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/profiles?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log(profiles.cover);
  return (
    <section className="">
      <SectionHelmet title={`${user?.displayName} - Profile`} />
      <Navber />
      <div className="max-w-5xl mx-auto">
        <div className="relative">
            {profiles?.map((profile) => (
              <div key={profile?._id} className="h-[400px] relative">
                <img
                
                className="w-full object-cover h-[400px] rounded-md"
                src={profile?.cover ? profile?.cover : coverImg}
                alt=""
              />
              <CoverPhotoEditModal profile={profile} refetch={refetch}/>
              </div>
              
            ))}
          <div className="avatar absolute -bottom-4 left-10">
            <div className="w-36 rounded-full ring ring-pink-500 ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
            <ProfilePicUpdateModal refetch={refetch}/>
          </div>
          <div className="flex justify-between items-end px-5 ml-[200px] mt-5">
            <div>
              <h2 className="text-4xl  font-bold">{user?.displayName}</h2>
              <p className="text-gray-500 font-medium">{user?.email}</p>
            </div>
            <div className="flex items-center gap-5">
              <CreateProfileModal refetch={refetch} profiles={profiles} />
             {
             profiles.map(profile =>  <EditProfileModal key={profile?._id} refetch={refetch} profile={profile}/>)
             }
            </div>
          </div>
        </div>
        <div className="grid gap-5 grid-cols-3 mt-10">
          {profiles.length === 0 ? (
            <p className="text-xl text-center text-red-600 font-medium mt-10">
              Please Create a profile !
            </p>
          ) : (
            profiles?.map((profile) => (
              <div key={profile?._id} className="space-y-3">
                <h1 className="text-xl font-semibold text-slate-950">Intro</h1>
                <p className="h-[100px] flex items-center justify-center border shadow rounded-md bg-gray-200 text-slate-900 font-medium overflow-y-scroll w-full">
                  {profile?.bio}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <MdOutlineEmail /> {user?.email}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <IoIosSchool /> Work At -{" "}
                  {profile?.work}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <IoMdHome /> Home - {profile?.home}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <IoIosSchool />
                  Institute - {profile?.institute}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <GiSelfLove /> Relation - {profile?.relation}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <GiSelfLove /> Date Of Birth - {profile?.date_of_birth}
                </p>
                <p className="text-gray-600 font-medium flex items-center gap-1">
                  <CiCalendarDate /> Joined - 12-3-03-2023
                </p>
                <Link
                  target="_blank"
                  to={`${profile?.social || ""}`}
                  className="text-gray-600 font-medium flex items-center gap-1 link link-hover">
                  <FaLink /> {profile?.social || "?"}
                </Link>
              </div>
            ))
          )}
          {/* content */}
          <div className="col-span-2">
            <Tabs>
              <TabList className="flex flex-wrap justify-center items-center gap-5 cursor-pointer text-xl font-medium ">
                {tabsList.map((tab) => (
                  <Tab
                    onClick={() => setCurrentTab(tab)}
                    className={`bg-gray-300 rounded-md py-2 px-4 outline-none ${
                      currentTab === tab ? "text-pink-500" : undefined
                    }`}
                    key={tab}>
                    {tab}
                  </Tab>
                ))}
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
      </div>
    </section>
  );
};

export default Profile;
