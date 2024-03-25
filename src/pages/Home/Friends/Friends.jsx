
import Friend from "../../../shared/Friend/Friend";
import useGetAllUser from "../../../hooks/useGetAllUser";


const Friends = () => {
   const [users] = useGetAllUser()
    // console.log(friends);
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
            {
                users?.map(friend => <Friend key={friend?._id} friend={friend}/>)
            }
        </div>
    );
};

export default Friends;