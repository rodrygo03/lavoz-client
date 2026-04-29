import "./escrowDetail.scss";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { ESCROW_STATUS, STATUS_COLORS } from "../../utils/escrowStatus";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Comments from "../../components/comments/Comments";

const extractError = (err, fallback) => {
  const data = err?.response?.data;
  return typeof data === "string" ? data : data?.message || data?.error || fallback;
};

const EscrowDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { isLoading, error, data: escrow } = useQuery({
    queryKey: ["escrow", id],
    queryFn: () => makeRequest.get(`/escrows/${id}`).then((res) => res.data),
  });

  const { data: artifacts } = useQuery({
    queryKey: ["artifacts", id],
    queryFn: () => makeRequest.get(`/artifacts/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  // Use the most recent artifact (backend returns newest first)
  const artifact = artifacts?.[0] ?? null;

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["escrow", id] });
    queryClient.invalidateQueries({ queryKey: ["artifacts", id] });
  };

  const upload = async (f) => {
    const formData = new FormData();
    formData.append("file", f);
    const res = await makeRequest.post("/upload", formData);
    return res.data;
  };

  const submitMutation = useMutation({
    mutationFn: async (payload) => makeRequest.post(`/escrows/${id}/submit`, payload),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["escrows", "me"] });
      setDesc("");
      setFile(null);
      setSubmitError(null);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    },
    onError: (err) => setSubmitError(extractError(err, "Submission failed.")),
  });

  const approveMutation = useMutation({
    mutationFn: () => makeRequest.put(`/escrows/${id}/complete`),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["escrows", "me"] });
    },
    onError: (err) => setSubmitError(extractError(err, "Action failed.")),
  });

  const requestChangesMutation = useMutation({
    mutationFn: () => makeRequest.put(`/escrows/${id}/reopen`),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["escrows", "me"] });
    },
    onError: (err) => setSubmitError(extractError(err, "Action failed.")),
  });

  const acceptMutation = useMutation({
    mutationFn: () => makeRequest.put(`/escrows/${id}/accept`),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["escrows", "me"] });
    },
    onError: (err) => setSubmitError(extractError(err, "Action failed.")),
  });

  const declineMutation = useMutation({
    mutationFn: () => makeRequest.put(`/escrows/${id}/cancel`),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["escrows", "me"] });
    },
    onError: (err) => setSubmitError(extractError(err, "Action failed.")),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desc.trim()) {
      setSubmitError(t("escrow.submitError"));
      return;
    }
    let fileUrl = null;
    if (file) fileUrl = await upload(file);
    submitMutation.mutate({ description: desc, fileUrl });
  };

  const isStudent = currentUser?.id === escrow?.studentId;
  const isLocal   = currentUser?.id === escrow?.localId;

  const statusOrder = [
    ESCROW_STATUS.PENDING,
    ESCROW_STATUS.ACTIVE,
    ESCROW_STATUS.SUBMITTED,
    ESCROW_STATUS.COMPLETED,
  ];

  if (isLoading) return <div className="escrow-detail"><span className="state">Loading...</span></div>;
  if (error || !escrow) return <div className="escrow-detail"><span className="state">Escrow not found.</span></div>;

  return (
    <div className="escrow-detail">
      <div className="back-row">
        <Link to="/escrows" style={{ textDecoration: "none", color: "inherit" }}>
          <ArrowBackIcon fontSize="small" />
          <span>{t("escrow.backToEscrows")}</span>
        </Link>
      </div>

      <div className="detail-card">
        {/* Header */}
        <div className="card-header">
          <span
            className="status-badge"
            style={{ backgroundColor: STATUS_COLORS[escrow.status] || "#888" }}
          >
            {t(`escrow.${escrow.status}`)}
          </span>
          <h1>{escrow.projectTitle}</h1>
          <div className="parties">
            <span>{t("escrow.student")}: <strong>{escrow.studentUsername}</strong></span>
            <span>·</span>
            <span>{t("escrow.local")}: <strong>{escrow.localUsername}</strong></span>
          </div>
          {escrow.projectId && (
            <Link to={`/projects/${escrow.projectId}`} className="view-project-link">
              {t("escrow.viewProject")} →
            </Link>
          )}
        </div>

        {/* Status Timeline */}
        <div className="section">
          <h3>{t("escrow.timeline")}</h3>
          <div className="timeline">
            {statusOrder.map((s) => {
              const reached = statusOrder.indexOf(escrow.status) >= statusOrder.indexOf(s)
                && escrow.status !== ESCROW_STATUS.CANCELLED;
              const isCurrent = escrow.status === s;
              return (
                <div key={s} className={`step ${reached ? "reached" : ""} ${isCurrent ? "current" : ""}`}>
                  <div className="dot" style={isCurrent ? { backgroundColor: STATUS_COLORS[s] } : {}} />
                  <span>{t(`escrow.${s}`)}</span>
                </div>
              );
            })}
            {escrow.status === ESCROW_STATUS.CANCELLED && (
              <div className="step reached current">
                <div className="dot" style={{ backgroundColor: STATUS_COLORS.cancelled }} />
                <span>{t("escrow.cancelled")}</span>
              </div>
            )}
          </div>
          <p className="updated-at">
            {t("escrow.lastUpdated")}: {moment(escrow.updatedAt).format("MMM D, YYYY h:mm A")}
          </p>
        </div>

        {/* Student — accept or decline when pending */}
        {isStudent && escrow.status === ESCROW_STATUS.PENDING && (
          <div className="section">
            <p className="artifact-desc">{t("escrow.pendingMsg")}</p>
            {submitError && <span className="error-msg">{submitError}</span>}
            <div className="action-row">
              <button
                className="approve-btn"
                onClick={() => acceptMutation.mutate()}
                disabled={acceptMutation.isPending}
              >
                {t("escrow.accept")}
              </button>
              <button
                className="changes-btn"
                onClick={() => declineMutation.mutate()}
                disabled={declineMutation.isPending}
              >
                {t("escrow.decline")}
              </button>
            </div>
          </div>
        )}

        {/* Student — submit deliverable when active */}
        {isStudent && escrow.status === ESCROW_STATUS.ACTIVE && (
          <div className="section">
            <h3>{t("escrow.submitDeliverable")}</h3>
            <form className="submit-form" onSubmit={handleSubmit}>
              <textarea
                rows={4}
                value={desc}
                onChange={(e) => { setDesc(e.target.value); setSubmitError(null); }}
                placeholder={t("escrow.descriptionPlaceholder")}
              />
              <label className="file-label" htmlFor="artifact-file">
                <CloudUploadIcon fontSize="small" />
                <span>{file ? file.name : t("share.add")}</span>
              </label>
              <input
                id="artifact-file"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.zip,.mp4,.mov,.js,.ts,.jsx,.tsx,.py,.java,.c,.cpp,.cs,.html,.css,.scss,.json,.md,.txt,.rb,.go,.rs,.php,.swift,.kt,.sql"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {submitError && <span className="error-msg">{submitError}</span>}
              {submitSuccess && <span className="success-msg">{t("escrow.submitSuccess")}</span>}
              <button type="submit" disabled={submitMutation.isPending}>
                {submitMutation.isPending ? t("escrow.submitting") : t("escrow.submitBtn")}
              </button>
            </form>
          </div>
        )}

        {/* Local — review submitted artifact */}
        {isLocal && escrow.status === ESCROW_STATUS.SUBMITTED && (
          <div className="section">
            <h3>{t("escrow.artifact")}</h3>
            {artifact ? (
              <>
                <p className="artifact-desc">{artifact.description}</p>
                {artifact.fileUrl && (
                  <a
                    className="artifact-link"
                    href={artifact.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download / View ↗
                  </a>
                )}
                {submitError && <span className="error-msg">{submitError}</span>}
                <div className="action-row">
                  <button
                    className="approve-btn"
                    onClick={() => approveMutation.mutate()}
                    disabled={approveMutation.isPending}
                  >
                    {t("escrow.approve")}
                  </button>
                  <button
                    className="changes-btn"
                    onClick={() => requestChangesMutation.mutate()}
                    disabled={requestChangesMutation.isPending}
                  >
                    {t("escrow.requestChanges")}
                  </button>
                </div>
              </>
            ) : (
              <span className="state">{t("escrow.noArtifact")}</span>
            )}
          </div>
        )}

        {/* Show artifact to student in submitted/completed state */}
        {isStudent && [ESCROW_STATUS.SUBMITTED, ESCROW_STATUS.COMPLETED].includes(escrow.status) && (
          <div className="section">
            <h3>{t("escrow.artifact")}</h3>
            {artifact ? (
              <>
                <p className="artifact-desc">{artifact.description}</p>
                {artifact.fileUrl && (
                  <a
                    className="artifact-link"
                    href={artifact.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download / View ↗
                  </a>
                )}
              </>
            ) : (
              <span className="state">{t("escrow.noArtifact")}</span>
            )}
          </div>
        )}


        {/* Comments — only on completed escrows (social proof layer) */}
        {escrow.status === ESCROW_STATUS.COMPLETED && escrow.showcasePostId && (
          <div className="section">
            <Comments post={{ id: escrow.showcasePostId, userId: escrow.studentId }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EscrowDetail;
