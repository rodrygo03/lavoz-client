import React from "react";
import { useTranslation } from "react-i18next";
import "./socialHub.scss";

const RecTeams = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="social-hub">
      <div className="social-container">
        <div className="social-header">
          <h2>{t('recTeams.title')}</h2>
          <p className="tagline">{t('recTeams.subtitle')}</p>
        </div>
        
        <div className="rec-teams-content">
          <p>{t('recTeams.description')}</p>
        </div>
      </div>
    </div>
  );
};

export default RecTeams;