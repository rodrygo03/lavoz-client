import "./leftBar.scss";
import Groups from "../../assets/2.png";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const LeftBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActivePath = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };


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
              <div className={`item${isActivePath("/", true) ? " active" : ""}`}>
                <img src={Groups} alt="" />
                <span>{t('sections.home')}</span>
              </div>
            </Link>

            {/* Browse Projects — student + local + admin */}
            {currentUser && (currentUser.account_type === 'student' || currentUser.account_type === 'local' || currentUser.account_type === 'admin') &&
              <Link to={"/projects"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/projects") ? " active" : ""}`}>
                  <WorkOutlineIcon style={{ width: 20, height: 20 }} />
                  <span>{t('projects.browse')}</span>
                </div>
              </Link>
            }

            {/* Browse Talent — local + admin */}
            {currentUser && (currentUser.account_type === 'local' || currentUser.account_type === 'admin') &&
              <Link to={"/talent"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/talent") ? " active" : ""}`}>
                  <PeopleOutlineIcon style={{ width: 20, height: 20 }} />
                  <span>{t('talent.browse')}</span>
                </div>
              </Link>
            }

            {/* My Escrows — student + local only */}
            {currentUser && currentUser.account_type !== 'admin' &&
              <Link to={"/escrows"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/escrows") ? " active" : ""}`}>
                  <HandshakeOutlinedIcon style={{ width: 20, height: 20 }} />
                  <span>{t('escrow.myEscrows')}</span>
                </div>
              </Link>
            }

            {/* Admin Dashboard — admin only */}
            {currentUser?.account_type === 'admin' &&
              <Link to={"/admin"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/admin") ? " active" : ""}`}>
                  <AdminPanelSettingsOutlinedIcon style={{ width: 20, height: 20 }} />
                  <span>{t('admin.dashboard')}</span>
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
              <div className={`item${isActivePath("/", true) ? " active" : ""}`}>
                <img src={Groups} alt="" />
                <span>{t('sections.home')}</span>
              </div>
            </Link>

            {/* Browse Projects — student + local + admin */}
            {currentUser && (currentUser.account_type === 'student' || currentUser.account_type === 'local' || currentUser.account_type === 'admin') &&
              <Link to={"/projects"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/projects") ? " active" : ""}`}>
                  <WorkOutlineIcon style={{ width: 20, height: 20 }} />
                  <span>{t('projects.browse')}</span>
                </div>
              </Link>
            }

            {/* Browse Talent — local + admin */}
            {currentUser && (currentUser.account_type === 'local' || currentUser.account_type === 'admin') &&
              <Link to={"/talent"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/talent") ? " active" : ""}`}>
                  <PeopleOutlineIcon style={{ width: 20, height: 20 }} />
                  <span>{t('talent.browse')}</span>
                </div>
              </Link>
            }

            {/* My Escrows — student + local only */}
            {currentUser && currentUser.account_type !== 'admin' &&
              <Link to={"/escrows"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/escrows") ? " active" : ""}`}>
                  <HandshakeOutlinedIcon style={{ width: 20, height: 20 }} />
                  <span>{t('escrow.myEscrows')}</span>
                </div>
              </Link>
            }

            {/* Admin Dashboard — admin only */}
            {currentUser?.account_type === 'admin' &&
              <Link to={"/admin"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={`item${isActivePath("/admin") ? " active" : ""}`}>
                  <AdminPanelSettingsOutlinedIcon style={{ width: 20, height: 20 }} />
                  <span>{t('admin.dashboard')}</span>
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
