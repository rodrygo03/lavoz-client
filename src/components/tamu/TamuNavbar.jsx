import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import "./tamuNavbar.scss";

import { useTranslation } from "react-i18next";

const TamuNavbar = ({ currentView, setCurrentView }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="tamu-navbar">
      <button 
        className={currentView === "home" ? "nav-button active" : "nav-button"}
        onClick={() => setCurrentView("home")}
      >
        <HomeOutlinedIcon />
        {t('tamu.home')}
      </button>
      <button 
        className={currentView === "social" ? "nav-button active" : "nav-button"}
        onClick={() => setCurrentView("social")}
      >
        <GroupsOutlinedIcon />
        {t('tamu.socialHub')}
      </button>
    </div>
  );
};

export default TamuNavbar;