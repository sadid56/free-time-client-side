/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    
 if(loading){
    return <h3 className="text-center mt-10">Loading...</h3>
 }

if(user){
    return children;
}

return <Navigate state={location?.pathname} to="/login"/>

};

export default PrivateRoute;