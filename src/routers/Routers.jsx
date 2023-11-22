import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";
import Registration from "../Authentication/Registration";

const Routers = createBrowserRouter([
        {
            path: '/',
            element: <Main/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                }
            ]
        },
        {
            path: '/registration',
            element: <Registration/>
        }
])

 
export default Routers;