/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useChats from "../../hooks/useChats";
import Conversation from "./Conversation";
import Message from "./Message";
import useGetAllUser from "../../hooks/useGetAllUser";
import useAxiosMessanger from "../../hooks/useAxiosMessenger";
let socket;
const Messangers = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const axiosMessanger = useAxiosMessanger()
  const [chats, chatsRefetch] = useChats();
  const [sinleUser] = useGetSIngleUser();
  const [anotherUser, setAnotherUser] = useState(null);
  const [users] = useGetAllUser();
  // connect socket server
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket?.emit("setup", sinleUser);
    socket?.on("connect", () => {
      if (sinleUser) {
        socket?.emit("addUsers", sinleUser._id);
      }
    });
    socket?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket?.on("connect_error", (error) => {
      console.error("Socket server connection error-->", error);
      // toast.error("Failed to connect to real-time server. Please try again later.");
    });

    return () => {
      // Clean up socket connection
      socket?.disconnect();
    };
  }, [sinleUser]);
  // get message from socket
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      if (currentChat) {
        setMessages([...messages, data]);
      }
    });
  }, [messages, currentChat]);

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  // send message
  const handleSend = async () => {
    const message = {
      senderId: sinleUser?._id,
      text: newMessage,
      chatId: currentChat?._id,
    };
    console.log(message);
    if (newMessage && currentChat) {
      // send message socket
      const receiverId = currentChat?.members.find(
        (id) => id !== sinleUser?._id
      );
      socket?.emit("sendMessage", {
        senderId: sinleUser?._id,
        receiverId,
        text: newMessage,
      });

      try {
        //send message database
        const { data } = await axiosMessanger.post("message", message);
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message. Please try again later.");
      }
    } else {
      toast.error("Can't send empty message!");
    }
  };
  // get message in database
  const { refetch } = useQuery({
    queryKey: ["messageData", currentChat?._id],
    queryFn: async () => {
      if (currentChat) {
        const response = await axiosMessanger.get(`message/${currentChat?._id}`);
        setMessages(response.data);
        return response.data;
      }
      return [];
    },
  });
  // console.log(messages);
  // Handle received message
  useEffect(() => {
    refetch();
  }, [currentChat, refetch]);

  // find another user
  useEffect(() => {
    const receiverId = currentChat?.members.find((id) => id !== sinleUser?._id);
    const anotherUser = users.find((user) => user?._id === receiverId);
    setAnotherUser(anotherUser);
  }, [currentChat?.members, sinleUser?._id, users]);

  // Online status check
  const isOnline = (chat) => {
    const chatMember = chat.members.find((member) => member !== sinleUser._id);
    return onlineUsers.some((user) => user.userId === chatMember);
  };
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <section>
      {/* conversation */}
      <div className="h-24 overflow-hidden flex gap-3 ">
        {chats?.map((chat) => (
          <div key={chat?._id}>
            <Conversation
              data={chat}
              refetch={chatsRefetch}
              setCurrentChat={setCurrentChat}
              currentUser={sinleUser?._id}
              online={isOnline(chat)}
            />
          </div>
        ))}
      </div>
      <hr />
      {/* chatbox */}
      <div className=" mt-4">
        {/* messages */}
        <div
         
          className="p-4 bg-gray-200 rounded-md h-[350px] overflow-y-auto">
          {messages?.map((message, i) => (
            <Message key={i} message={message} anotherUser={anotherUser} />
          ))}
        </div>

        <hr className="my-3" />
        {/* send box */}
       
        {
          currentChat ? <div class=" flex">
          <input
            id="user-input"
            type="text"
            placeholder="Type a message"
            class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={newMessage}
          />
          <button onClick={handleSend}
            id="send-button"
            class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
            Send
          </button>
        </div> : <p>Select</p>
        }
      </div>
    </section>
  );
};

export default Messangers;
