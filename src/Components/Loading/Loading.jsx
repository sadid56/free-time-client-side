import { RotatingLines } from "react-loader-spinner";


const Loading = () => {
    return (
        <div className="flex h-[80vh] md:h-[100vh] justify-center items-center">
              <RotatingLines
  visible={true}
  height="50"
  width="50"
  color="blue"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        </div>
    );
};

export default Loading;