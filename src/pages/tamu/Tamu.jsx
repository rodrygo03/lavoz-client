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
  const [selectedCategories, setSelectedCategories] = useState(["tamu", "games", "advice", "fans"]);
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
            <div className="section" style={{marginTop: 50}}>
                {i18n.language == 'en' ? 
                      <iframe title="tamu-english" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/taeDVZp2KHcRDfSb" frameborder="0"></iframe>
                    :
                      <iframe title="tamu-spanish" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_N0wzxrQ4tvROvxUB" frameborder="0"></iframe>
                }
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
                    <button className={selectedCategories.includes("advice") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('advice')}>
                        {t('categories.advice')}
                        {selectedCategories.includes("advice") && <DisabledByDefaultIcon fontSize="small"/>}
                    </button>
                    <button className={selectedCategories.includes("fans") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('fans')}>
                        {t('categories.fans')}
                        {selectedCategories.includes("fans") && <DisabledByDefaultIcon fontSize="small"/>}
                    </button>
                </div>
                <Posts categories={selectedCategories}/>
            </div>
        </div>
    </div>
  )
}

export default Tamu;