import Posts from "../../components/posts/Posts"
import ShareShort from "../../components/shorts/ShareShort"
import Short from "../../components/shorts/Short";
import "./shorts.scss"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeRequest } from "../../axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Shorts = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("tamu");

  const queryClient = useQueryClient();
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

  
  const { isLoading, error, data } = useQuery({
    queryKey: ["shorts"],
    queryFn: () => makeRequest.get("/posts/shorts").then((res) => {return res.data})
  });

  return (
    <div className="shorts">
        <div className="background">
            <h1 className="title">{t('sections.shorts')}</h1>
            <span>{t('shorts.desc')}</span>
        </div>
        <div className="news-container">
          <ShareShort categ={null}/>
            { isLoading ? "loading" :
              <div className="shorts-grid">
                {data.map((short) => <Short short={short}/>)}
              </div>
            }
        </div>
    </div>
  )
}

export default Shorts;