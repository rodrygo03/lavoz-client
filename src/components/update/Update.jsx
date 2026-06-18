import { useState, useContext } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user, first }) => {
    const { t, i18n } = useTranslation();
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const { updateUser, currentUser } = useContext(AuthContext);
    const [texts, setTexts] = useState({
      email: user.email,
      phone: user.phone || '',
      password: user.password,
      username: user.username,
      city: user.city,
      website: user.website,
      language: user.language,
      bio: user.bio,
      account_type: user.account_type,
      skills: user.skills || '',
      university: user.university || '',
      major: user.major || '',
      grad_year: user.grad_year || '',
      org_name: user.org_name || '',
      org_type: user.org_type || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const id = currentUser.id;
  
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
  
    const handleChange = (e) => {
      setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      setIsSubmitting(true);

      try {
        let coverUrl = cover ? await upload(cover) : user.coverPic;
        let profileUrl = profile ? await upload(profile) : user.profilePic;

        await mutation.mutateAsync({
          ...texts,
          coverPic: coverUrl,
          profilePic: profileUrl,
        });
        let userData = {...texts, coverPic: coverUrl, profilePic: profileUrl, id: id};
        updateUser(userData);
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
        setIsSubmitting(false);
      } catch (error) {
        console.error("Profile update failed:", error.message);
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="update">
        <div className="wrapper">
          <h1>{t('update.submit')}</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span className="img-label">{t('update.cover')}</span>
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
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span className="img-label">{t('update.profilePic')}</span>
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
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <div className="row">
              <label className="pc-none">{t('update.email')}</label>
              <input
                type="text"
                value={texts.email}
                name="email"
                onChange={handleChange}
                placeholder={t('update.email')}
              />
            </div>

            <div className="row">
              <label className="pc-none">{t('update.phone')}</label>
              <input
                type="tel"
                value={texts.phone}
                name="phone"
                onChange={handleChange}
                placeholder={t('update.phone')}
              />
            </div>

            <div className="row">
              <label className="pc-none">{t('login.username')}</label>
              <input
                type="text"
                value={texts.username}
                name="name"
                onChange={handleChange}
                placeholder={t('login.username')}
              />
            </div>

            <div className="row">
            <label className="pc-none">{t('update.password')}</label>
              <input
                type="password"
                value={texts.password}
                name="password"
                onChange={handleChange}
                placeholder={t('update.password')}
              />
            </div>
            <div className='row'>
              <label className="pc-none">{t('update.bio')}</label>
              <input
                type="text"
                value={texts.bio}
                name="bio"
                onChange={handleChange}
                placeholder={t('update.bio')}
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
              <label className="pc-none">{t('update.website')}</label>
              <input
                type="text"
                name="website"
                value={texts.website}
                onChange={handleChange}
                placeholder={t('update.website')}
              />
            </div>
            {user.account_type === 'student' && <>
              <div className="row">
                <label className="pc-none">{t('update.skills')}</label>
                <input
                  type="text"
                  name="skills"
                  value={texts.skills}
                  onChange={handleChange}
                  placeholder={t('update.skillsPlaceholder')}
                />
              </div>
              <div className="row">
                <label className="pc-none">{t('update.university')}</label>
                <select name="university" value={texts.university} onChange={handleChange}>
                  <option value="">{t('update.selectUniversity')}</option>
                  <option value="Texas A&M University">Texas A&M University</option>
                  <option value="Blinn College">Blinn College</option>
                </select>
              </div>
              <div className="row">
                <label className="pc-none">{t('update.major')}</label>
                <input
                  type="text"
                  name="major"
                  value={texts.major}
                  onChange={handleChange}
                  placeholder={t('update.major')}
                />
              </div>
              <div className="row">
                <label className="pc-none">{t('update.gradYear')}</label>
                <input
                  type="text"
                  name="grad_year"
                  value={texts.grad_year}
                  onChange={handleChange}
                  placeholder={t('update.gradYearPlaceholder')}
                />
              </div>
            </>}

            {user.account_type === 'local' && <>
              <div className="row">
                <label className="pc-none">{t('update.orgName')}</label>
                <input
                  type="text"
                  name="org_name"
                  value={texts.org_name}
                  onChange={handleChange}
                  placeholder={t('update.orgNamePlaceholder')}
                />
              </div>
              <div className="row">
                <label className="pc-none">{t('update.orgType')}</label>
                <select name="org_type" value={texts.org_type} onChange={handleChange}>
                  <option value="">{t('update.selectOrgType')}</option>
                  <option value="Business">{t('update.orgTypeBusiness')}</option>
                  <option value="Non-profit">{t('update.orgTypeNonprofit')}</option>
                  <option value="Resident">{t('update.orgTypeResident')}</option>
                </select>
              </div>
            </>}

            {/* <span className = "description">{t('update.msg')}</span> */}
            <button onClick={handleClick} disabled={isSubmitting}> {!isSubmitting ? t('update.update') : t('update.updating') } </button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            <DisabledByDefaultIcon style={{color: "red"}}/>
          </button>
        </div>
      </div>
    );
  };
  
  export default Update;