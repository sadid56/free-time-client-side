/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { MdArticle, MdOutlineCloudUpload } from "react-icons/md";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AddPostModal = ({ refetch }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState();
  // console.log(selectedFileName);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      if (selectedFileName) {
        const formData = new FormData();
        formData.append("image", selectedFileName);
        const { data: imageData } = await axios.post(
          "https://api.imgbb.com/1/upload?key=ee9960786c60a08168b8606c5d54ae38",
          formData
        );
        const postInfo = {
          name: user?.displayName,
          auther_image: user?.photoURL,
          email: user?.email,
          article: data?.article,
          image: imageData?.data?.display_url,
          time: new Date(),
          likes: 0,
          comments: [],
          feelings: data?.feelings,
        };
        const response = await axiosSecure.post("/feeds", postInfo);
        if (response?.data?.acknowledged) {
          const notificationsInfo = {
            name: user?.displayName,
            email: user?.email,
            date: new Date(),
            post_type: "photo",
          };
          const res = await axiosSecure.post(
            "/notification",
            notificationsInfo
          );
          // console.log(res.data);
          if (res?.data?.acknowledged) {
            toast.success("Your post successfull !");
            reset();
            const modal = document.getElementById("post_modal_id");
            modal.close();
            refetch();
            setSelectedFileName(null);
            setLoading(false);
          }
        }
      } else if (data?.article) {
        const postInfo = {
          name: user?.displayName,
          auther_image: user?.photoURL,
          email: user?.email,
          article: data?.article,
          image: "",
          time: new Date(),
          likes: 0,
          comments: [],
          feelings: data?.feelings,
        };
        const response = await axiosSecure.post("/feeds", postInfo);
        if (response?.data?.acknowledged) {
          const notificationsInfo = {
            name: user?.displayName,
            email: user?.email,
            date: new Date(),
            post_type: "article",
          };
          const res = await axiosSecure.post(
            "/notification",
            notificationsInfo
          );
          // console.log(res.data);
          if (res?.data?.acknowledged) {
            toast.success("Your post successfull !");
            reset();
            const modal = document.getElementById("post_modal_id");
            modal.close();
            refetch();
            setSelectedFileName(null);
            setLoading(false);
          }
        }
      } else {
        toast.error("error");
        setLoading(false);
      }

      //   console.log(res.data);
    } catch (err) {
      console.log("post err-->", err);
    }
  };

  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     setSelectedFileName(selectedFile.name);
  //   }
  // };

  const selectFeelings = watch("feelings");
  return (
    <div>
      <button
        className="flex  items-center gap-1 py-2 px-8 text-sm  md:text-xl  border-2 border-gray-200 rounded-md text-gray-500"
        onClick={() => document.getElementById("post_modal_id").showModal()}>
        <MdArticle />
        Post
      </button>
      <dialog id="post_modal_id" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <div className="divider">Create Post</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Article</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Share your article..."
                  {...register("article")}
                  className="textarea border border-[#0F2167] focus:border-[#0F2167] w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-500">Feelings</span>
                </label>
                <select
                  {...register("feelings")}
                  value={selectFeelings}
                  onChange={(e) => setValue("feelings", e.target.value)}
                  className="select select-bordered w-full">
                  <option value="">None</option>
                  <option value="Happy 😊">Happy 😊</option>
                  <option value="Loved 😘">Loved 😘</option>
                  <option value="Thankful 😊">Thankful 😊</option>
                  <option value="Normal 🙂">Normal 🙂</option>
                  <option value="Proud 🥰">Proud 🥰</option>
                  <option value="Angry 😡">Angry 😡</option>
                  <option value="Sleep 😴">Sleep 😴</option>
                  <option value="Hungry 😩">Hungry 😩</option>
                  <option value="Sorry 🙃">Sorry 🙃</option>
                  <option value="Missing 😭">Missing 😭</option>
                  <option value="Crazy 😁">Crazy 😁</option>
                  <option value="Sick 😣">Sick 😣</option>
                  <option value="Sad 🥲">Sad 🥲</option>
                </select>
              </div>
              <div className="flex items-center justify-center w-full mt-5">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100  ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="text-4xl text-gray-500" />
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>{" "}
                      Photo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                    {selectedFileName ? (
                      <div className="font-medium text-gray-400 text-center">
                        {selectedFileName?.name} <br /> {selectedFileName?.type}{" "}
                        / {(selectedFileName?.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <input
                   
                    id="dropzone-file"
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={(e) => setSelectedFileName(e.target.files[0])}
                  />
                </label>
              </div>

              {loading ? (
                <button className="text-xl btn btn-disabled flex items-center justify-center w-full gap-2 text-black bg-[#0F2167] py-2 px-4 rounded-md mt-5">
                  Post Now
                  {loading && (
                    <span className="loading loading-spinner text-black"></span>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-xl flex items-center justify-center w-full gap-2 text-white bg-[#0F2167] py-2 px-4 rounded-md hover:bg-[#131a39] transform-all duration-300 mt-5">
                  Post Now
                  {loading && (
                    <span className="loading loading-spinner text-white"></span>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddPostModal;
