import "./submitJob.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { Dropdown } from 'react-nested-dropdown';
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";
import { useTranslation } from "react-i18next";

const SubmitJob = () => {
  const [category, setCategory] = useState(null);
  const [file,setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const { t, i18n } = useTranslation();

  const [texts, setTexts] = useState({
      name: "",
      pay: "",
      schedule: "",
      // startDate: "",
      // employer: "",
      location: "",
      description: "",
      contact: "",
  });

  const items = [
    {
      label: t('categories.general'),
      onSelect: () => setCategory("general"),
    },
    {
      label: t('categories.construction'),
      onSelect: () => setCategory("construction"),
    },
    {
      label: t('jobs.gardening'),
      onSelect: () => setCategory("gardener"),
    },
    {
      label: t('jobs.house'),
      onSelect: () => setCategory("housekeeping"),
    },
    {
        label: t('categories.general'),
        onSelect: () => setCategory("janitor"),
    },
    {
        label: t('jobs.restaurant'),
        onSelect: () => setCategory("restaurant"),
    },
  ];

  const [error, setError] = useState(null);

  const {currentUser} = useContext(AuthContext);
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newJob)=>{
      return makeRequest.post("/posts/job", newJob);
    },
    onSuccess:
    () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["jobs"]);
      },
  });

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
    if (texts.name == "" || category == null || texts.pay == "" || texts.schedule == "" || texts.location == "" || texts.contact == "") {
      setError(true);
      return;
    }
    let imgUrl = "";
    if (file) imgUrl = await upload();
    let name = texts.name;
    let location = texts.location;
    // let start_date = texts.startDate;
    let description = texts.description;
    let contact = texts.contact;
    let pay = texts.pay;
    let schedule = texts.schedule;
    // let employer = texts.employer;
    mutation.mutate({ name, location, description, img: imgUrl, contact, pay, schedule, category});
    setError(false);
    setFile(null);
    setCategory(null);
    setTexts({
      name: "",
      pay: "",
      schedule: "",
      // startDate: "",
      // employer: "",
      location: "",
      description: "",
      contact: ""
    });
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  return (
    <div className="submit-job">
      <div className="container">
        <div className="top">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <h2>{t('jobs.post')}</h2>
        </div>
        <form>
            <div className="row">
                <label>{t('jobs.type')}</label>
                <Dropdown items={items} containerWidth="200px">
                    {({ isOpen, onClick }) => (
                        <button type="button" onClick={onClick} className={"dropdown"}>
                        {category === null ? "Select" : category}
                        </button>
                    )}
                </Dropdown>
            </div>
            <div className="row">
              <label>{t('jobs.name')}</label>
              <input
                type="text"
                value={texts.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('jobs.pay')}</label>
              <input
                type="text"
                value={texts.pay}
                name="pay"
                onChange={handleChange}
              />
            </div>
            <div className="row">
                <label>{t('jobs.schedule')}</label>
                <input
                type="text"
                value={texts.schedule}
                name="schedule"
                onChange={handleChange}
                />
            </div>
            {/* <div className="row">
                <label>Desired Start Date</label>
                <input
                type="date"
                value={texts.startDate}
                name="startDate"
                onChange={handleChange}
                />
            </div>
            <div className="row">
              <label>Employer Name</label>
              <input
                type="text"
                value={texts.employer}
                name="employer"
                onChange={handleChange}
              />
            </div> */}
            <div className="row">
              <label>{t('jobs.location')}</label>
              <input
                type="text"
                value={texts.location}
                name="location"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('jobs.description')}</label>
              <input
                type="text"
                value={texts.description}
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>{t('jobs.contact')}</label>
              <input
                type="text"
                value={texts.contact}
                name="contact"
                onChange={handleChange}
              />
            </div>
        </form>
        <div className="middle">
          {file && (
            <>
              <button className="x" style={{marginLeft: 300}} onClick={()=>setFile(null)}>
                <DisabledByDefault style={{color: 'gray'}}/>
              </button>
              {file.type.startsWith("image/") ? (
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              ) : (
                <video className="file" controls>
                  <source src={URL.createObjectURL(file)} type={"video/mp4"} />
                  Your browser does not support the video tag.
                </video>
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
          </div>
        </div>
        {error && <span className="error-msg">{t('jobs.error')}</span>}
      </div>
    </div>
  );
};

export default SubmitJob;
