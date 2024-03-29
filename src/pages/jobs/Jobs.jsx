import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import MostLiked from "../../components/posts/MostLiked";
import Post from "../../components/post/Post";
import "./jobs.scss"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {  useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import SubmitEvent from "../../components/event/SubmitEvent";
import SubmitJob from "../../components/jobs/SubmitJob";
import Event from "../../components/event/Event";
import { AuthContext } from "../../context/authContext";
import Job from "../../components/jobs/Job";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const [selectedCategories, setSelectedCategories] = useState(["construction", "gardener", "housekeeping", "janitor", "restaurant", "general", "temporary", "students", "professionals"]);
  const [jobInput, setJobInput] = useState("");

  const handleCategoryPress = (category) => {
    switch (category) {
      case 'all':
        setSelectedCategories((prevCategories) => {
            if (prevCategories.length > 0) {
              return [];
            } 
            else {
              return["construction", "gardener", "housekeeping", "janitor", "restaurant", "general", "temporary", "students", "professionals"]
            }
        });
        break;
      default:
        setSelectedCategories((prevCategories) => {
          if (prevCategories.includes(category)) {
            return prevCategories.filter((c) => c !== category);
          } else {
            return [...prevCategories, category];
          }
        });
    }
  };

  const { isLoading: isJobsLoading, error: jobError, data: jobData } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => makeRequest.get("/posts/jobs").then((res) => {return res.data})
  });

  let filteredData;
  if (jobData && !isJobsLoading) {
    if (selectedCategories && selectedCategories.length > 0) {
      // Filter posts based on the provided categories
      filteredData = jobData.filter((job) => selectedCategories.includes(job.category));
    } else {
      // If no categories are provided, show all posts
      filteredData = jobData;
    }
  }

  return (
    <div className="jobs">
        <div className="background">
            <h1 className="title">{t('categories.jobs')}</h1>
            <div className="text-container">
                <div className="text-content">
                    <span>{t('jobs.desc')}</span>
                </div>
            </div>
        </div>
        <div className="market-container">
            <div>
            <div className="centered">
              {
                !currentUser || currentUser.account_type !== "business" ? <div/> 
                : 
                <SubmitJob/>
              }
            </div>
            <h3 className="subtitle">{t('jobs.find')}</h3>
            <h4 className="smaller">{t('jobs.filter')}</h4>
            <div className="categories">
                <button className={selectedCategories.length === 9 ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("all")}>
                    {t('categories.all')}
                    {selectedCategories.length === 9 && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("construction") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("construction")}>
                    {t('categories.construction')}
                    {selectedCategories.includes("construction") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("gardener") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("gardener")}>
                    {t('jobs.gardening')}
                    {selectedCategories.includes("gardener") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("housekeeping") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("housekeeping")}>
                    {t('jobs.house')}
                    {selectedCategories.includes("housekeeping") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("janitor") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("janitor")}>
                    {t('jobs.janitor')}
                    {selectedCategories.includes("janitor") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("restaurant") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("restaurant")}>
                    {t('jobs.restaurant')}
                    {selectedCategories.includes("restaurant") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("general") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("general")}>
                    {t('categories.general')}
                    {selectedCategories.includes("general") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("students") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("students")}>
                    {t('jobs.students')}
                    {selectedCategories.includes("students") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("professionals") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("professionals")}>
                    {t('jobs.professionals')}
                    {selectedCategories.includes("professionals") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
                <button className={selectedCategories.includes("professionals") ? "widget" : "widget inactive"} onClick={() => handleCategoryPress("professionals")}>
                    {t('jobs.temporary')}
                    {selectedCategories.includes("professionals") && <DisabledByDefaultIcon fontSize="small"/>}
                </button>
            </div>
            <div className="grid">
                    {!isJobsLoading && filteredData && filteredData.map((post) => 
                        <Job job={post} key={post.id}/>
                    )}
                </div>
                <div className="section">
                    <h3 className="subtitle">Posts</h3>
                    <div style={{marginBottom: 20}}/>
                    <Share categ={"jobs"}/>
                    <Posts categories={["jobs"]}/>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Jobs;