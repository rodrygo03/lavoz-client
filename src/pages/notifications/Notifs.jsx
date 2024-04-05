import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import moment from 'moment';
import "./notifs.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Notification from "../../components/notification/Notification";
import { useTranslation } from "react-i18next";

const Notifs = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => makeRequest.get("/notifications/all").then((res) => {return res.data})
  });

  const notifsToday = !isLoading && data.filter(notif =>
    moment().diff(notif.createdAt, 'hours') <= 24
  );

  const notifsThisWeek = !isLoading && data.filter(notif =>
    moment().diff(notif.createdAt, 'hours') > 24 &&
    moment().diff(notif.createdAt, 'days') <= 7
  );

  const earlierNotifs = !isLoading && data.filter(notif =>
    moment().diff(notif.createdAt, 'days') > 7
  );

  return (
    <div className="notifs">
      <h2>{t('notifs.notifs')}</h2>
      <div className="section">
        <h4>{t('notifs.today')}</h4>
        {isLoading ? "isloading"
        :
        notifsToday.map((notif) => <Notification notification={notif} key={notif.id}/>)
        }
      </div>
      <div className="section">
        <h4>{t('notifs.week')}</h4>
        {isLoading ? "isloading" 
        :
        notifsThisWeek.map((notif) => <Notification notification={notif} key={notif.id}/>)
        }
      </div>
      <div className="section">
        <h4>{t('notifs.earlier')}</h4>
        {isLoading ? "isloading" 
        :
        earlierNotifs.map((notif) => <Notification notification={notif} key={notif.id}/>)
        }
      </div>
    </div>
  );
};

export default Notifs;
