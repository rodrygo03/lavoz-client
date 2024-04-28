import { useContext, useState, useEffect } from "react";
import "./comment.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import moment from "moment";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useTranslation } from 'react-i18next';
import ReactGiphySearchbox from 'react-giphy-searchbox';

const Comment = ({ comment }) => {
  const { t, i18n } = useTranslation();
  const [rateOpen, setRatingOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [faceShown, setFaceShown] = useState(false);
  const [submitGreen, setSubmitGreen] = useState(false);
  const [rated, setRated] = useState(false);
  const [stars, setStars] = useState(0);

  const HandleStarPress = (id) => {
    setStars(id);
    setFaceShown(true);
    const commentId = comment.id;
    mutation.mutate(stars, commentId);
  };

  const handleRate = () => {
    setSubmitGreen(true);
    mutation.mutate(stars);
    setStars(0);
    setRatingOpen(false);
  };

  const containerStyle = {
    height: 0,
    paddingBottom: '25%',
    position: 'relative',
    marginBottom: 10,
  };

  const iframeStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['ratings', comment.id],
    queryFn: () =>
      makeRequest.get('/ratings?commentId=' + comment.id).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (data) {
      const hasRated = data.some((rating) => rating.userId === currentUser.id);
      setRated(hasRated);
    }
  }, [data, currentUser.id]);

  const mutation = useMutation({
    mutationFn: async () => {
      const hasRated = data.some((rating) => rating.userId === currentUser.id);

      if (hasRated) {
        await makeRequest.delete('/ratings?commentId=' + comment.id);
      }

      return makeRequest.post('/ratings', { stars: stars, commentId: comment.id });
    },
    onSuccess: () => {
      setSubmitGreen(true);
      setTimeout(() => {
        setRatingOpen(false);
        setSubmitGreen(false)
      }, 2000);
      queryClient.invalidateQueries(['ratings']);
    },
  });

  return (
    <div className="comment">
      <div className="comment-content">
        <img className="pfp" src={comment.profilePic} alt="" />
        <div className="comment-info">
          <span>{comment.username}</span>
          <p>{comment.desc}</p>
        </div>
        <div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
          {isLoading ? "loading" :
          <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
            <div className="stars">
              {getAvgStarIcon(0)}
              {getAvgStarIcon(1)}
              {getAvgStarIcon(2)}
              {getAvgStarIcon(3)}
              {getAvgStarIcon(4)}
            </div>
              <span className="num-ratings">({data.length})</span>
            </div>
          }
        </div>
      </div>
        {comment.gif && 
          <div style={containerStyle}>
            <iframe
              src={comment.gif}
              width="100%"
              height="100%"
              style={iframeStyle}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
              title="Giphy Embed"
            ></iframe>
            {/* <p>
              <a href={post.gifUrl}>
                via GIPHY
              </a>
            </p> */}
          </div>
        }
        <div>
          {rateOpen ? (
            <div>
              <div className="rating">
                <button onClick={() => HandleStarPress(1)}>{getStarIcon(0)}</button>
                <button onClick={() => HandleStarPress(2)}>{getStarIcon(1)}</button>
                <button onClick={() => HandleStarPress(3)}>{getStarIcon(2)}</button>
                <button onClick={() => HandleStarPress(4)}>{getStarIcon(3)}</button>
                <button onClick={() => HandleStarPress(5)}>{getStarIcon(4)}</button>
                {faceShown && <div className="emotion">{getEmotion(stars)}</div>}
              </div>
            </div>
          ) : (
            <button className="rate-button" onClick={() => setRatingOpen(true)}>
              {t('post.rate')}
            </button>
          )}
        </div>
    </div>
  );

  function getStarIcon(id) {
    return id < stars ? <StarIcon style={{color: "d4af37"}} fontSize="small" /> : <StarBorderIcon style={{color: "d4af37"}} fontSize="small" />;
  }

  function getAvgStarIcon(id) {
    return id < getAverageRating() ? <StarIcon fontSize="xsmall" /> : <StarBorderIcon fontSize="xsmall" />;
  }

  function getEmotion(id) {
    switch (id) {
      case 1:
        return <SentimentVeryDissatisfiedIcon className="floating" />;
      case 2:
        return <SentimentDissatisfiedIcon className="floating" />;
      case 3:
        return <SentimentNeutralIcon className="floating" />;
      case 4:
        return <SentimentSatisfiedIcon className="floating" />;
      default:
        return <SentimentVerySatisfiedIcon className="floating" />;
    }
  }

  function getCheckBox() {
    return submitGreen ? (
      <button className="submit" onClick={handleRate} style={{ color: 'green' }}>
        <CheckBoxIcon fontSize="small" />
      </button>
    ) : (
      <button className="submit" onClick={handleRate}>
        <CheckBoxIcon fontSize="small" />
      </button>
    );
  }

  function getAverageRating() {
    let sum = 0;
    data.forEach((rating) => (sum += rating.value));
    return data.length === 0 ? 0 : sum / data.length;
  }
};

