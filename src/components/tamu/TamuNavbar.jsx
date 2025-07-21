import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./tamuNavbar.scss";

import { useTranslation } from "react-i18next";

const TamuNavbar = ({ currentView, setCurrentView, socialView, setSocialView }) => {
  const { t, i18n } = useTranslation();
  
  const showBackButton = currentView === "social" && socialView && socialView !== "hub";
  
  const handleBackClick = () => {
    if (setSocialView) {
      setSocialView("hub");
    }
  };

  return (
    <div className="tamu-navbar">
      {showBackButton && (
        <button 
          className="nav-button back-button"
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
          {t('common.back')}
        </button>
      )}
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