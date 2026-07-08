import "./browseTalent.scss";
import { useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import ServiceCard from "../../components/service/ServiceCard";
import InviteStudent from "../../components/escrow/InviteStudent";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../hooks/useCategories";

const BrowseTalent = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState(
    searchParams.get("tab") === "services" || searchParams.get("category") ? "services" : "students"
  );
  const [search, setSearch] = useState("");
  const [inviteTarget, setInviteTarget] = useState(null); // { id, username }
  const categoryFilter = searchParams.get("category") || "";

  const isLocal = currentUser?.account_type === "local";

  const { data: categories } = useCategories();

  const { isLoading: usersLoading, error: usersError, data: users } = useQuery({
    queryKey: ["talentUsers"],
    queryFn: () => makeRequest.get("/users/").then((res) => res.data),
  });

  const { isLoading: servicesLoading, error: servicesError, data: services } = useQuery({
    queryKey: ["services", { category: categoryFilter }],
    queryFn: () =>
      makeRequest
        .get("/services", { params: categoryFilter ? { category: categoryFilter } : {} })
        .then((res) => res.data),
  });

  const handleCategoryChange = (e) => {
    const next = new URLSearchParams(searchParams);
    if (e.target.value) next.set("category", e.target.value);
    else next.delete("category");
    setSearchParams(next);
  };

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
    <>
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
                <div key={user.id} className="student-card-wrapper">
                  <Link
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
                  {isLocal && (
                    <button
                      className="invite-btn"
                      onClick={() => setInviteTarget({ id: user.id, username: user.username })}
                    >
                      {t("escrow.invite")}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "services" && (
          <>
            <div className="category-filter">
              <select value={categoryFilter} onChange={handleCategoryChange}>
                <option value="">{t("taxonomy.allCategories")}</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

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

    {inviteTarget && (
      <InviteStudent
        studentId={inviteTarget.id}
        studentUsername={inviteTarget.username}
        onClose={() => setInviteTarget(null)}
      />
    )}
    </>
  );
};

export default BrowseTalent;
