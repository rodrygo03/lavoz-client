import "./submitService.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useTranslation } from "react-i18next";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

const SubmitService = ({ onClose }) => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [texts, setTexts] = useState({
    title: "",
    description: "",
    skills: "",
    availability: "",
  });
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(false);
  };

  const [serverError, setServerError] = useState(null);

  const mutation = useMutation({
    mutationFn: (service) => makeRequest.post("/services", service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setTexts({ title: "", description: "", skills: "", availability: "" });
      setServerError(null);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        if (onClose) onClose();
      }, 2000);
    },
    onError: (err) => {
      setServerError(err?.response?.data || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texts.title.trim() || !texts.description.trim()) {
      setError(true);
      return;
    }
    mutation.mutate(texts);
  };

  return (
    <div className="submit-service">
      <div className="wrapper">
        <h2>{t("services.post")}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={texts.title}
            onChange={handleChange}
            placeholder={t("services.titleField")}
          />
          <textarea
            name="description"
            value={texts.description}
            onChange={handleChange}
            placeholder={t("services.descField")}
            rows={3}
          />
          <input
            type="text"
            name="skills"
            value={texts.skills}
            onChange={handleChange}
            placeholder={t("services.skillsPlaceholder")}
          />
          <input
            type="text"
            name="availability"
            value={texts.availability}
            onChange={handleChange}
            placeholder={t("services.availabilityPlaceholder")}
          />
          {error && <span className="error-msg">{t("services.error")}</span>}
          {serverError && <span className="error-msg">{serverError}</span>}
          {submitted && <span className="success-msg">Service posted!</span>}
          <div className="footer">
            <button type="submit" disabled={mutation.isPending}>
              {t("share.post")}
            </button>
          </div>
        </form>
        {onClose && (
          <button className="close" onClick={onClose}>
            <DisabledByDefaultIcon style={{ color: "red" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SubmitService;
