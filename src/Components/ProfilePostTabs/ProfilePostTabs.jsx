/* eslint-disable react/no-unknown-property */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Posts from "./Posts";
import ProfileVideo from "./ProfileVideo";

const ProfilePostTabs = () => {
  const [currentTab, setCurrentTab] = useState("Your Feeds");
  const tabsList = ["Your Feeds", "Your Reels", "Your Videos"];
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const { data: profilePosts = [], refetch } = useQuery({
    queryKey: ["profilePost"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feeds?email=${user?.email}`);
      return res.data;
    },
  });
  const { data: profileVideos = [], refetch:videoReferch } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/videos?email=${user?.email}`);
      return res.data;
    },
  });

  return (
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
      <TabPanel className={"mx-20 mt-5"}>
      {
        profilePosts?.length === 0 ? <p className="text-red-600 text text-center mt-5">No Post Added !</p> : <>
        {profilePosts.map((post) => (
          <Posts key={post?._id} post={post} refetch={refetch} />
        ))}
        </>
      }
      </TabPanel>
      <TabPanel>
        <p>no reels available</p>
      </TabPanel>
      <TabPanel>
      {
        profileVideos?.length === 0 ? <p className="text-red-600 text text-center mt-5">No Video Added !</p> : <>
        {profileVideos.map((videos) => (
          <ProfileVideo key={videos?._id} videos={videos} refetch={videoReferch} />
        ))}
        </>
      }
      </TabPanel>
    </Tabs>
  );
};

export default ProfilePostTabs;
