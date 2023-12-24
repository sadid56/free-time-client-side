/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const EditProfileModal = ({ refetch, profile }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
//   console.log(profile);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      // console.log(imageData)
      const profileInfo = {
        bio: data?.bio,
        work: data?.work,
        home: data?.home,
        institute: data?.institute,
        relation: data?.relation,
        date_of_birth: data?.birthDay,
        social: data?.social,
        email: user?.email,
      };

      const res = await axiosPublic.patch(
        `/profiles/${profile?._id}`,
        profileInfo
      );
    //   console.log(res.data);
      if (res.data?.acknowledged) {
        toast.success("Profile Update Successfully !");
        reset();
        const modal = document.getElementById("Edit_profile_modal_id");
        modal.close();
        refetch();
      }
    } catch (err) {
      console.log("profile create err--->", err);
    }
  };

  const relationStatus = watch("relation");

  return (
    <div>
      <button
        className="text-xl flex items-center gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300"
        onClick={() =>
          document.getElementById("Edit_profile_modal_id").showModal()
        }>
        <FaUserEdit /> Edit Profile
      </button>

      <dialog id="Edit_profile_modal_id" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="grid grid-cols-2 gap-5">
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cover Photo</span>
                  </label>
                  <input
                    type="file"
                    required
                    {...register("file")}
                    placeholder="Type here"
                    className="file-input file-input-bordered file-input-secondary w-full"
                  />
                </div> */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <input
                    type="text"
                    {...register("bio")}
                    defaultValue={profile?.bio}
                    placeholder="Bio length 30"
                    className="input input-bordered input-secondary w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Work</span>
                  </label>
                  <input
                    type="text"
                    {...register("work")}
                    defaultValue={profile?.work}
                    placeholder="Your Work name"
                    className="input input-bordered input-secondary w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Home</span>
                  </label>
                  <input
                    type="text"
                    {...register("home")}
                    defaultValue={profile?.home}
                    placeholder="Your Home"
                    className="input input-bordered input-secondary w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Institute</span>
                  </label>
                  <input
                    type="text"
                    {...register("institute")}
                    defaultValue={profile?.institute}
                    placeholder="Your Institute"
                    className="input input-bordered input-secondary w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Relation Status</span>
                  </label>
                  <select
                    {...register("relation")}
                    onChange={(e) => setValue("relation", e.target.value)}
                    value={relationStatus}
                    defaultValue={profile?.relation}
                    className="select select-bordered"
                    name=""
                    id="">
                    <option value="Single">Single</option>
                    <option value="Merit">Merit</option>
                    <option value="In a Relationship">In a Relationship</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date Of Birth</span>
                  </label>
                  <input
                    type="date"
                    {...register("birthDay")}
                    defaultValue={profile?.date_of_birth}
                    className="input input-bordered input-secondary w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Social Link</span>
                  </label>
                  <input
                    type="text"
                    {...register("social")}
                    defaultValue={profile?.social}
                    placeholder="Any Social Link"
                    className="input input-bordered input-secondary w-full"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-xl w-full gap-2 text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-700 transform-all duration-300 mt-5">
                Submit
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfileModal;
