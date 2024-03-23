import logo from "../../assets/icon/logo.png";
import "./loading.css"

const Loading = () => {
    return (
        <div className="">
           <div className="flex flex-col h-[80vh] md:h-[90vh] justify-center items-center">
           <div className=" p-5 rounded-xl logo">
            <img src={logo} className="w-20" alt="" />
           </div>
           </div>
           <p style={{fontFamily:"cursive"}} className="text-center">© Copyright by Sadid</p>
        </div>
    );
};

export default Loading;