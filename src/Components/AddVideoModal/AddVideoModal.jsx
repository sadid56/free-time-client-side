/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { MdOutlineCloudUpload, MdOutlineVideoSettings } from "react-icons/md";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AddVideoModal = ({ refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      const fileImage = data?.video[0];
      const formData = new FormData();
      formData.append("file", fileImage);
      formData.append("upload_preset", "video_presed");
      const { data: imageData } = await axios.post(
        "https://api.cloudinary.com/v1_1/dvphwrb7p/video/upload",
        formData
      );
      // console.log(imageData);
      //   console.log(res.data);

      const postInfo = {
        name: user?.displayName,
        auther_image: user?.photoURL,
        email: user?.email,
        title: data?.title,
        video: imageData?.secure_url,
        time: new Date(),
        likes: 0,
        comments: [],
      };

      const response = await axiosSecure.post("/videos", postInfo);
      if (response?.data?.acknowledged) {
        const notificationsInfo = {
          name: user?.displayName,
          email: user?.email,
          date: new Date(),
          post_type: "video",
        };
        const res = await axiosSecure.post(
          "/notification",
          notificationsInfo
        );
        if(res?.data?.acknowledged){
          toast.success("Video Upload successfull !");
          reset();
          const modal = document.getElementById("video_modal_id");
          modal.close();
          refetch();
          setLoading(false);
        }
       
      }
    } catch (err) {
      console.log("video err-->", err.message);
    }
  };
  return (
    <div>
      <button
        className="flex items-center gap-1 py-2 px-4 text-sm  md:text-xl  border-2 border-gray-200 rounded-md text-gray-500 "
        onClick={() => document.getElementById("video_modal_id").showModal()}>
        <MdOutlineVideoSettings />
        Add Video
      </button>
      <dialog id="video_modal_id" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Video title</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Video title"
                  required
                  {...register("title")}
                  className="textarea  border border-[#0F2167] focus:border-[#0F2167] w-full"
                />
              </div>
              <div className="flex items-center justify-center w-full mt-5">
                <label
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      Video
                    </p>
                    {/* <p className="font-medium text-gray-500">
                      {selectedFileName}
                    </p> */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      videos
                    </p>
                  </div>
                  <input
                    accept="video/*"
                    id="dropzone-file"
                    type="file"
                    name="video"
                    className="hidden"
                    {...register("video")}
                  />
                </label>
              </div>
              {loading ? (
                <button className="text-xl btn btn-disabled flex items-center justify-center w-full gap-2 text-black bg-[#0F2167] py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">
                  Pending
                  {loading && (
                    <span className="loading loading-dots loading-md"></span>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-xl flex items-center justify-center w-full gap-2 text-white bg-[#0F2167] py-2 px-4 rounded-md hover:bg-[#0f1634] transform-all duration-300 mt-5">
                  Post Now
                </button>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddVideoModal;
