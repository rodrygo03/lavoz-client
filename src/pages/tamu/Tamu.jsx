import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import MostLiked from "../../components/posts/MostLiked";
import Post from "../../components/post/Post";
import "./tamu.scss"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useTranslation } from "react-i18next";

const Tamu = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState(["tamu", "games"]);
  const handleCategoryPress = (category) => {
    setSelectedCategories((prevCategories) => {
        if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
        } else {
        return [...prevCategories, category];
        }
    });
  };

  return (
    <div className="tamu">
        <div className="background">
            <h1 className="title">{t('tamu.tamu')}</h1>
            <span>{t('tamu.desc')}</span>
        </div>
        <div className="news-container">
            <Share categ={null}/>
            <div className="section">
                <h3 className="subtitle">{t('tamu.filter')}</h3>
                <div className="categories">
                    <button className={selectedCategories.includes("tamu") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("tamu")}>
                        {t('categories.tamu')}
                        {selectedCategories.includes("tamu") && <DisabledByDefaultIcon fontSize="small"/>}
                    </button>
                    <button className={selectedCategories.includes("games") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('games')}>
                        {t('categories.games')}
                        {selectedCategories.includes("games") && <DisabledByDefaultIcon fontSize="small"/>}
                    </button>
                </div>
                <Posts categories={selectedCategories}/>
            </div>
        </div>
    </div>
  )
}

export default Tamu;