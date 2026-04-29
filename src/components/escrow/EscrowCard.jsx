import "./escrowCard.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { STATUS_COLORS } from "../../utils/escrowStatus";
import moment from "moment";

const EscrowCard = ({ escrow }) => {
  const { t } = useTranslation();

  const statusLabel = t(`escrow.${escrow.status}`) || escrow.status;

  return (
    <Link to={`/escrows/${escrow.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="escrow-card">
        <div className="card-top">
          <span
            className="status-badge"
            style={{ backgroundColor: STATUS_COLORS[escrow.status] || "#888" }}
          >
            {statusLabel}
          </span>
          <h3>{escrow.projectTitle}</h3>
        </div>

        <div className="card-body">
          <div className="row">
            <span className="label">{t("escrow.student")}:</span>
            <span>{escrow.studentUsername}</span>
          </div>
          <div className="row">
            <span className="label">{t("escrow.local")}:</span>
            <span>{escrow.localUsername}</span>
          </div>
          <div className="row">
            <span className="label">{t("escrow.lastUpdated")}:</span>
            <span>{moment(escrow.updatedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EscrowCard;
