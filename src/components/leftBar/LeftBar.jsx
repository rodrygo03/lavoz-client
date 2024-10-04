import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import News from "../../assets/5.png";
import Tamu from "../../assets/tamu.jpg";
import Jobs from "../../assets/13.png";
import Events from "../../assets/map.png";
import Image from "../../assets/12.png";
import Video from "../../assets/4.png";
import Camera from "../../assets/9.png";
import Ad from "../../assets/11.png"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { useTranslation } from "react-i18next";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { makeRequest } from "../../axios";

const LeftBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const { currentUser, clearUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);


  return (
    <div className='soft'>
      {!sidebarOpen && <KeyboardDoubleArrowRightIcon className = "toggle-closed pc" onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray", cursor: "pointer"}} />}

      {sidebarOpen && <KeyboardDoubleArrowRightIcon className = "toggle-closed mobile" onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray", cursor: "pointer"}} />}


      <div className={`pc leftBar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="container">
          <div className='menu'>
            <div className = "toggle">
              {sidebarOpen ? <KeyboardDoubleArrowLeftIcon onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray", cursor: "pointer"}}/>
              : <KeyboardDoubleArrowRightIcon onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray"}}/>
              }
            </div>

            {
              currentUser && 
              <div className="row">
                <Link to={"/profile/"+currentUser.id} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="user">
                    <img
                      src={currentUser.profilePic}
                      alt=""
                    />
                    <span>{currentUser.username}</span>
                  </div>
                </Link>
                {/* <div className="logout">
                  <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)}/>
                  {menuOpen && <button onClick={handleLogout}>Logout</button>}
                </div> */}
              </div>
            }

            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Groups} alt="" />
                  <span>{t('sections.home')}</span>
              </div>
            </Link>
            <Link to={"/market"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Market} alt="" />
                  <span>Market</span>
              </div>
            </Link>
            <Link to={"/jobs"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Jobs} alt="" />
                  <span>{t('categories.jobs')}</span>
              </div>
            </Link>
            <Link to={"/events"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Events} alt="" />
                  <span>{t('categories.events')}</span>
              </div>
            </Link>
            <Link to={"/news"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={News} alt="" />
                  <span>{t('categories.news')}</span>
              </div>
            </Link>
            <Link to={"/greatThings"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Image} alt="" />
                  <span>{t('categories.greatThings')}</span>
              </div>
            </Link>
            <Link to={"/tamu"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Tamu} alt="" />
                  <span>{t('categories.tamu')}</span>
              </div>
            </Link>
            <Link to={"/viral"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Video} alt="" />
                  <span>{t('sections.discover')}</span>
              </div>
            </Link>
            <Link to={"/shorts"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Camera} alt="" />
                  <span>{t('sections.shorts')}</span>
              </div>
            </Link>
            {
              currentUser &&
              <Link to={"/users"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="item">
                    <img src={Friends} alt="" />
                    <span>{t('sections.friends')}</span>
                </div>
              </Link>
            }
            {currentUser && currentUser.account_type != 'personal' &&
              <Link to={"/postad"} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="item">
                      <img src={Ad} alt="" />
                      <span>{t('sections.postAd')}</span>
                  </div>
              </Link>
            }
          </div>
        </div>
      </div>

      <div className={`mobile leftBar ${sidebarOpen ? "closed" : "open"}`}>
        <div className="container">
          <div className='menu'>
            <div className = "toggle">
              {sidebarOpen ? <KeyboardDoubleArrowRightIcon onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray", cursor: "pointer"}}/>
              : <KeyboardDoubleArrowLeftIcon onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray"}}/>
              }
            </div>

            {
              currentUser && 
              <div className="row">
                <Link to={"/profile/"+currentUser.id} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="user">
                    <img
                      src={currentUser.profilePic}
                      alt=""
                    />
                    <span>{currentUser.username}</span>
                  </div>
                </Link>
                {/* <div className="logout">
                  <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)}/>
                  {menuOpen && <button onClick={handleLogout}>Logout</button>}
                </div> */}
              </div>
            }

            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Groups} alt="" />
                  <span>{t('sections.home')}</span>
              </div>
            </Link>
            <Link to={"/market"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Market} alt="" />
                  <span>Market</span>
              </div>
            </Link>
            <Link to={"/jobs"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Jobs} alt="" />
                  <span>{t('categories.jobs')}</span>
              </div>
            </Link>
            <Link to={"/events"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Events} alt="" />
                  <span>{t('categories.events')}</span>
              </div>
            </Link>
            <Link to={"/news"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={News} alt="" />
                  <span>{t('categories.news')}</span>
              </div>
            </Link>
            <Link to={"/greatThings"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Image} alt="" />
                  <span>{t('categories.greatThings')}</span>
              </div>
            </Link>
            <Link to={"/tamu"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Tamu} alt="" />
                  <span>{t('categories.tamu')}</span>
              </div>
            </Link>
            <Link to={"/viral"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Video} alt="" />
                  <span>{t('sections.discover')}</span>
              </div>
            </Link>
            <Link to={"/shorts"} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item">
                  <img src={Camera} alt="" />
                  <span>{t('sections.shorts')}</span>
              </div>
            </Link>
            {
              currentUser &&
              <Link to={"/users"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="item">
                    <img src={Friends} alt="" />
                    <span>{t('sections.friends')}</span>
                </div>
              </Link>
            }
            {currentUser && currentUser.account_type != 'personal' &&
              <Link to={"/postad"} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="item">
                      <img src={Ad} alt="" />
                      <span>{t('sections.postAd')}</span>
                  </div>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
