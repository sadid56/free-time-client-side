/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { MdOutlineVideoSettings } from "react-icons/md";
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
      formData.append('upload_preset', 'video_presed');
      const { data: imageData } = await axios.post(
        'https://api.cloudinary.com/v1_1/dvphwrb7p/video/upload',
        formData
      );
        // console.log(imageData);
      //   console.log(res.data);

      const postInfo = {
        name: user?.displayName,
        auther_image: user?.photoURL,
        email: user?.email,
        caption: data?.caption,
        video: imageData?.secure_url,
        time: new Date(),
        likes: 0,
        comments: [],
      };

      const response = await axiosSecure.post("/videos", postInfo);
      if (response?.data?.acknowledged) {
        toast.success("Video Upload successfull !");
        reset();
        const modal = document.getElementById("video_modal_id");
        modal.close();
        refetch()
        setLoading(false);
      }
    } catch (err) {
      console.log("video err-->", err.message);
    }
  };
  return (
    <div>
      <button
        className="btn text-xl bg-gray-100 rounded-full "
        onClick={() => document.getElementById("video_modal_id").showModal()}>
        <MdOutlineVideoSettings />Add Video
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
                  <span className="label-text">Video Caption</span>
                </label>
                <textarea
                  type="text"
                  {...register("caption")}
                  className="textarea textarea-secondary w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Video</span>
                </label>
                <input
                  type="file"
                  accept="video/*"
                  required
                  {...register("video")}
                  className="file-input file-input-bordered file-input-secondary w-full h-[100px]"
                />
              </div>
              {loading ? (
                <button className="text-xl btn btn-disabled flex items-center justify-center w-full gap-2 text-black bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">
                  Post Now
                  {loading && (
                    <span className="loading loading-spinner text-black"></span>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-xl flex items-center justify-center w-full gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">
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
