import logo from "../../assets/icon/logo.png";
import "./loading.css"

const Loading = () => {
    return (
        <div className="loading-gradient h-[100vh]">
           <div className="flex flex-col h-[80vh] md:h-[90vh] justify-center items-center">
           <div className=" p-3 rounded-xl logo">
            <img src={logo} className="w-20" alt="" />
           </div>
           </div>
           <p className="text-center italic">© Copyright by Sadid</p>
        </div>
    );
};

export default Loading;