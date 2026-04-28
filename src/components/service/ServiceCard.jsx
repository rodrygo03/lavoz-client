import "./serviceCard.scss";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ service }) => {
  const { t } = useTranslation();

  const skills = service.skills
    ? service.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="service-card">
      <div className="card-top">
        <h3>{service.title}</h3>
        <div className="posted-by">
          <img src={service.profilePic} alt="" />
          <Link to={`/profile/${service.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
            {service.username}
          </Link>
          {service.university && (
            <span className="university">· {service.university}</span>
          )}
        </div>
      </div>

      <div className="card-body">
        <p className="description">{service.description}</p>

        {skills.length > 0 && (
          <div className="skills-list">
            {skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}

        {service.availability && (
          <div className="meta-row">
            <AccessTimeIcon fontSize="small" />
            <span>{service.availability}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <Link to={`/profile/${service.userId}`}>
          <button>{t("talent.viewProfile")}</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
