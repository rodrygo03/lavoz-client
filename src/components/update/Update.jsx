import { useState, useContext } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Switch from '@mui/material/Switch';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
    const { t, i18n } = useTranslation();
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const { updateUser, currentUser } = useContext(AuthContext);
    const [texts, setTexts] = useState({
      email: user.email,
      password: user.password,
      name: user.name,
      city: user.city,
      website: user.website,
      language: user.language,
      instagram: user.instagram,
      twitter: user.twitter,
      facebook: user.facebook,
      bio: user.bio,
      account_type: user.account_type,
      business_type: user.business_type,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const id = currentUser.id;
    const [checked, setChecked] = useState(user.account_type == 'business');

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
            return makeRequest.put("/users", user);
        },
        onSuccess: () => {
          // Invalidate and refetch
          //updateUser(userData);
          queryClient.invalidateQueries(["user"]);
        },
    });
  
    const handleClick = async (e) => {
      e.preventDefault();
    
      try {
        let coverUrl = cover ? await upload(cover) : user.coverPic;
        let profileUrl = profile ? await upload(profile) : user.profilePic;
    
        mutation.mutate({
          ...texts,
          coverPic: coverUrl,
          profilePic: profileUrl,
        });
        let userData = {...texts, coverPic: coverUrl, profilePic: profileUrl, id: id};
        updateUser(userData);
        setOpenUpdate(false);
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
          <h1>{t('update.submit')}</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : user.coverPic
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
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : user.profilePic
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
              <label>Email</label>
              <input
                type="text"
                value={texts.email}
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="row">
            <label>{t('update.password')}</label>
              <input
                type="password"
                value={texts.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('update.name')}</label>
              <input
                type="text"
                value={texts.name}
                name="name"
                onChange={handleChange}
              />
            </div>
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
              <label>{t('update.country')}</label>
              <input
                type="text"
                name="city"
                value={texts.city}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('update.language')}</label>
              <input
                type="text"
                name="language"
                value={texts.language}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Facebook {t('update.link')}</label>
              <input
                type="text"
                name="facebook"
                value={texts.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Instagram {t('update.link')}</label>
              <input
                type="text"
                name="instagram"
                value={texts.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Twitter {t('update.link')}</label>
              <input
                type="text"
                name="twitter"
                value={texts.twitter}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Website {t('update.link')}</label>
              <input
                type="text"
                name="website"
                value={texts.website}
                onChange={handleChange}
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
              <label>{t('update.business')}</label>
              <input
                type="text"
                name="business_type"
                value={texts.business_type}
                onChange={handleChange}
              />
              </div>
            }
            <span className = "description">{t('update.msg')}</span>
            <button onClick={handleClick} disabled={isSubmitting}> {isSubmitting ? t('update.update') : t('update.updating') } </button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            <DisabledByDefaultIcon style={{color: "red"}}/>
          </button>
        </div>
      </div>
    );
  };
  
  export default Update;