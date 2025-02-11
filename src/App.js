import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import ProfilePage from "./pages/profile/ProfilePage";
import Notifs from "./pages/notifications/Notifs";
import PostPage from "./pages/post/PostPage";
import Messages from "./pages/messages/Messages";
import Category from "./components/category/Category";
import Tamu from "./pages/tamu/Tamu";
import Users from "./pages/users/Users";
import News from "./pages/news/News";
import Market from "./pages/market/Market";
import Events from "./pages/events/Events";
import Jobs from "./pages/jobs/Jobs";
import AdPage from "./pages/adPage/AdPage";
import FirstLogin from "./pages/firstLogin/FirstLogin";
import Viral from "./pages/viral/Viral";
import Guest from "./pages/guest/Guest";
import "./style.scss";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n';
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import OTPInput from "./pages/forgotPassword/OTPInput";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import { RecoveryContext } from "./context/recoveryContext";
import Shorts from "./pages/shorts/Shorts";

function App() {
  const { currentUser } = useContext(AuthContext);
  
  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`} style={{height: '100%'}}>
          <Navbar style={{height: '5%'}} />
          <div style={{ display: "flex", height: '95%', width: '100%' }}>
            <LeftBar/>
            <div className="mainSection" style={{ width: "100%", margin: 0, flex: 10 }}>
              <h1 style={{ color: "red", textAlign: "center" }}>TEST DEPLOYMENT</h1>
              <Outlet />
            </div>
            {/* <RightBar /> */}
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  function ResetRoute({children}) {
    const { valid } = useContext(RecoveryContext);
    return valid === true ? children : <Navigate to="/forgotPassword"/>
  }

  function OTPRoute({children}) {
    const { email } = useContext(RecoveryContext);
    return email != null ? children: <Navigate to="/otp"/>
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:name",
          element: <Category />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/market",
          element: <Market />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/profile/:id",
          element: <ProfilePage />,
        },
        {
          path: "/tamu",
          element: <Tamu />,
        },
        {
          path: "/viral",
          element: <Viral />,
        },
        {
          path: "/post/:id",
          element: <PostPage />,
        },
        {
          path: "/post/:id/open",
          element: <PostPage />,
        },
        {
          path: "/guest",
          element: <Guest/>
        },
        {
          path: "/shorts",
          element: <Shorts />
        }
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/firstLogin",
          element: <FirstLogin />,
        },
        {
          path: "/notifications",
          element: <Notifs />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/postAd",
          element: <AdPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword/>
    },
    {
      path: "/otp",
      element: (
        <OTPRoute>
          <OTPInput/>
        </OTPRoute>
      )
    },
    {
      path: "/resetPassword",
      element: (
        <ResetRoute>
          <ResetPassword/>
        </ResetRoute>
      )
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}  style={{maxWidth: "100vw"}}/>
    </div>
  );
}

export default (App);
