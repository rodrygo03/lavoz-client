import "./home.scss";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { STATUS_COLORS } from "../../utils/escrowStatus";
import SubmitService from "../../components/service/SubmitService";
import SubmitProject from "../../components/project/SubmitProject";
import Post from "../../components/post/Post";

const CarouselSection = ({ title, to, linkLabel, emptyText, items, renderItem, isGuest }) => {
  const rowRef = useRef(null);
  const navigate = useNavigate();

  const scrollByAmount = (direction) => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.9;
    rowRef.current.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const handleGuestClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="home-card carousel-card">
      <div className="home-card-header">
        <h3>{title}</h3>
        {isGuest ? (
          <a href="/login" onClick={handleGuestClick}>{linkLabel} →</a>
        ) : (
          <Link to={to}>{linkLabel} →</Link>
        )}
      </div>

      {items.length === 0 ? (
        <p className="empty-msg">{emptyText}</p>
      ) : (
        <div className="carousel-wrap">
          <button
            className="carousel-btn"
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollByAmount(-1)}
          >
            ‹
          </button>
          <div className="carousel-row" ref={rowRef}>
            {items.map(renderItem)}
          </div>
          <button
            className="carousel-btn"
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollByAmount(1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Shared home (students and BCS locals) ── */
const SharedHome = ({ t, isGuest, role }) => {
  const L = (path) => (isGuest ? "/login" : path);

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => makeRequest.get("/projects").then((r) => r.data),
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => makeRequest.get("/users/").then((r) => r.data),
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => makeRequest.get("/services").then((r) => r.data),
  });

  const { data: escrows, isLoading: escrowsLoading } = useQuery({
    queryKey: ["escrows", "me"],
    queryFn: () => makeRequest.get("/escrows/me").then((r) => r.data),
    enabled: !isGuest,
  });

  const { data: allPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => makeRequest.get("/posts").then((r) => r.data),
  });

  const projectActivityPosts = allPosts?.filter((p) => p.projectId != null) ?? [];

  const open = projects?.filter((p) => p.status === "open").slice(0, 10) ?? [];
  const locals = users?.filter((u) => u.account_type === "local").slice(0, 10) ?? [];
  const students = users?.filter((u) => u.account_type === "student").slice(0, 10) ?? [];
  const featuredServices = services?.slice(0, 10) ?? [];
  const myEscrows = escrows?.filter((e) =>
    ["pending", "active", "submitted", "completed"].includes(e.status)
  ).slice(0, 10) ?? [];

  return (
    <div className="home-content">
      {!isGuest && role === "local" && <SubmitProject />}
      {!isGuest && role === "student" && <SubmitService />}

      {projectActivityPosts.length > 0 && (
        <div className="activity-feed-section">
          {projectActivityPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}

      <CarouselSection
        title={t("projects.bcsLocalProjects")}
        to="/projects"
        linkLabel={t("projects.viewAll")}
        emptyText={projectsLoading ? "Loading..." : t("projects.noProjects")}
        items={projectsLoading ? [] : open}
        isGuest={isGuest}
        renderItem={(project) => (
          <Link key={project.id} to={L(`/projects/${project.id}`)} className="carousel-item service-item">
            <span className="item-title">{project.title}</span>
            <span className="item-subtitle">{project.username}</span>
            {project.timeline && <span className="item-meta">{project.timeline}</span>}
          </Link>
        )}
      />

      <CarouselSection
        title="Student Services"
        to="/talent"
        linkLabel={t("projects.viewAll")}
        emptyText={servicesLoading ? "Loading..." : t("talent.noServices")}
        items={servicesLoading ? [] : featuredServices}
        isGuest={isGuest}
        renderItem={(service) => (
          <Link key={service.id} to={L(`/profile/${service.userId}`)} className="carousel-item service-item">
            <span className="item-title">{service.title}</span>
            <span className="item-subtitle">{service.username}</span>
            {service.availability && <span className="item-meta">{service.availability}</span>}
          </Link>
        )}
      />

      <CarouselSection
        title={t("projects.bcsLocals")}
        to="/talent"
        linkLabel={t("projects.viewAll")}
        emptyText={usersLoading ? "Loading..." : t("projects.noLocals")}
        items={usersLoading ? [] : locals}
        isGuest={isGuest}
        renderItem={(user) => (
          <Link key={user.id} to={L(`/profile/${user.id}`)} className="carousel-item talent-item">
            <img src={user.profilePic} alt={user.username} />
            <span className="item-title">{user.username}</span>
            <span className="item-subtitle">{user.location || "Local"}</span>
          </Link>
        )}
      />

      <CarouselSection
        title="Student Talent"
        to="/talent"
        linkLabel={t("projects.viewAll")}
        emptyText={usersLoading ? "Loading..." : t("talent.noStudents")}
        items={usersLoading ? [] : students}
        isGuest={isGuest}
        renderItem={(user) => (
          <Link key={user.id} to={L(`/profile/${user.id}`)} className="carousel-item talent-item">
            <img src={user.profilePic} alt={user.username} />
            <span className="item-title">{user.username}</span>
            <span className="item-subtitle">{user.university || "Student"}</span>
          </Link>
        )}
      />

      {!isGuest && (
        <CarouselSection
          title={t("escrow.myEscrows")}
          to="/escrows"
          linkLabel={t("projects.viewAll")}
          emptyText={escrowsLoading ? "Loading..." : t("escrow.noEscrows")}
          items={escrowsLoading ? [] : myEscrows}
          isGuest={false}
          renderItem={(escrow) => (
            <Link key={escrow.id} to={`/escrows/${escrow.id}`} className="carousel-item escrow-item">
              <span className="item-title">{escrow.projectTitle}</span>
              <span className="item-subtitle">{escrow.studentUsername} ↔ {escrow.localUsername}</span>
              <span
                className="escrow-status"
                style={{ backgroundColor: STATUS_COLORS[escrow.status] }}
              >
                {t(`escrow.${escrow.status}`)}
              </span>
            </Link>
          )}
        />
      )}
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
  const isGuest = !currentUser;

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Postsstation</h1>
        <p>Brazos Valley Student–Local Marketplace</p>
      </div>

      {(isGuest || role === "student" || role === "local") && <SharedHome t={t} isGuest={isGuest} role={role} />}
      {role === "admin" && <AdminHome t={t} />}
    </div>
  );
};

export default Home;
