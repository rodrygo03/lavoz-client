import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from '@mui/material/IconButton';
import NotificationBell from "../notification/NotificationBell";
import MessageBell from "../notification/MessageBell";

import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import i18next from "i18next";
import { makeRequest } from "../../axios";

import "./navbar.scss";

import Logo from "../../assets/Postsstationlogo.png";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, clearUser } = useContext(AuthContext);
  const [language, setLanguage] = useState(i18next.language === 'es');
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const toggleLng = () => {
    setLanguage(!language);
    i18next.changeLanguage(language ? 'en' : 'es');
  }

  const logout = async () => {
    clearUser();
    const res = await makeRequest.post("/auth/logout", {
    });
  };

  const handleLogout = async (e) => {
    e.preventDefault()
    try{
      await logout();
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="Postsstation Logo" className="logo" />
        </Link>
        <Link to='/' className="pc" style={{ textDecoration: "none", color: "inherit", display: 'flex' }}>
          <HomeOutlinedIcon className="pc" style={{ justifyContent: "center", alignItems: "center" }} />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon className="pc" onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlinedIcon className="pc" onClick={toggle} style={{ cursor: "pointer" }} />
        )}
        <button className="language-toggle" onClick={toggleLng}>
          <img src={language ? "https://www.postsstation.com/reactions/mx.png" : "https://www.postsstation.com/reactions/us.png"} className="flag" alt="Language Flag"/>
        </button>
      </div>
      {currentUser ? (
        <div className="right">
          <Link to={"/users"} className="pc" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton color={"inherit"}><PersonOutlinedIcon style={{ color: "inherit" }} /></IconButton>
          </Link>
          <Link to="/messages" style={{ textDecoration: "none", color: "inherit" }}>
            <MessageBell iconColor="inherit" />
          </Link>
          <Link to="/notifications" style={{ textDecoration: "none", color: "inherit" }}>
            <NotificationBell iconColor="inherit" />
          </Link>
          <Link to={"/login"}>
            <button onClick={handleLogout} className="guest-button">Logout</button>
          </Link>
          {/* <Link to={"/profile/" + currentUser.id} className="pc" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="user">
              <img src={currentUser.profilePic} alt="" />
              <span>{currentUser.username}</span>
            </div>
          </Link> */}
        </div>
      ) : (
        <div className="row">
          <Link to={"/login"}>
            <button className="guest-button-second">Login</button>
          </Link>
          <Link to={"/register"}>
            <button className="guest-button">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
