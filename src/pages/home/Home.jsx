import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import MostLiked from "../../components/posts/MostLiked"
import "./home.scss"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState, useContext } from "react";
import { InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Carousel from "react-simply-carousel";
import { AuthContext } from "../../context/authContext";

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="home">
      <Stories/>
      <Share categ={null}/>
      <MostLiked/>
      
      <div className="section">
            <h3 className="title">{t('categories.news')}</h3>
            {i18next.language === 'en' ? 
            <iframe title="news-eng" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_uyYrMmgWWaF69e0M" frameborder="0"></iframe>
            :
            <iframe title="news-esp" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_EeLNdyLLpuYAovrj" frameborder="0"></iframe>
            }
            <h3 className="title" style={{marginTop: 0}}>{t('sections.discover')}</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {i18next.language === 'en' ? 
              <iframe title="social-eng" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_WFZEboCZQYPItoIQ" frameborder="0"></iframe>
              :
              <iframe title="social-esp" width="100%" height="440"  src="https://rss.app/embed/v1/carousel/_DMvof61NN3rH5dAj" frameborder="0"></iframe>
              }
            </div>
      </div>
      <h3 className="title">Social</h3>
      <Posts categories={["general", "greatThings", "tamu", "games", "more", "events", "jobs", "ads"]}/>
            
      <h3 className = "title">{t('categories.news')}</h3>
      <Posts categories={["news", "local", "latam", "usa"]}/>
    </div>
  )
}

export default Home





      {/* <h3 className="title">Filter Posts by Category</h3> */}
      {/* <div className="categories">
        <button className={selectedCategories.length === 14 ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("all")}>
          All
          {selectedCategories.length === 14 && <DisabledByDefaultIcon fontSize="small"/>}
        </button>

        <button className={selectedCategories.includes("news") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('news')}>
          News
          {selectedCategories.includes("news") && <DisabledByDefaultIcon fontSize="small"/>}
        </button>
      
        <button className={selectedCategories.includes("market") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('market')}>
          MarketStation
          {selectedCategories.includes("market") && <DisabledByDefaultIcon fontSize="small"/>}
        </button>

        <button className={selectedCategories.includes("tamu") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('tamu')}>
          Texas A&M University
          {selectedCategories.includes("tamu") && <DisabledByDefaultIcon fontSize="small"/>}
        </button>
        <button className={selectedCategories.includes("greatThings") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('greatThings')}>
          Great Things
          {selectedCategories.includes("greatThings") && <DisabledByDefaultIcon fontSize="small"/>}
        </button>
        <button className={selectedCategories.includes("more") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('more')}>
          Discover More
          {selectedCategories.includes("more") && <DisabledByDefaultIcon fontSize="small"/>}
        </button>
        <button className={selectedCategories.includes("general") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('general')}>
          General
          {selectedCategories.includes("general") && <DisabledByDefaultIcon fontSize="small"/>}
        </button>
        </div>
        {selectedCategories.includes("news") && 
        <div className="categories">
          <button className={selectedCategories.includes("local") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('local')}>
            Local
            {selectedCategories.includes("local") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
          <button className={selectedCategories.includes("usa") ? "widget" : "widget inactive"}   onClick = {() => handleCategoryPress('usa')}>
            United States
            {selectedCategories.includes("usa") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
          <button className={selectedCategories.includes("latam") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('latam')}>
            Latin America
            {selectedCategories.includes("latam") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
          <button className={selectedCategories.includes("global") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('global')}>
            Global
            {selectedCategories.includes("global") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
          <button className={selectedCategories.includes("hora") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('hora')}>
            Latest News
            {selectedCategories.includes("hora") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
        </div>
      }

      {selectedCategories.includes("market") && 
        <div className="categories">
          <button className={selectedCategories.includes("events") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('events')}>
            Events
            {selectedCategories.includes("events") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
          <button className={selectedCategories.includes("jobs") ? "widget" : "widget inactive"} onClick = {() => handleCategoryPress('jobs')}>
            Jobs
            {selectedCategories.includes("jobs") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
        </div>
      }

      {selectedCategories.includes("tamu") && 
        <div className="categories">
          <button className={selectedCategories.includes("games") ? "widget" : "widget inactive"}  onClick = {() => handleCategoryPress('games')}>
            Aggie Games
            {selectedCategories.includes("games") && <DisabledByDefaultIcon fontSize="small"/>}
          </button>
        </div>
      } */}