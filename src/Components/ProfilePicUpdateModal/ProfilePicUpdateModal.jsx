/* eslint-disable react/prop-types */
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoCameraOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const ProfilePicUpdateModal = ({ refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const { profileUpdate, user } = useAuth();
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const fileImage = data?.file[0];
      const formData = new FormData();
      formData.append("image", fileImage);
      const { data: imageData } = await axios.post(
        "https://api.imgbb.com/1/upload?key=ee9960786c60a08168b8606c5d54ae38",
        formData
      );
      // console.log(imageData)
      if (imageData?.success) {
        await profileUpdate(user?.displayName, imageData?.data?.display_url);

        toast.success("Profile Pic Update Success !");
        reset();
        const modal = document.getElementById("profile_pic_update");
        modal.close();
        refetch();
        setLoading(false)
      }
    } catch (err) {
      console.log("profile pic update err--->", err);
    }
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="absolute right-0 bottom-0 btn btn-circle text-xl"
        onClick={() =>
          document.getElementById("profile_pic_update").showModal()
        }>
        <IoCameraOutline />
      </button>
      <dialog id="profile_pic_update" className="modal">
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
                  <span className="label-text">Profile Pic Update</span>
                </label>
                <input
                  type="file"
                  {...register("file")}
                  required
                  className="file-input file-input-bordered file-input-secondary w-full h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="text-xl flex items-center justify-center w-full gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">
                Update Now {loading && <span className="loading loading-spinner text-white"></span>}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePicUpdateModal;
