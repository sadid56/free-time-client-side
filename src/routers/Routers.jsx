import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";
import Registration from "../Authentication/Registration";
import Login from "../Authentication/Login";
import PrivateRoute from "../Private/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import Reels from "../pages/Reels/Reels";
import SavePost from "../pages/Home/SavePost/SavePost";
import Friends from "../pages/Home/Friends/Friends";
import Setting from "../pages/Setting/Setting";
import Chat from "../pages/Home/chat/Chat";
import Notification from "../pages/Home/notification/Notification";
const Routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/save-post",
        element: <SavePost />,
      },
      {
        path: "/add-conversation",
        element: <Friends />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/setting",
    element: (
      <PrivateRoute>
        <Setting />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/reels",
    element: (
      <PrivateRoute>
        <Reels />
      </PrivateRoute>
    ),
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

export default Routers;
