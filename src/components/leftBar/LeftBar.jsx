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

const LeftBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logout = async () => {
    // const res = await axios.post("http://localhost:8800/api/auth/logout", {
    // });
    const res = await axios.post("https://server.postsstation.com/api/auth/logout", {
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
    <div className='soft'>
      {!sidebarOpen && <KeyboardDoubleArrowRightIcon className = "toggle-closed" onClick = {() => setSidebarOpen(!sidebarOpen)} style={{color: "gray", cursor: "pointer"}} />}
      <div className={`leftBar ${sidebarOpen ? "open" : "closed"}`}>
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
                    <span>{currentUser.name}</span>
                  </div>
                </Link>
                <div className="logout">
                  <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)}/>
                  {menuOpen && <button onClick={handleLogout}>Logout</button>}
                </div>
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
                  <span>MarketStation</span>
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
