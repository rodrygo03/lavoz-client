import { makeRequest } from "../../axios";
import "./firstLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Switch from '@mui/material/Switch';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";

const FirstLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('update');
  const {currentUser} = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
      email: currentUser.email,
      password: currentUser.password,
      name: currentUser.name,
      city: currentUser.city,
      website: currentUser.website,
      language: currentUser.language,
      instagram: currentUser.instagram,
      twitter: currentUser.twitter,
      facebook: currentUser.facebook,
      bio: currentUser.bio,
      business_type: currentUser.business_type,
    });
    const [checked, setChecked] = useState(currentUser.account_type === 'business');

    const handleToggle = () => {
      setChecked(!checked);
      // Update the account_type in the texts state based on the toggle
      setTexts((prev) => ({ ...prev, account_type: checked ? 'personal' : 'business' }));
    };
  
    const upload = async (file) => {
      console.log(file)
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await makeRequest.post("/upload", formData);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleChange = (e) => {
      setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };
  
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
        mutationFn: (user) => {
            return makeRequest.put("/users", currentUser);
        },
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["user"]);
        },
    });
  
    const handleClick = async (e) => {
      e.preventDefault();
    
      try {
        let coverUrl = cover ? await upload(cover) : currentUser.coverPic;
        let profileUrl = profile ? await upload(profile) : currentUser.profilePic;
    
        mutation.mutate({
          ...texts,
          coverPic: coverUrl,
          profilePic: profileUrl,
        });
        setCover(null);
        setProfile(null);
      } catch (error) {
        console.error("File upload failed:", error.message);
        // Handle the error, e.g., show a user-friendly message
      }
    };
  
    return (
      <div className="update">
        <div className="wrapper">

          <h1>{t('welcome')}</h1>
          <div className="welcome-msg">
            <span>{t('start')}</span>
            <br />
            <p className="another-msg">{t('optional')}</p>
          </div>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>{t('cover')}</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : currentUser.coverPic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                accept={"jpg, png, jpeg"}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>{t('profilePic')}</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : currentUser.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                accept={"jpg, png, jpeg"}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            {currentUser.account_type === 'business' && 
              <div className="row">
                <label>{t("business")}</label>
                <input
                  type="text"
                  name="business_type"
                  value={texts.business_type}
                  onChange={handleChange}
                />
              </div>
            }
            <div className='row'>
              <label>Bio</label>
              <input
                type="text"
                value={texts.bio}
                name="bio"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('country')}</label>
              <input
                type="text"
                name="city"
                value={texts.city}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('language')}</label>
              <input
                type="text"
                name="website"
                value={texts.website}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Facebook {t('link')}</label>
              <input
                type="text"
                name="facebook"
                value={texts.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Instagram {t('link')}</label>
              <input
                type="text"
                name="instagram"
                value={texts.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Twitter {t('link')}</label>
              <input
                type="text"
                name="twitter"
                value={texts.twitter}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Website {t('link')}</label>
              <input
                type="text"
                name="website"
                value={texts.website}
                onChange={handleChange}
              />
            </div>
          </form>
          
          <button className="continue" onClick={() => navigate("/")}>{t('start')}</button>
          
        </div>
      </div>
    );
  };
  
  export default FirstLogin;