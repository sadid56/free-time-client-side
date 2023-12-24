/* eslint-disable react/prop-types */
import { MdInsertComment } from "react-icons/md";
import { useState } from "react"; // Import useState

const CommentsModal = ({ comments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="font-medium flex items-center gap-1"
        onClick={openModal}>
        <MdInsertComment /> Comment {comments.length}
      </button>
      {isModalOpen && (
        <dialog open={isModalOpen} className="modal">
          <div className="modal-box w-11/12 max-w-3xl relative">
            <div className="modal-action">
              <form method="dialog" className="absolute right-0 top-0">
                <button onClick={closeModal} className="btn">
                  X
                </button>
              </form>
            </div>
            <div>
              {comments.map((comment, index) => (
                <p key={index}>{comment?.comment}</p>
              ))}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CommentsModal;
