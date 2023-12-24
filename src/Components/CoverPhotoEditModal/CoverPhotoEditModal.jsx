/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";

const CoverPhotoEditModal = ({profile, refetch}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    try {
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Update Cover</span>
                </label>
                <input
                  type="file"
                  {...register("file")}
                  required
                  className="file-input file-input-bordered file-input-secondary w-full h-[100px]"
                />
              </div>
              <button type="submit" className="text-xl w-full gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">Update Now</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CoverPhotoEditModal;
