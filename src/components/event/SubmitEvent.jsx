import "./submitEvent.scss";
import Image from "../../assets/img.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useTranslation } from "react-i18next";
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";

const SubmitEvent = () => {
  const { t } = useTranslation();
  const [file,setFile] = useState(null);
  const [poster, setPoster] = useState("");
  const [texts, setTexts] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    description: "",
    file: ""
  });

  const [error, setError] = useState(null);

  const {currentUser} = useContext(AuthContext);
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newEvent)=>{
      return makeRequest.post("/posts/event", newEvent);
    },
    onSuccess:
    () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["events"]);
      },
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
    if (!texts.name || !texts.location || !texts.date || !texts.time ) {
      setError(true);
      return;
    }
    let imgUrl = "";
    if (file) imgUrl = await upload(file);
    let name = texts.name;
    let location = texts.location;
    let date = texts.date;
    let time = texts.time;
    let description = texts.description;
    let url = texts.url;
    mutation.mutate({ name, location, date, time, description, img: imgUrl, url});
    setError(false);
    setFile(null);
    setTexts({
      name: "",
      location: "",
      date: "",
      time: "",
      description: "",
      file: ""
    });
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  useEffect(() => {
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
      {!currentUser ?
        <div/>
      :
      <div className="container">
      <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <h2>{t('events.submit')}</h2>
      </div>
      <form>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
            placeholder={t('events.name')}
          />
          <input
            type="date"
            value={texts.date}
            name="date"
            onChange={handleChange}
            placeholder={t('events.date')}
          />
          <input
            type="time"
            value={texts.time}
            name="time"
            onChange={handleChange}
            placeholder={t('events.time')}
          />
          <input
            type="text"
            value={texts.location}
            name="location"
            onChange={handleChange}
            placeholder={t('events.location')}
          />
          <input
            type="text"
            value={texts.description}
            name="description"
            onChange={handleChange}
            placeholder={t('events.description')}
          />
          <input
            type="text"
            value={texts.url}
            name="url"
            onChange={handleChange}
            placeholder={t('events.url')}
          />
      </form>
      <div className="middle">
        {file && (
          <>
            {file.type.startsWith("image/") ? (
              <div className="fileContainer">
                <button className="x" style={{marginLeft: 300}} onClick={() => setFile("")}>
                  <DisabledByDefault style={{color: 'gray'}}/>
                </button>
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              </div>
              
            ) : (
              <div className="fileContainer">
                <button className="x" style={{marginLeft: 300}} onClick={() => setFile("")}>
                  <DisabledByDefault style={{color: 'gray'}}/>
                </button>
                <video className="file" controls playsInline muted preload="metadata" 
<<<<<<< HEAD
                  poster={poster} 
=======
                  poster={file.type.startsWith("video/") ? URL.createObjectURL(file) : ""} 
>>>>>>> 545fe380a46a5e5b183d4c53922e7251fb117bbf
                  style={{ width: "100%", height: "auto" }}>
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
            id="file"
            style={{ display: "none" }}
            accept=".png, .jpg, .jpeg, .mp4, .mp3, .mov, .m4a"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <div className="item">
              <img src={Image} alt="" />
              <span>{t('share.add')}</span>
            </div>
          </label>
        </div>
        <div className="right">
          <button onClick={handleClick}>{t('share.post')}</button>
          console.log("SubmitEvent component is loaded");


        </div>
      </div>
      {error && <span className="error-msg">{t('jobs.error')}</span>}
    </div>
    }
    </div>
  );
};

export default SubmitEvent;