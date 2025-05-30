import "./submitEvent.scss";
import Image from "../../assets/img.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useTranslation } from "react-i18next";
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";

// Utility: get current time in HH:MM format
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

const SubmitEvent = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [poster, setPoster] = useState("");
  const [texts, setTexts] = useState({
    name: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    time: getCurrentTime(),
    description: "",
    url: ""
  });

  const [error, setError] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newEvent) => makeRequest.post("/posts/event", newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    }
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!texts.name) missingFields.push(t("events.name"));
    if (!texts.location) missingFields.push(t("events.location"));

    if (missingFields.length > 0) {
      setError(`${missingFields.join(", e")}`);
      return;
    }

    let imgUrl = "";
    if (file) imgUrl = await upload(file);

    const { name, location, date, time, description, url } = texts;

    mutation.mutate({ name, location, date, time, description, img: imgUrl, url });
    setError("");
    setFile(null);
    setTexts({
      name: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      time: getCurrentTime(),
      description: "",
      url: ""
    });
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  useEffect(() => {
    console.log("SubmitEvent file state:", file);
    if (file && file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        setPoster(canvas.toDataURL("image/jpeg"));
      };
    } else {
      setPoster("");
    }
  }, [file]);

  return (
    <div className="submit-event">
      {!currentUser ? (
        <div />
      ) : (
        <div className="container">
          <div className="top">
            <img src={currentUser.profilePic} alt="" />
            <h2>{t("events.submit")}</h2>
          </div>
          <form>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
              placeholder={t("events.name")}
            />
            <input
              type="date"
              value={texts.date || ""}
              name="date"
              onChange={handleChange}
              placeholder={t("events.date")}
            />
            <input
              type="time"
              value={texts.time || ""}
              name="time"
              onChange={handleChange}
              placeholder={t("events.time")}
            />
            <input
              type="text"
              value={texts.location}
              name="location"
              onChange={handleChange}
              placeholder={t("events.location")}
            />
            <input
              type="text"
              value={texts.description}
              name="description"
              onChange={handleChange}
              placeholder={t("events.description")}
            />
            <input
              type="text"
              value={texts.url}
              name="url"
              onChange={handleChange}
              placeholder={t("events.url")}
            />
          </form>
          <div className="middle">
            {file && (
              <>
                {file.type.startsWith("image/") ? (
                  <div className="fileContainer">
                    <button className="x" style={{ marginLeft: 300 }} onClick={() => setFile("")}>
                      <DisabledByDefault style={{ color: "gray" }} />
                    </button>
                    <img className="file" alt="" src={URL.createObjectURL(file)} />
                  </div>
                ) : (
                  <div className="fileContainer">
                    <button className="x" style={{ marginLeft: 300 }} onClick={() => setFile("")}>
                      <DisabledByDefault style={{ color: "gray" }} />
                    </button>
                    <video
                      className="file"
                      controls
                      playsInline
                      muted
                      preload="metadata"
                      poster={poster}
                      style={{ width: "100%", height: "auto" }}
                    >
                      <source src={URL.createObjectURL(file)} type={"video/mp4"} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </>
            )}
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <input
                type="file"
                id="file-event"
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg, .mp4, .mp3, .mov, .m4a"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file">
                <div className="item">
                  <img src={Image} alt="" />
                  <span>{t("share.add")}</span>
                </div>
              </label>
            </div>
            <div className="right">
              <button onClick={handleClick}>{t("share.post")}</button>
            </div>
          </div>
          {error && <span className="error-msg">{t("events.error")} {error}</span>}
        </div>
      )}
    </div>
  );
};

export default SubmitEvent;
