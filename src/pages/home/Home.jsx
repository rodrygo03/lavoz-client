import "./home.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { STATUS_COLORS } from "../../utils/escrowStatus";

/* ── Shared: active escrow summary ── */
const ActiveEscrows = ({ t }) => {
  const { data: escrows } = useQuery({
    queryKey: ["escrows", "me"],
    queryFn: () => makeRequest.get("/escrows/me").then((r) => r.data),
  });

  const active = escrows?.filter((e) =>
    ["pending", "active", "submitted"].includes(e.status)
  ) ?? [];

  return (
    <div className="home-card">
      <div className="home-card-header">
        <h3>{t("escrow.myEscrows")}</h3>
        <Link to="/escrows">{t("escrow.backToEscrows").replace("Back to ", "View all ")} →</Link>
      </div>
      {active.length === 0 ? (
        <p className="empty-msg">{t("escrow.noEscrows")}</p>
      ) : (
        <div className="escrow-list">
          {active.slice(0, 4).map((e) => (
            <Link key={e.id} to={`/escrows/${e.id}`} className="escrow-row">
              <span className="escrow-title">{e.projectTitle}</span>
              <span
                className="escrow-status"
                style={{ backgroundColor: STATUS_COLORS[e.status] }}
              >
                {t(`escrow.${e.status}`)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Student home ── */
const StudentHome = ({ t }) => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => makeRequest.get("/projects").then((r) => r.data),
  });

  const open = projects?.filter((p) => p.status === "open").slice(0, 6) ?? [];

  return (
    <div className="home-content">
      <ActiveEscrows t={t} />

      <div className="home-card">
        <div className="home-card-header">
          <h3>{t("projects.browse")}</h3>
          <Link to="/projects">View all →</Link>
        </div>
        {isLoading && <p className="empty-msg">Loading...</p>}
        {!isLoading && open.length === 0 && (
          <p className="empty-msg">{t("projects.noProjects")}</p>
        )}
        <div className="project-list">
          {open.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="project-row">
              <div className="project-row-info">
                <span className="project-title">{p.title}</span>
                <span className="project-by">{p.username}</span>
              </div>
              {p.timeline && (
                <span className="project-timeline">{p.timeline}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Local home ── */
const LocalHome = ({ t }) => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["talentUsers"],
    queryFn: () => makeRequest.get("/users/").then((r) => r.data),
  });

  const students = users
    ?.filter((u) => u.account_type === "student")
    .slice(0, 8) ?? [];

  return (
    <div className="home-content">
      <ActiveEscrows t={t} />

      <div className="home-card">
        <div className="home-card-header">
          <h3>{t("talent.browse")}</h3>
          <Link to="/talent">View all →</Link>
        </div>
        {isLoading && <p className="empty-msg">Loading...</p>}
        {!isLoading && students.length === 0 && (
          <p className="empty-msg">{t("talent.noStudents")}</p>
        )}
        <div className="student-grid">
          {students.map((u) => (
            <Link key={u.id} to={`/profile/${u.id}`} className="student-chip">
              <img src={u.profilePic} alt="" />
              <span>{u.username}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Admin home ── */
const AdminHome = ({ t }) => {
  const { data: users } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => makeRequest.get("/users/").then((r) => r.data),
  });

  const { data: escrows } = useQuery({
    queryKey: ["adminEscrows"],
    queryFn: () => makeRequest.get("/escrows").then((r) => r.data),
  });

  const stats = [
    {
      label: "Total Users",
      value: users?.length ?? "—",
      to: "/admin",
    },
    {
      label: "Active Escrows",
      value: escrows?.filter((e) => e.status === "active").length ?? "—",
      to: "/admin",
    },
    {
      label: "Pending Matches",
      value: escrows?.filter((e) => e.status === "pending").length ?? "—",
      to: "/admin",
    },
    {
      label: "Completed",
      value: escrows?.filter((e) => e.status === "completed").length ?? "—",
      to: "/admin",
    },
  ];

  const recentEscrows = escrows?.slice(0, 5) ?? [];

  return (
    <div className="home-content">
      <div className="stat-grid">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="home-card">
        <div className="home-card-header">
          <h3>Recent Escrows</h3>
          <Link to="/admin">Admin Dashboard →</Link>
        </div>
        <div className="escrow-list">
          {recentEscrows.map((e) => (
            <Link key={e.id} to={`/escrows/${e.id}`} className="escrow-row">
              <span className="escrow-title">{e.projectTitle}</span>
              <span className="escrow-by">{e.studentUsername} ↔ {e.localUsername}</span>
              <span
                className="escrow-status"
                style={{ backgroundColor: STATUS_COLORS[e.status] }}
              >
                {t(`escrow.${e.status}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Root ── */
const Home = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  const role = currentUser?.account_type;

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Postsstation</h1>
        <p>Brazos Valley Student–Local Marketplace</p>
      </div>

      {role === "student" && <StudentHome t={t} />}
      {role === "local"   && <LocalHome   t={t} />}
      {role === "admin"   && <AdminHome   t={t} />}

      {!role && (
        <div className="home-content">
          <p className="empty-msg" style={{ textAlign: "center", padding: "40px 0" }}>
            Welcome! Please <Link to="/login">log in</Link> to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
