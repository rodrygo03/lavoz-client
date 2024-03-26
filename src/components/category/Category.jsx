import Posts from "../posts/Posts"
import Share from "../share/Share"
import "./category.scss"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t, i18n } = useTranslation();
  // Get the current pathname from the URL
  const pathname = window.location.pathname;

  // Split the pathname into an array using the slash as a delimiter
  const pathArray = pathname.split('/');

  // Get everything after the first element (which is an empty string due to the leading slash)
  const routeName = pathArray[1];

  const getCategoryName = () => {
    switch(routeName) {
      case ("news"):
        return("Noticias");
      case ("local"):
        return("Noticias Locales");
      case ("usa"):
        return("Noticias de los Estados Unidos");
      case ("latam"):
        return("Noticias de Latinoamerica");
      case ("global"):
        return("Noticias Globales");
      case ("hora"):
        return("Noticias de última hora");
      case("market"):
        return("MarketStation");
      case("events"):
        return("Events");
      case("jobs"):
        return ("Empleos");
      case("tamu"):
        return("Universidad Texas A&M");
      case("games"):
        return("Juegos de los Aggies");
      case ("general"):
        return("General");
      case ("greatThings"):
        return("Great Things");
      case ("more"):
        return ("Descubre Mas");
    }
  }

  return (
    <div className="category">
      <div className="background">
        <h1 className="title">{t('categories.greatThings')}</h1>
        <div className="text-container">
          <div className="text-content">
              <span>{t('otherPages.greatThings')}</span>
          </div>
        </div>
      </div>
      <div className='great-container'>
        <div>
        <Share categ={"greatThings"}/>
        <Posts categories={[routeName]}/>
        </div>
      </div>
    </div>
  )
}

export default Category;