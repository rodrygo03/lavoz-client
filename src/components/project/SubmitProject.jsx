import "./submitProject.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useTranslation } from "react-i18next";

const SubmitProject = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [texts, setTexts] = useState({
    title: "",
    description: "",
    skills: "",
    timeline: "",
    deliverables: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    makeRequest.get("/categories")
      .then((res) => {
        if (!cancelled) setCategories(res.data);
      })
      .catch(() => {
        if (!cancelled) setCategoriesError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(false);
  };

  const mutation = useMutation({
    mutationFn: (project) => makeRequest.post("/projects", project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setTexts({ title: "", description: "", skills: "", timeline: "", deliverables: "", categoryId: "" });
      setServerError(null);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
    onError: (err) => {
      const data = err?.response?.data;
      setServerError(
        typeof data === "string" ? data : data?.message || data?.error || "Something went wrong. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texts.title.trim() || !texts.description.trim() || !texts.categoryId) {
      setError(true);
      return;
    }
    mutation.mutate(texts);
  };

  return (
    <div className="submit-project">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <h2>{t("projects.post")}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={texts.title}
            onChange={handleChange}
            placeholder={t("projects.titleField")}
          />
          <textarea
            name="description"
            value={texts.description}
            onChange={handleChange}
            placeholder={t("projects.descField")}
            rows={3}
          />
          <label className="field-label" htmlFor="project-category">{t("projects.category")}</label>
          <select
            id="project-category"
            name="categoryId"
            value={texts.categoryId}
            onChange={handleChange}
            disabled={categoriesError}
          >
            <option value="">{categoriesError ? t("projects.categoriesUnavailable") : t("projects.selectCategory")}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            type="text"
            name="skills"
            value={texts.skills}
            onChange={handleChange}
            placeholder={t("projects.skillsPlaceholder")}
          />
          <input
            type="text"
            name="timeline"
            value={texts.timeline}
            onChange={handleChange}
            placeholder={t("projects.timelinePlaceholder")}
          />
          <textarea
            name="deliverables"
            value={texts.deliverables}
            onChange={handleChange}
            placeholder={t("projects.deliverablesPlaceholder")}
            rows={2}
          />
          {error && <span className="error-msg">{t("projects.error")}</span>}
          {serverError && <span className="error-msg">{serverError}</span>}
          {submitted && <span className="success-msg">Project posted!</span>}
          <div className="footer">
            <button type="submit" disabled={mutation.isPending}>
              {t("share.post")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProject;
