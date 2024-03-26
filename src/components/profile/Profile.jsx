import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import Update from "../../components/update/Update"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useTranslation } from "react-i18next";

const Profile = ({userId}) => {

  const { t } = useTranslation();
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => makeRequest.get("/users/find/" + userId).then((res) => {return res.data})
  });
  
  const { isLoading: rIsLoading, error: rError, data: relationshipData} = useQuery({
    queryKey: ["relationship"],
    queryFn: () => makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {return res.data})
  });

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"]);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  }
  
  return (
    <div className="profile">
      {isLoading || !data || error || userId === undefined ? "loading" :
        <div>
          <div className="images">
            <img
              src={data.coverPic}
              alt=""
              className="cover"
            />
            <img
              src={data.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">             
              <div className="center">
                <div className="name">
                  <span>{data.name}</span>
                </div>
                {data.account_type === 'admin' && 
                  <div className="business-type">Admin</div>
                }
                {data.account_type === 'business' && data.business_type != null &&
                  <div className="business-type"> 
                    {data.business_type}
                  </div>
                }
                <div className="bio"> 
                  {data.bio}
                </div>
                <div className="left">
                  {data.facebook != null && 
                    <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                        <FacebookTwoToneIcon fontSize="medium" />
                    </a>
                  }
                  {data.instagram != null && 
                    <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon fontSize="medium" />
                    </a>
                  }
                  {data.twitter != null && 
                    <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon fontSize="medium" />
                    </a>
                  }
                </div>
                <div className="info">
                  {data.city &&
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  }
                  {data.website &&
                  <div className="item">
                    <a href={data.website} color={"grey"} target="_blank" rel="noopener noreferrer">
                      <InsertLinkIcon fontSize="medium" />
                      <span>{data.website}</span>
                    </a>
                  </div>}
                  {data.language &&
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.language}</span>
                  </div>
                  }
                </div>
                {rIsLoading || rError ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={()=>setOpenUpdate(true)}>{t('update.update')}</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? t('users.following')
                      : t('users.follow')}
                  </button>
                )}
              </div>
            </div>
            <Posts userId={userId}/>
          </div>
        </div>
      }
      {openUpdate && <Update setOpenUpdate = {setOpenUpdate} user={data}/>}
    </div>
  );
};

export default Profile;