export default Comment;

// const Comment = ({ comment }) => {
//   const [desc, setDesc] = useState("");
//   const [rateOpen, setRatingOpen] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const [faceShown, setFaceShown] = useState(false);
//   const [submitGreen, setSubmitGreen] = useState(false);
//   const [submitShown, setSubmitShown] = useState(false);
//   const [rated, setRated] = useState(false);

//   const [stars, setStars] = useState(0);

//   const HandleStarPress = (id) => {
//     setStars(id);
//     setFaceShown(true);
//     const commentId = comment.id;
//     mutation.mutate(stars, commentId);
//     setTimeout(() => {
//       setRatingOpen(false);
//     }, 3000);
//   }
//   const getStarIcon = (id) => {
//     if (id < stars) return (<StarIcon style={{color: '#ffd300'}} fontSize="small"/>)
//     else return (<StarBorderIcon style={{color: '#ffd300'}} fontSize="small"/>)
//   }
//   const getAvgStarIcon = (id) => {
//     if (id < getAverageRating()) return (<StarIcon fontSize="xsmall"/>)
//     else return (<StarBorderIcon fontSize="xsmall"/>)
//   }
//   const getEmotion = (id) => {
//     if (id === 1) return (<SentimentVeryDissatisfiedIcon className="floating"/>)
//     else if (id === 2) return (<SentimentDissatisfiedIcon className="floating"/>)
//     else if (id === 3) return (<SentimentNeutralIcon className="floating"/>)
//     else if (id === 4) return (<SentimentSatisfiedIcon className="floating"/>)
//     else return (<SentimentVerySatisfied className="floating"/>)
//   }
//   const getCheckBox = () => {
//     if (submitGreen) {
//       return(      
//       <button className="submit" onClick={handleRate} style={{color: "green"}}>
//         <CheckBoxIcon fontSize="small"/>
//       </button> 
//       ) 
//     }
//     else {
//       return(      
//         <button className="submit" onClick={handleRate}>
//           <CheckBoxIcon fontSize="small"/>
//         </button> 
//       )       
//     }
//   }

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["ratings", comment.id],
//     queryFn: () => makeRequest.get("/ratings?commentId=" + comment.id).then((res) => {return res.data})
//   });

//   const handleRate = () => {
//     setSubmitGreen(true);
//     mutation.mutate(stars);
//     setStars(0);
//     setTimeout(() => {
//       setRatingOpen(false);
//     }, 1000);
//   };

//   console.log(data);

//   const mutation = useMutation({
//     mutationFn: () => {
//       data.map((rating) => {
//         if (rating.userId === currentUser.id) setRated(true)
//       });

//       if (rated) {
//         makeRequest.delete("/ratings?commentId=" + comment.id);
//       }

//       return makeRequest.post("/ratings", { stars: stars, commentId: comment.id });
//     },
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries(["ratings"]);
//     },
//   });

//   const getAverageRating = () => {
//     let sum = 0;
//     data.map((rating) => sum += rating.value);
//     if (data?.length === 0) return 0
//     const avg = sum/data?.length;
//     return avg
//   }
  
//   return (
//     <div className="comment">
//       <img src={comment.profilePic} alt="" />
//       <div className="comment-info">
//         <span>{comment.name}</span>
//         <p>{comment.desc}</p> 
//         {rateOpen? 
//           <div>
//           <div className = "rating">
//             <div className="stars">
//               <button 
//                 onClick={() => { HandleStarPress(1) }}>
//                 {getStarIcon(0)}
//               </button>
//               <button onClick={() => { HandleStarPress(2) }}>
//                 {getStarIcon(1)}
//               </button>
//               <button onClick={() => { HandleStarPress(3) }}>
//                 {getStarIcon(2)}
//               </button>
//               <button onClick={() => { HandleStarPress(4) }}>
//                 {getStarIcon(3)}
//               </button>
//               <button onClick={() => { HandleStarPress(5) }}>
//                 {getStarIcon(4)}
//               </button>
//             </div>
//             {faceShown ? 
//             <div className = "emotion">
//               {getEmotion(stars)}
//             </div>
//             : ""
//             }
//             {/* {getCheckBox()} */}
//           </div>
          
//           </div>
//         :
//         <button className="rate-button" onClick={() => setRatingOpen(true)}>rate</button> 
//         }
//       </div>
//       <div>
//         <span className="date">
//           {moment(comment.createdAt).fromNow()}
//         </span>
//         {isLoading ? "loading" :
//           <div className="stars">
//             {getAvgStarIcon(0)}
//             {getAvgStarIcon(1)}
//             {getAvgStarIcon(2)}
//             {getAvgStarIcon(3)}
//             {getAvgStarIcon(4)}
//           </div>
//         }
        
//       </div>
//     </div>
//   )
// };

// export default Comment;
