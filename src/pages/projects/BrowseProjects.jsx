import "./browseProjects.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import ProjectCard from "../../components/project/ProjectCard";
import SubmitProject from "../../components/project/SubmitProject";
import { useTranslation } from "react-i18next";

const BrowseProjects = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => makeRequest.get("/projects").then((res) => res.data),
  });

  const openProjects = data ? data.filter((p) => p.status === "open") : [];

  return (
    <div className="browse-projects">
      <div className="header">
        <h1>{t("projects.browse")}</h1>
      </div>

      <div className="content">
        {currentUser?.account_type === "local" && (
          <div className="submit-section">
            <SubmitProject />
          </div>
        )}

        <div className="feed">
          {isLoading && <span className="loading">Loading...</span>}
          {error && <span className="error">Failed to load projects.</span>}
          {!isLoading && !error && openProjects.length === 0 && (
            <span className="empty">{t("projects.noProjects")}</span>
          )}
          {!isLoading && openProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseProjects;
