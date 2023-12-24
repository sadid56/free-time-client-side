/* eslint-disable react/prop-types */
import { MdInsertComment } from "react-icons/md";

const CommentsModal = ({ comments }) => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className=" font-medium flex items-center gap-1"
        onClick={() => document.getElementById("commentModal").showModal()}>
        <MdInsertComment /> Comment {comments.length}
      </button>
      <dialog id="commentModal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl relative">
        <div className="modal-action ">
        <form method="dialog" className="absolute right-0 top-0">
            <button className="btn">X</button>
          </form>
        </div>
        
        <div>
            {
                comments.map(comment => <div key={comment.id}><p>{comment?.user}</p></div>)
            }
        </div>
          
          
        </div>
      </dialog>
    </div>
  );
};

export default CommentsModal;
