import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Posts from "./Posts";

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
        {profilePosts.map((posts) => (
          <Posts key={posts?._id} post={posts} refetch={refetch} />
        ))}
      </TabPanel>
      <TabPanel>
        <p>no reels available</p>
      </TabPanel>
      <TabPanel>
        <p>no video available</p>
      </TabPanel>
    </Tabs>
  );
};

export default ProfilePostTabs;
