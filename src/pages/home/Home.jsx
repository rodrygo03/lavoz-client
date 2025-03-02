// import React, { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
// import { useTranslation } from "react-i18next";
// import i18next from "i18next";
// import Stories from "../../components/stories/Stories";
// import Posts from "../../components/posts/Posts";
// import Share from "../../components/share/Share";
// import MostLiked from "../../components/posts/MostLiked";
// import RightBar from "../../components/rightBar/RightBar";
// import "./home.scss";

// const Home = () => {
//   const { t } = useTranslation();
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <div className="home">
//       <div className="leftHome">
//         <Share categ={null} />
//         <MostLiked />
//         <div className="section">
//           <h3 className="title">{t('categories.news')}</h3>
//           {i18next.language != 'es' ?
//             <iframe title="news-eng" width="100%" height="440" src="https://rss.app/embed/v1/carousel/_eG80xEQg7RyXilCP" frameBorder="0"></iframe>
//             :
//             <iframe title="news-esp" width="100%" height="440" src="https://rss.app/embed/v1/carousel/_IyVFQ0LMLGfzPeU6" frameBorder="0"></iframe>
//           }
//           <h3 className="title" style={{ marginTop: 0 }}>{t('sections.discover')}</h3>
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             {i18next.language !== 'es' ?
//               <iframe title="social-eng" width="100%" height="440" src="https://rss.app/embed/v1/carousel/zSH4hCtsZz0XJDmA" frameBorder="0"></iframe>
//               :
//               <iframe title="social-esp" width="100%" height="440" src="https://rss.app/embed/v1/carousel/d8GmDRgqSgMFd8FD" frameBorder="0"></iframe>
//             }
//           </div>
//         </div>
//         { currentUser &&
//           <div>
//             <h3 className="title">Moments</h3>
//             <Stories />
//           </div>
//         }
//         <h3 className="title">Social</h3>
//         <Posts categories={["general", "greatThings", "tamu", "games", "fans", "advice", "more", "events", "jobs", "ads"]} />

//         <h3 className="title">{t('categories.newsArticles')}</h3>
//         <Posts categories={["news", "local", "latam", "usa"]} />
//       </div>
//       <RightBar style={{alignSelf: "center"}}/>
//     </div>
//   );
// }

// export default Home;

import React, { useContext, useState } from "react";
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

  // Track current index for carousel sections
  const [newsIndex, setNewsIndex] = useState(0);
  const [discoverIndex, setDiscoverIndex] = useState(0);

  // Arrays for news and discover sections
  const newsSections = [
    { title: "news-eng", src: "https://rss.app/embed/v1/carousel/_eG80xEQg7RyXilCP" },
    { title: "news-esp", src: "https://rss.app/embed/v1/carousel/_IyVFQ0LMLGfzPeU6" }
  ];

  const discoverSections = [
    { title: "social-eng", src: "https://rss.app/embed/v1/carousel/zSH4hCtsZz0XJDmA" },
    { title: "social-esp", src: "https://rss.app/embed/v1/carousel/d8GmDRgqSgMFd8FD" }
  ];

  // Navigation handlers
  const nextNews = () => setNewsIndex((prev) => (prev + 1) % newsSections.length);
  const prevNews = () => setNewsIndex((prev) => (prev - 1 + newsSections.length) % newsSections.length);

  const nextDiscover = () => setDiscoverIndex((prev) => (prev + 1) % discoverSections.length);
  const prevDiscover = () => setDiscoverIndex((prev) => (prev - 1 + discoverSections.length) % discoverSections.length);

  return (
    <div className="home">
      <div className="leftHome">
        <Share categ={null} />
        <MostLiked />

        {/* News Section with Navigation */}
        <div className="section">
          <h3 className="title">{t('categories.news')}</h3>
          <div className="carousel">
            <button className="nav-button left" onClick={prevNews}>←</button>
            <iframe 
              title={newsSections[newsIndex].title} 
              width="100%" 
              height="440" 
              src={newsSections[newsIndex].src} 
              frameBorder="0">
            </iframe>
            <button className="nav-button right" onClick={nextNews}>→</button>
          </div>
        </div>

        {/* Discover Section with Navigation */}
        <h3 className="title" style={{ marginTop: 0 }}>{t('sections.discover')}</h3>
        <div className="carousel">
          <button className="nav-button left" onClick={prevDiscover}>←</button>
          <iframe 
            title={discoverSections[discoverIndex].title} 
            width="100%" 
            height="440" 
            src={discoverSections[discoverIndex].src} 
            frameBorder="0">
          </iframe>
          <button className="nav-button right" onClick={nextDiscover}>→</button>
        </div>

        {/* Stories and Posts */}
        {currentUser && (
          <div>
            <h3 className="title">Moments</h3>
            <Stories />
          </div>
        )}

        <h3 className="title">Social</h3>
        <Posts categories={["general", "greatThings", "tamu", "games", "fans", "advice", "more", "events", "jobs", "ads"]} />

        <h3 className="title">{t('categories.newsArticles')}</h3>
        <Posts categories={["news", "local", "latam", "usa"]} />
      </div>

      <RightBar style={{alignSelf: "center"}} />
    </div>
  );
};

export default Home;
