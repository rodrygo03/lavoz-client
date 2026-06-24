import "./rightBar.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { STATUS_COLORS } from "../../utils/escrowStatus";

const RbSection = ({ title, to, linkLabel, children }) => (
  <div className="rb-card">
    <div className="rb-header">
      <h4>{title}</h4>
      <Link to={to}>{linkLabel} →</Link>
    </div>
    <div className="rb-list">{children}</div>
  </div>
);

const RightBar = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => makeRequest.get("/projects").then((r) => r.data),
  });

  const { data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => makeRequest.get("/users/").then((r) => r.data),
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => makeRequest.get("/services").then((r) => r.data),
  });

  const { data: escrows } = useQuery({
    queryKey: ["escrows", "me"],
    queryFn: () => makeRequest.get("/escrows/me").then((r) => r.data),
    enabled: !!currentUser,
  });

  const openProjects = projects?.filter((p) => p.status === "open").slice(0, 5) ?? [];
  const students = users?.filter((u) => u.account_type === "student").slice(0, 5) ?? [];
  const locals = users?.filter((u) => u.account_type === "local").slice(0, 5) ?? [];
  const featuredServices = services?.slice(0, 5) ?? [];
  const myEscrows = escrows?.filter((e) =>
    ["pending", "active", "submitted", "completed"].includes(e.status)
  ).slice(0, 5) ?? [];

  return (
    <div className="rightBar">
      {openProjects.length > 0 && (
        <RbSection title={t("projects.bcsLocalProjects")} to="/projects" linkLabel={t("projects.viewAll")}>
          {openProjects.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="rb-row">
              <div className="rb-row-info">
                <span className="rb-title">{p.title}</span>
                <span className="rb-subtitle">{p.username}{p.timeline ? ` · ${p.timeline}` : ""}</span>
              </div>
            </Link>
          ))}
        </RbSection>
      )}

      {students.length > 0 && (
        <RbSection title="Student Talent" to="/talent" linkLabel={t("projects.viewAll")}>
          {students.map((u) => (
            <Link key={u.id} to={`/profile/${u.id}`} className="rb-row">
              <img src={u.profilePic} alt="" />
              <div className="rb-row-info">
                <span className="rb-title">{u.username}</span>
                <span className="rb-subtitle">{u.skills ? u.skills.split(",")[0].trim() : u.university || "Student"}</span>
              </div>
            </Link>
          ))}
        </RbSection>
      )}

      {featuredServices.length > 0 && (
        <RbSection title="Student Services" to="/talent" linkLabel={t("projects.viewAll")}>
          {featuredServices.map((s) => (
            <Link key={s.id} to={`/profile/${s.userId}`} className="rb-row">
              <div className="rb-row-info">
                <span className="rb-title">{s.title}</span>
                <span className="rb-subtitle">{s.username}</span>
              </div>
            </Link>
          ))}
        </RbSection>
      )}

      {locals.length > 0 && (
        <RbSection title={t("projects.bcsLocals")} to="/talent" linkLabel={t("projects.viewAll")}>
          {locals.map((u) => (
            <Link key={u.id} to={`/profile/${u.id}`} className="rb-row">
              <img src={u.profilePic} alt="" />
              <div className="rb-row-info">
                <span className="rb-title">{u.username}</span>
                <span className="rb-subtitle">{u.location || "BCS Local"}</span>
              </div>
            </Link>
          ))}
        </RbSection>
      )}

      {currentUser && myEscrows.length > 0 && (
        <RbSection title={t("escrow.myEscrows")} to="/escrows" linkLabel={t("projects.viewAll")}>
          {myEscrows.map((e) => (
            <Link key={e.id} to={`/escrows/${e.id}`} className="rb-row">
              <div className="rb-row-info">
                <span className="rb-title">{e.projectTitle}</span>
                <span className="rb-subtitle">{e.studentUsername} ↔ {e.localUsername}</span>
              </div>
              <span
                className="rb-status"
                style={{ backgroundColor: STATUS_COLORS[e.status] }}
              >
                {t(`escrow.${e.status}`)}
              </span>
            </Link>
          ))}
        </RbSection>
      )}
    </div>
  );
};

export default RightBar;
