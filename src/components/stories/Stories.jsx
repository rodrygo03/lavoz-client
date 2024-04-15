import { useContext, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import Image from "../../assets/img.png";
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios"
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";
import { useTranslation } from "react-i18next";

const Stories = () => {
  const { t, i18n } = useTranslation();
  const {currentUser} = useContext(AuthContext);
  const [shareOpen, setShareOpen] = useState(false);
  const [file,setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => {return res.data})
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStory)=>{
      return makeRequest.post("/stories", newStory);
    },
    onSuccess:
    () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
  });

  const isVideo = (url) => {
    console.log(url);
    if (url === null) return false;
    const videoExtensions = [".mp4", ".mov", ".webp", ".mp3", ".webm", ".ogg"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const upload = async () => {
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
    setIsSubmitting(true);
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ img: imgUrl });
    setFile(null);
    setShareOpen(false);
  };

  const deleteMutation = useMutation({
    mutationFn: (storyId) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["stories"]);
    },
  });

  const delete_from_s3 = async (img) => {
    try {
      await makeRequest.delete(`/delete/${encodeURIComponent(img)}`);
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleDelete = async (e, id, image) => {
    e.preventDefault();
    deleteMutation.mutate(id);
    if (image != null && image !== "") {
      await delete_from_s3(image);
    }
  };

  return (
    <div className="stories">
      {!isLoading && data && currentUser &&
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <button className={data.length < 5 && "lower"} onClick = {() => {setShareOpen((true))}}>+</button>
      </div>
      }
      {!isLoading && data && data.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span className={data.length < 5 && "lower"}>{story.name}</span>
          {(story.userId === currentUser.id || currentUser.account_type === 'admin') && 
            <div class='x'>
              <DisabledByDefault onClick={(e) => handleDelete(e, story.id, story.image)} color='white'/>
            </div>
          }
        </div>
      ))}
      {shareOpen && 
      <div className="share">
        <div className="wrapper">
          <button className="close" onClick = {() => setShareOpen(false)}>
            <DisabledByDefault style = {{color: "red"}}/>
          </button>
          <h2>{t('story.upload')}</h2>
          <span>{t('story.desc')}</span>
          {file && (
            <>
              {file.type.startsWith("image/") ? (
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              ) : (
                <video className="file" controls>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          )}
          <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <div className="item">
              <img src={Image} alt="" />
              <span>{t('story.choose')}</span>
            </div>
          </label>
          {file && isVideo(file.name) && <span className="error-msg">{t('story.error')}</span>}
          {file && !isVideo(file.name) && <button onClick={handleClick} active={isSubmitting}> {isSubmitting ? t('share.uploading') : t('share.post') } </button>}
        </div>
      </div>
      }
    </div>
  )
}

export default Stories