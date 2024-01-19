/* eslint-disable react/prop-types */
// ReelComment.jsx
import { useState } from "react";
import ReactDOM from "react-dom";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaRegCommentDots } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ReelComment = ({ comments, id, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const commentInfo = {
      name: user?.displayName,
      auther_pic: user?.photoURL,
      comment: data?.comment,
      date: new Date(),
    };

    try {
      await axiosPublic.post(`/reels/comment/${id}`, commentInfo);
      reset();
      refetch();
    } catch (err) {
      console.log("comment post err-->", err);
    }
  };

  return (
    <div className="z-50">
      <button
        className="font-medium flex flex-col items-center"
        onClick={openModal}
      >
        <FaRegCommentDots /> {comments?.length}
      </button>
      {isModalOpen &&
        ReactDOM.createPortal(
          <dialog open={isModalOpen} className="modal ">
            <div className="modal-box w-11/12 max-w-xl relative border shadow-2xl">
              <div className="modal-action">
                <form method="dialog" className="absolute right-0 top-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                    className="btn btn-circle text-xl"
                  >
                    <MdClose/>
                  </button>
                </form>
              </div>
              <div className="space-y-3">
                {comments?.map((comment, index) => (
                  <div
                    className="space-y-3 border p-3 rounded-md"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={comment?.auther_pic} alt="Author Avatar" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {comment?.name}
                        </h3>
                        <p className="text-sm">
                          {comment?.date?.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    <p className="bg-[#f6f1f1] border text-slate-900 font-medium w-fit rounded-md py-3 px-5">
                      {comment?.comment}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative mt-16">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <textarea
                      required
                      {...register("comment")}
                      className="textarea textarea-bordered"
                      placeholder="Your Comments"
                    ></textarea>
                  </div>
                  <div className="absolute left-1 bottom-0">
                    <button type="submit" className="text-xl text-pink-500">
                      <IoMdSend />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </div>
  );
};

export default ReelComment;
