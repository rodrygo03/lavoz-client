import React from "react";
import { useTranslation } from "react-i18next";

import "./socialHub.scss";

const StudyGroups = ({ onBack }) => {
  const { t } = useTranslation();
  return (
    <div className="social-hub">
      <div className="social-container">
        <div className="social-header">
          <h2>{t('studyGroups.title')}</h2>
          <p className="tagline">{t('studyGroups.subtitle')}</p>
        </div>
        
        <div className="study-groups-content">
          <p>{t('studyGroups.description')}</p>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;