

/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const UpdatePostModal = ({ setIsToggle, post, refetch }) => {
    const {article, _id} = post;
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const fileImage = data?.image[0];
      const formData = new FormData();
      formData.append("image", fileImage);
      const { data: imageData } = await axios.post(
        "https://api.imgbb.com/1/upload?key=ee9960786c60a08168b8606c5d54ae38",
        formData
      );
      setLoading(true);
      const postInfo = {
        article: data?.article || "",
        image: imageData?.data?.display_url || "",
        
      };

      const response = await axiosSecure.patch(`/feeds/${_id}`, postInfo);
    //   console.log(response.data);
      if (response?.data?.acknowledged) {
        toast.success("Your post successfull !");
        reset();
        const modal = document.getElementById("post_update_modal");
        modal.close();
        refetch()
        setIsToggle(false);
        setLoading(false);
      }
    } catch (err) {
      console.log("post err-->", err);
    }
  };
  return (
    <div>
      <button
        className="text-xl text-white bg-slate-500 px-4 py-2 rounded-md hover:bg-slate-600 transform-all duration-300"
        onClick={() => document.getElementById("post_update_modal").showModal()}>
        <MdUpdate/>
      </button>
      <dialog id="post_update_modal" className="modal">
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
                  <span className="label-text">Share Your Feeling...😊</span>
                </label>
                <textarea
                  type="text"
                  defaultValue={article}
                  {...register("article")}
                  className="textarea textarea-secondary w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Share your photo</span>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="file-input file-input-bordered file-input-secondary w-full h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="text-xl flex items-center justify-center w-full gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">
                Update Now
                {loading && (
                  <span className="loading loading-spinner text-white"></span>
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdatePostModal;
