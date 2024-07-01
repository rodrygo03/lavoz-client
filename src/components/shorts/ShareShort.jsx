import "./short.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";
import { useTranslation } from "react-i18next";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ShareShort = () => {
  const [file, setFile] = useState(null);
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newShort)=>{
      return makeRequest.post("/posts/short", newShort);
    },
    onSuccess:
        () => {
            // invalidate and refetch
            queryClient.invalidateQueries(["shorts"]);
        },
  });

  
  const getVideoDuration = async (inputFile) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        resolve(duration);
      };
      video.onerror = reject;
  
      video.src = URL.createObjectURL(inputFile);
    });
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file|| file === null) {
      setError("Please select a video. Video can be up to 30s long.");
      return;
    }
    setIsSubmitting(true);
    let imgUrl = "";
    imgUrl = await upload();
    mutation.mutate({ imgUrl, desc });
    setError(null);
    setFile(null);
    setDesc(null);
    setIsSubmitting(false);
  };

  const handleChange = async (e) => {
    const short = e.target.files[0];
    try {
        const duration = await getVideoDuration(short);
        if (duration > 30) {
            setError("Short videos must be shorter than 30 seconds.");
            return;
        }
        else {
            setFile(short);
            setError(null);
            return;
        }
    } catch (err) {
        console.error("error:", err);
    }
  }

  return (
    <div className="share-short">
      <div className="container">
        {!file ?
            <div style={{display: "flex", gap: 15, flexDirection: "column", justifyContent: "spaceBetween", alignItems: "center"}}>
                <input
                  type="file"
                  id="filefile"
                  style={{ display: "none" }}
                  accept=".mp4, .mp3, .mov, .m4a"
                  onChange={handleChange}
                />
                <label htmlFor="file">
                    <AddCircleIcon style={{cursor: "pointer", fontSize: 75}}/>
                </label>
                <span className="directions">{t("shorts.post")}</span>
            </div>
        :
            <div className="preview">
                <button className="x" style={{marginLeft: 300}} onClick={()=>setFile(null)}>
                <DisabledByDefault style={{color: 'gray'}}/>
                </button>
                <video controls>
                    <source src={URL.createObjectURL(file)} type={"video/mp4"} />
                    Your browser does not support the video tag.
                </video>
            </div>
        }
        <hr />
        <div className="bottom">
          <div className="left">
            <img
                src={currentUser.profilePic}
                alt=""
            />
            <input
                type="text" 
                placeholder={t('shorts.caption')} 
                onChange={e=>setDesc(e.target.value)} 
                value={desc}
            />
          </div>
          <div className="right">
            <button onClick={handleClick} disabled={isSubmitting}> {isSubmitting ? t('share.uploading') : t('share.post') } </button>
          </div>
        </div>
        {error != null && <span className="error-msg">{t('shorts.post')}</span>}
      </div>
    </div>
  );
};

export default ShareShort;
