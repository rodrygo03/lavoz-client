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
  const { t } = useTranslation();
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

    const getStarted = async (e) => {
      e.preventDefault();
      await handleClick();
      navigate("/");
    }
  
    const handleClick = async () => {
    
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

          <h1>{t('update.welcome')}</h1>
          <div className="welcome-msg">
            <span>{t('update.start')}</span>
            <br />
            <p className="another-msg">{t('update.optional')}</p>
          </div>
          <form>
            <div className="files">
              <label style={{textAlign: "center"}} htmlFor="cover">
                <span>Cover Picture</span>
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
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label  style={{textAlign: "center"}} htmlFor="profile">
                <span>Profile Picture</span>
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
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <div className="row">
              <label className="pc-none">Email</label>
              <input
                type="text"
                value={texts.email}
                name="email"
                onChange={handleChange}
                placeholder={"email"}
              />
            </div>

            <div className="row">
            <label className="pc-none">{t('update.password')}</label>
              <input
                type="password"
                value={texts.password}
                name="password"
                onChange={handleChange}
                placeholder={"Password"}
              />
            </div>
            <div className="row">
              <label className="pc-none">{t('update.name')}</label>
              <input
                type="text"
                value={texts.name}
                name="name"
                onChange={handleChange}
                placeholder={t('update.name')}
              />
            </div>
            <div className='row'>
              <label className="pc-none">Bio</label>
              <input
                type="text"
                value={texts.bio}
                name="bio"
                onChange={handleChange}
                placeholder="Bio"
              />
            </div>
            <div className="row">
              <label className="pc-none">{t('update.country')}</label>
              <input
                type="text"
                name="city"
                value={texts.city}
                onChange={handleChange}
                placeholder={t('update.country')}
              />
            </div>
            <div className="row">
              <label className="pc-none">{t('update.language')}</label>
              <input
                type="text"
                name="language"
                value={texts.language}
                onChange={handleChange}
                placeholder={t('update.language')}
              />
            </div>
            {/* <div className="row">
              <label className="pc-none">Facebook {t('update.link')}</label>
              <input
                type="text"
                name="facebook"
                value={texts.facebook}
                onChange={handleChange}
                placeholder={"Facebook"}
              />
            </div>
            <div className="row">
              <label className="pc-none">Instagram {t('update.link')}</label>
              <input
                type="text"
                name="instagram"
                value={texts.instagram}
                onChange={handleChange}
                placeholder={"Instagram"}
              />
            </div>
            <div className="row">
              <label className="pc-none">Twitter {t('update.link')}</label>
              <input
                type="text"
                name="twitter"
                value={texts.twitter}
                onChange={handleChange}
                placeholder={"Twitter"}
              />
            </div> */}
            <div className="row">
              <label className="pc-none">Website {t('update.link')}</label>
              <input
                type="text"
                name="website"
                value={texts.website}
                onChange={handleChange}
                placeholder={"Website"}
              />
            </div>
            <div className="row">
              <label>{t('update.profile')}</label>
                <Switch
                  checked={checked}
                  onChange={handleToggle}
                />
            </div>
            {checked && 
              <div className="row">
              <label className="pc-none">{t('update.business')}</label>
              <input
                type="text"
                name="business_type"
                value={texts.business_type}
                className="toggle"
                onChange={handleChange}
                placeholder={t('update.business')}
              />
              </div>
            }
            <span className = "description">{t('update.msg')}</span>
          </form>
          
          <button className="continue" onClick={getStarted}>{t('update.start')}</button>
          
        </div>
      </div>
    );
  };
  
  export default FirstLogin;