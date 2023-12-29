import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";
import Registration from "../Authentication/Registration";
import Login from "../Authentication/Login";
import PrivateRoute from "../Private/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import Videos from "../pages/Videos/Videos";
const Routers = createBrowserRouter([
        {
            path: '/',
            element: <PrivateRoute><Main/></PrivateRoute>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path:'/videos',
                    element:<Videos/>
                }
                
            ],
        },
        {
            path:'/profile',
            element: <PrivateRoute><Profile/></PrivateRoute>
        },
        {
            path: '/registration',
            element: <Registration/>
        },
        {
            path: '/login',
            element: <Login/>
        }
])

 
export default Routers;