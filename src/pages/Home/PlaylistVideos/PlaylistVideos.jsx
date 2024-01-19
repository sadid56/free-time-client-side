import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import ReactPlayer from "react-player";
import useAuth from "../../../hooks/useAuth";

const PlaylistVideos = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: playlists = [], refetch } = useQuery({
    queryKey: ["playlist"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/playlist?email=${user?.email}`);
      return res.data;
    },
  });
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure delete this video ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/playlist/${_id}`);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Deleted!",
            text: "Your video has been deleted !",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <section>
      <SectionHelmet title={"Free Time | Playlist"} />
      <div className="">
        {playlists?.length === 0 ? (
          <p className="text-red-500 text-xl text-center md:mt-20">
            No video Saved !
          </p>
        ) : (
          playlists?.map((playlist) => (
            <div
              key={playlist?._id}
              className="flex shadow-md border w-full mt-4 gap-5 md:gap-10 md:mx-5 p-3 rounded-md relative ">
              <div className="flex-1 w-full h-[100px] md:h-[250px]">
                <ReactPlayer
                  style={{
                    borderRadius: "20px",
                  }}
                  progressInterval={1000}
                  controls
                  volume={0.5}
                  url={playlist?.video}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={playlist?.auther_image} />
                    </div>
                  </div>
                  <div>
                    <h3 className=" md:text-xl font-medium flex items-center gap-3">
                      {playlist?.name}{" "}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {playlist?.time?.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <p>{playlist?.title}</p>
                <div className="absolute  right-0 md:right-8 bottom-0 md:top-0">
                  <button
                    onClick={() => handleDelete(playlist?._id)}
                    className="btn btn-circle text-xl">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PlaylistVideos;
