import { MdClose } from "react-icons/md";
import useNotification from "../../../hooks/useNotification";
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import { format } from "timeago.js";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const Notification = () => {
  const [nofitications, notifyRefetch, isLoading] = useNotification();
  const axiosPublic = useAxiosPublic();
  // delete notification
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You sure delete this notification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`notification/${id}`);
        if (res.dataacknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          notifyRefetch();
        }
      }
    });
  };
  if (isLoading) {
    return <p className="text-center">Loadind...</p>;
  }
  return (
    <div className="mt-2">
      <SectionHelmet title={"Free Time | Notification"} />
      <div className="space-y-2">
       {
        nofitications?.length === 0 ? <p className="text-center mt-5 text-primary">No Notification!</p> : <> {nofitications?.map((notification) => (
          <div
            className="w-full bg-white py-3 px-5 rounded-md flex items-center justify-between shadow-md"
            key={notification?._id}>
            <div>
              <h2 className="font-medium">
                {notification?.NotifyName} {notification?.type}
              </h2>{" "}
              <p>
                <small>{format(notification?.date)}</small>
              </p>
            </div>
            <button
              onClick={() => handleDelete(notification?._id)}
              className="btn btn-circle btn-sm text-xl">
              <MdClose />
            </button>
          </div>
        ))}</>
       }
      </div>
    </div>
  );
};

export default Notification;
