import "./short.scss";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import ShortReactions from "../reactionBar/ShortReactions";

const Short = ({ short }) => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

//   const deleteMutation = useMutation({
//     mutationFn: (jobId) => {
//       return makeRequest.delete("/posts/jobs/" + jobId);
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries(["jobs"]);
//     },
//   });

//   const delete_from_s3 = async (img) => {
//     try {
//       await makeRequest.delete(`/delete/${encodeURIComponent(img)}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }
  
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (!currentUser) return;
//     const img = job.img;
//     if (currentUser.id === job.userId || currentUser.account_type === 'admin') {
//       deleteMutation.mutate(job.id);
//       if (job.img != null && job.img != "") {
//         await delete_from_s3(img);
//       }
//     }
//   };

  return (
    <div className="short">
        <div className="container">
            <div className="content">
              <div className="centered">
                <video controls>
                    <source src={short.videoURL} className="video" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            <div className="userInfo">
                <img src={short.profilePic} alt="" />
                <div className="details">
                    <Link
                        to={`/profile/${short.userId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <span className="name">{short.username}</span>
                    </Link>
                    <span className="date">{moment(short.createdAt).fromNow()}</span>
                </div>
            </div>

            <p>{short.desc}</p>

            <div>
              <ShortReactions shortId={short.id} shortUserId={short.userId} currentUser={currentUser}/>
            </div>
        </div>
    </div>
  );
};

export default Short;
