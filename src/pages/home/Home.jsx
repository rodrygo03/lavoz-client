import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import MostLiked from "../../components/posts/MostLiked";
import RightBar from "../../components/rightBar/RightBar";
import "./home.scss";

const Home = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="leftHome">
        <Share categ={null} />
        <MostLiked />
        <div className="section">
          <h3 className="title">{t('categories.news')}</h3>
          {i18next.language != 'es' ?
            <iframe title="news-eng" width="100%" height="440" src="https://rss.app/embed/v1/carousel/_eG80xEQg7RyXilCP" frameBorder="0"></iframe>
            :
            <iframe title="news-esp" width="100%" height="440" src="https://rss.app/embed/v1/carousel/_IyVFQ0LMLGfzPeU6" frameBorder="0"></iframe>
          }
        </div>

        <div className="section">
          <h3 className="title" style={{ marginTop: 0 }}>{t('sections.discover')}</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {i18next.language !== 'es' ?
              <iframe title="social-eng" width="100%" height="440" src="https://rss.app/embed/v1/carousel/zSH4hCtsZz0XJDmA" frameBorder="0"></iframe>
              :
              <iframe title="social-esp" width="100%" height="440" src="https://rss.app/embed/v1/carousel/d8GmDRgqSgMFd8FD" frameBorder="0"></iframe>
            }
          </div>
        </div>

        { currentUser && (
          <div className="section">
            <h3 className="title">Moments</h3>
            <Stories />
          </div>
        )}
        <div className="section">
          <h3 className="title">Social</h3>
          <Posts categories={["general", "greatThings", "tamu", "games", "fans", "advice", "more", "events", "jobs", "ads"]} />
        </div>

        <div className="section">
          <h3 className="title">{t('categories.newsArticles')}</h3>
          <Posts categories={["news", "local", "latam", "usa"]} />
        </div>
      </div>
      <RightBar style={{alignSelf: "center"}}/>
    </div>
  );
}

export default Home;