import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SavePost = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { data: savePosts = [], refetch } = useQuery({
    queryKey: ["savePost"],
    queryFn: async () => {
      const res = await axiosSecure.get("/post-save");
      return res.data;
    },
  });
//   console.log(savePosts);

const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure delete this post ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/post-save/${_id}`);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted !",
            icon: "success",
          });
          refetch()
        }
      }
    });
  };
  return (
    <section>
      <SectionHelmet title={"Free Time | Save Post"} />
      <h2 className="text-2xl font-semibold text-center my-10">Total Save Post: {savePosts?.length}</h2>
        <div className="space-y-3">
      {savePosts?.length === 0 ? (
        <p className="text-red-500 text-xl text-center mt-20">
          No Post Saved !
        </p>
      ) : (
        savePosts?.map((savePost) => (
          <div
            key={savePost?._id}
            className="card lg:card-side bg-base-100 shadow-xl w-full">
           {
            savePost?.image ?  <figure>
            <img
              src={savePost?.image}
              className="h-[300px] w-[400px] object-cover rounded-md"
              alt="Album"
            />
          </figure> : ""
           }
            <div className="card-body">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={savePost?.auther_image} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium flex items-center gap-3">
                    {savePost?.name}{" "}
                    <span className="text-[16px] font-normal text-gray-400">
                      {savePost?.feelings ? (
                        <p>
                          Feelings with{" "}
                          <span className="font-medium text-gray-950">
                            {savePost?.feelings}
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {savePost?.time?.slice(0, 10)}
                  </p>
                </div>
              </div>
              <p>Click the button to listen on Spotiwhy app.</p>
              <div className="card-actions justify-end">
                <button onClick={()=>handleDelete(savePost?._id)} className="btn btn-circle text-xl"><MdDelete/></button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </section>
  );
};

export default SavePost;
