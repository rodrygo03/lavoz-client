import { createContext, useEffect, useState } from "react";
import { withNamespaces } from 'react-i18next';
import i18next, { changeLanguage } from "i18next";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem("language")) || "es"
  );

  const langToggle = () => {
    if (language == 'es') {
        setLanguage("en");
    }
    else {
        setLanguage("es");
    }
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, langToggle }}>
      {children}
    </LanguageContext.Provider>
  );
};
