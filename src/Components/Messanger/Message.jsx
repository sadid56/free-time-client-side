/* eslint-disable react/prop-types */
// import { useEffect, useRef } from "react";
// import useAuth from "../../hooks/useAuth";
import useGetSIngleUser from "../../hooks/useGetSIngleUser";


// eslint-disable-next-line react/prop-types, no-unused-vars
const Message = ({message, anotherUser}) => {
    // const { user } = useAuth();
    const [sinleUser] = useGetSIngleUser();
  const { senderId, text } = message;
  console.log(senderId === sinleUser?._id);

   //auto scroll to bottom
   
    return (
        <div>
        {senderId === sinleUser?._id ? (
          // current user message
          <div className="w-full">
          <div className="mb-2 text-right">
            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
              {text}
            </p>
          </div>
        </div>
        ) : (
         
          // another user message
           <div  className="w-full">
           <div className="mb-2">
            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
              {text}
            </p>
          </div>
         </div>
        )}
      </div>
    );
};

export default Message;