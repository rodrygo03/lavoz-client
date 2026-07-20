import "./projectCard.scss";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const skills = project.skills
    ? project.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const closeMutation = useMutation({
    mutationFn: () => makeRequest.put(`/projects/${project.id}/close`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/projects/${project.id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const isOwner = currentUser && currentUser.id === project.userId;

  return (
    <div className="project-card">
      <div className="card-top">
        <span className={`status-badge ${project.status}`}>
          {project.status === "open" ? t("projects.open")
            : project.status === "in_escrow" ? t("projects.inEscrow")
            : t("projects.closed")}
        </span>
        <h3>{project.title}</h3>
        <div className="posted-by">
          <img src={project.profilePic} alt="" />
          <Link to={`/profile/${project.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
            {project.username}
          </Link>
        </div>
      </div>

      <div className="card-body">
        <p className="description">{project.description}</p>

        {skills.length > 0 && (
          <div className="skills-list">
            <span className="skills-label">{t("projects.skillsNeeded")}:</span>
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}

        {project.timeline && (
          <div className="meta-row">
            <CalendarMonthIcon fontSize="small" />
            <span>{project.timeline}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <Link to={`/projects/${project.id}`}>
          <button className="details-btn">{t("projects.viewDetails")}</button>
        </Link>
        {isOwner && project.status === "open" && (
          <button
            className="close-btn"
            onClick={() => closeMutation.mutate()}
            disabled={closeMutation.isPending}
          >
            {t("projects.closeProject")}
          </button>
        )}
        {isOwner && project.status === "open" && (
          <button
            className="delete-btn"
            onClick={() => {
              if (window.confirm(t("projects.deleteConfirm"))) deleteMutation.mutate();
            }}
            disabled={deleteMutation.isPending}
          >
            {t("projects.deleteProject")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
