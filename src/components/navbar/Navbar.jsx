import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import i18next, { changeLanguage } from "i18next";
import US from "../../assets/us.png";
import MX from "../../assets/mx.png";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [language, setLanguage] = useState(i18next.language === 'es');

  const toggleLng = () => {
    setLanguage(!language);
    if (i18next.language == 'es') i18next.changeLanguage('en');
    else i18next.changeLanguage('es');
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Poststation</span>
        </Link>
        <Link to ='/' style={{textDecoration: "none", color: "inherit", display: 'flex'}}>
          <HomeOutlinedIcon style={{justifyContent: "center", alignItems: "center"}}/>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{cursor: "pointer"}} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} style={{cursor: "pointer"}} />
        )}
        <button className = "language-toggle" onClick={toggleLng}>
          {language ?
            <img src={MX} className="flag"/> : <img src={US} className="flag"/>
          }
        </button>
        {/* <Link to="/market" style = {{textDecoration: "none", color: "inherit", display: 'flex'}}>
          <GridViewOutlinedIcon style={{justifyContent: "center", alignItems: "center"}}/>
        </Link> */}

        {/* <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}

      </div>

        {
          currentUser ? 
          <div className="right">
            <Link to={"/users"} style={{ textDecoration: "none", color: "inherit" }}>
              <PersonOutlinedIcon />
            </Link>
            <Link to="/messages" style={{ textDecoration: "none", color: "inherit" }}>
              <EmailOutlinedIcon />
            </Link>
            <Link to="/notifications" style={{ textDecoration: "none", color: "inherit" }}>
              <NotificationsOutlinedIcon />
            </Link>
            <Link to={"/profile/"+currentUser.id} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="user">
                <img
                  src={currentUser.profilePic}
                  alt=""
                />
                <span>{currentUser.name}</span>
              </div>
            </Link>
          </div>
          :
          <div className="row">
            <Link to={"/register"}>
              <button className="guest-button">Sign Up</button>  
            </Link>
            <Link to={"/login"}>
              <button className="guest-button" style={{backgroundColor: "gray"}}>Login</button>  
            </Link>
          </div>
        }
    </div>
  );
};

export default Navbar;
