import React from "react";
import { useTranslation } from "react-i18next";
import "./socialHub.scss";

const OrgDiscords = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="social-hub">
      <div className="social-container">
        <div className="social-header">
          <h2>{t('orgDiscords.title')}</h2>
          <p className="tagline">{t('orgDiscords.subtitle')}</p>
        </div>
        
        <div className="org-discords-content">
          <p>{t('orgDiscords.description')}</p>
        </div>
      </div>
    </div>
  );
};

export default OrgDiscords;