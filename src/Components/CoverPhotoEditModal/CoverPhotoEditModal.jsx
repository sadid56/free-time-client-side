/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const CoverPhotoEditModal = ({profile, refetch}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
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
      const profileInfo = {
        cover: imageData?.data?.display_url,     
      };
      if (imageData?.success) {
        const res = await axiosPublic.patch(`/profile/cover/${profile?._id}`, profileInfo);
        console.log(res.data);
        if (res.data?.acknowledged) {
          toast.success("Cover Photo Update Successfully !");
          reset();
          const modal = document.getElementById("cover_photoUpdate");
          modal.close();
          refetch();
          setLoading(false)
        }
      }
    } catch (err) {
      console.log("profile create err--->", err);
    }
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="absolute right-5 bottom-5 btn btn-circle text-xl"
        onClick={() =>
          document.getElementById("cover_photoUpdate").showModal()
        }>
        <FaCamera />
      </button>
      <dialog id="cover_photoUpdate" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <div className="divider">Update Cover Photo</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <div className="flex items-center justify-center w-full mt-5">
                <label
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      Photo
                    </p>
                    {/* <p className="font-medium text-gray-500">
                      {selectedFileName}
                    </p> */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </div>
                  <input
                    accept="image/svg+xml,image/png,image/jpeg"
                    id="dropzone-file"
                    type="file"
                    name="image"
                    className="hidden"
                    {...register("file")}
                  />
                </label>
              </div>
              </div>
              <button type="submit" className="text-xl flex items-center  justify-center w-full gap-2 text-white bg-[#0F2167] py-2 px-4 rounded-md hover:bg-[#0b122b] transform-all duration-300 mt-5">Update Now {loading && <span className="loading loading-spinner text-white"></span>}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CoverPhotoEditModal;
