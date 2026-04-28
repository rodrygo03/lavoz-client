import "./browseTalent.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import ServiceCard from "../../components/service/ServiceCard";
import { useTranslation } from "react-i18next";

const BrowseTalent = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("students");
  const [search, setSearch] = useState("");

  const { isLoading: usersLoading, error: usersError, data: users } = useQuery({
    queryKey: ["talentUsers"],
    queryFn: () => makeRequest.get("/users/").then((res) => res.data),
  });

  const { isLoading: servicesLoading, error: servicesError, data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => makeRequest.get("/services").then((res) => res.data),
  });

  const students = users
    ? users.filter((u) => u.account_type === "student")
    : [];

  const filtered = students.filter((u) => {
    const q = search.toLowerCase();
    const nameMatch = u.username.toLowerCase().includes(q);
    const skillMatch = u.skills ? u.skills.toLowerCase().includes(q) : false;
    return nameMatch || skillMatch;
  });

  const skills = (user) =>
    user.skills ? user.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <div className="browse-talent">
      <div className="header">
        <h1>{t("talent.browse")}</h1>
      </div>

      <div className="content">
        <div className="tabs">
          <button
            className={tab === "students" ? "tab selected" : "tab"}
            onClick={() => setTab("students")}
          >
            {t("talent.students")}
          </button>
          <button
            className={tab === "services" ? "tab selected" : "tab"}
            onClick={() => setTab("services")}
          >
            {t("talent.services")}
          </button>
        </div>

        {tab === "students" && (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder={t("talent.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {usersLoading && <span className="state">Loading...</span>}
            {usersError && <span className="state">Failed to load students.</span>}
            {!usersLoading && filtered.length === 0 && (
              <span className="state">{t("talent.noStudents")}</span>
            )}

            <div className="student-grid">
              {filtered.map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="student-card">
                    <img className="profilePic" src={user.profilePic} alt="" />
                    <span className="name">{user.username}</span>
                    {(user.university || user.major) && (
                      <span className="subtitle">
                        {[user.university, user.major].filter(Boolean).join(" · ")}
                      </span>
                    )}
                    {skills(user).length > 0 && (
                      <div className="skills-list">
                        {skills(user).slice(0, 3).map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                        {skills(user).length > 3 && (
                          <span className="skill-tag more">+{skills(user).length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {tab === "services" && (
          <>
            {servicesLoading && <span className="state">Loading...</span>}
            {servicesError && <span className="state">Failed to load services.</span>}
            {!servicesLoading && (!services || services.length === 0) && (
              <span className="state">{t("talent.noServices")}</span>
            )}
            <div className="service-feed">
              {services && services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseTalent;
