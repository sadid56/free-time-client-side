import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import NameChnageModal from "../../shared/NameChangeModal/NameChnageModal";


const Setting = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    return (
        <div className="max-w-5xl mx-auto space-y-3 mt-20 shadow-2xl border rounded-md p-10">
            <button onClick={()=>navigate(-1)} className="text-2xl btn font-semibold"><MdArrowBack/> Back</button>
            <h2 className="text-xl font-medium">Today: <span className="text-gray-500 font-normal text-[18px]">{moment().format("dddd, MMMM Do, YYYY")}</span></h2>
            <h3 className="text-xl font-medium">Name: <span className="text-gray-500 font-normal text-[18px]">{user?.displayName}</span></h3>
            <NameChnageModal/>
            <h2 className=" font-medium link text-gray-400">Change Password</h2>
            <h2>Theme</h2>
        </div>
    );
};

export default Setting;