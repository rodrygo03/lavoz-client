import Posts from "../../components/posts/Posts"
import "./market.scss"
import {  useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import SubmitAd from "../../components/submitAd/SubmitAd";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/authContext";

const Market = () => {
  const { t } = useTranslation();
  const currentUser = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  const getCategories = () => {
    if (tab === 0) return (["construction", "merch", "free", "home", "landscape", "property-rental", "vehicles", "general-ad", "market"]);
    else if (tab === 1) return(['general-ad', "market"]);
    else if (tab === 2) return (['construction', "market"])
    else if (tab === 3) return (['free', "market"])
    else if (tab === 4) return (['home', "market"])
    else if (tab === 5) return (['landscape', "market"])
    else if (tab === 6) return (['property-rental', "market"])
    else if (tab === 7) return (['vehicles', "market"])
    else if (tab === 8) return (['merch', "market"])
  }

  const getSubmitAd = () => {
    // if (!currentUser.currentUser) return;
    // else if (currentUser.currentUser.account_type === 'business' || currentUser.currentUser.account_type === 'admin') {
    //   return (<SubmitAd/>)
    // } 
    return (<SubmitAd/>)
  }

  return (
    <div className="market">
        <div className="background">
            <h1 className="title">MarketStation</h1>
            <div className="text-container">
                <div className="text-content">
                    <span>{t('otherPages.market')}</span>
                </div>
            </div>
        </div>
        <div className="tabs">
        <button className={tab === 0 ? "tab selected" : "tab"} onClick={() => setTab(0)}>{t('categories.all')}</button>
            <button className={tab === 1 ? "tab selected" : "tab"} onClick={() => setTab(1)}>{t('categories.general')}</button>
            <button className={tab === 8 ? "tab selected" : "tab"} onClick={() => setTab(8)}>Aggie Merch</button>
            <button className={tab === 2 ? "tab selected" : "tab"} onClick={() => setTab(2)}>{t('categories.construction')}</button>
            <button className={tab === 3 ? "tab selected" : "tab"} onClick={() => setTab(3)}>{t('categories.free')}</button>
            <button className={tab === 4 ? "tab selected" : "tab"} onClick={() => setTab(4)}>{t('categories.home')}</button>
            <button className={tab === 5 ? "tab selected" : "tab"} onClick={() => setTab(5)}>{t('categories.landscape')}</button>
            <button className={tab === 6 ? "tab selected" : "tab"} onClick={() => setTab(6)}>{t('categories.property')}</button>
            <button className={tab === 7 ? "tab selected" : "tab"} onClick={() => setTab(7)}>{t('categories.vehicle')}</button>
        </div>
        <div className = "market-container">
          {getSubmitAd()}
          <Posts categories={getCategories()}/>
        </div>
    </div>
  )
}

export default Market;