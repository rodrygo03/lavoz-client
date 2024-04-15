import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./tamu.scss"
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Tamu = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("tamu");

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const getPostCategories = () => {
    if (selectedCategory === "tamu") {
      return ["tamu", "games", "advice", "fans"]
    } else {
      return selectedCategory;
    }
  }

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
                      <iframe title="tamu-english" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_Vla9Lh2zzuM6diy3" frameborder="0"></iframe>
                    :
                      <iframe title="tamu-spanish" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_N0wzxrQ4tvROvxUB" frameborder="0"></iframe>
                }
                <h3 className="subtitle">{t('tamu.filter')}</h3>
                <div className="categories">
                    <button className={selectedCategory === "tamu" ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("tamu")}>
                        {t('categories.tamu')}
                    </button>
                    <button className={selectedCategory === "games" ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('games')}>
                        {t('categories.games')}
                    </button>
                    <button className={selectedCategory === "advice" ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('advice')}>
                        {t('categories.advice')}
                    </button>
                    <button className={selectedCategory === "fans" ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('fans')}>
                        {t('categories.fans')}
                    </button>
                </div>
                <Posts categories={getPostCategories()}/>
            </div>
        </div>
    </div>
  )
}

export default Tamu;