import "./post.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RecommendIcon from '@mui/icons-material/Recommend';
import Tamu from "../../assets/tamu_flag.png";
import Comment from "../comment/Comment";
import InputEmoji from 'react-input-emoji';
import Laugh from "../../assets/laughing.png";
import Carousel from "react-simply-carousel";
import { useTranslation } from 'react-i18next';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImageNotFound from "../../assets/img_not_found.png";
import AddGif from "@mui/icons-material/GifBox";
import ReactGiphySearchbox from 'react-giphy-searchbox';
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";

const Post = ({ post }) => {
  const { t, i18n } = useTranslation();

  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [reaction, setReaction] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const postId = post.id;
  const [rated, setRated] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [gifOpen, setGifOpen] = useState(false);
  const [gif, setGif] = useState(null);
  const navigate = useNavigate();

  const containerStyle = {
    height: 0,
    paddingBottom: '25%',
    position: 'relative',
  };

  const iframeStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then((res) => {return res.data})
  });
  const queryClient = useQueryClient();

  // Extract non-null image URLs from the post object
  const imageUrls = Object.keys(post)
  .filter(key => key.startsWith('img') && post[key] !== null)
  .map(key => post[key]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) return;
      const hasReacted = data.some((like) => like.userId === currentUser.id);

      if (hasReacted) {
        await makeRequest.delete('/likes?postId=' + post.id);
      }

      return makeRequest.post('/likes', { postId: post.id, reaction: reaction, postUserId: post.userId });
    },
    onSuccess: () => {
      // Close reactions after a short delay
      setTimeout(() => {
        setReactionsOpen(false);
      }, 800);
      queryClient.invalidateQueries(['likes']);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: () => {
      return makeRequest.delete("/likes?postId=" + post.id);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"]);
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  useEffect(() => {
    if (!currentUser) return;
    if (data && data.some((like) => like.userId === currentUser.id)) {
      const userReaction = data.find((like) => like.userId === currentUser.id).reaction;
      setReaction(userReaction);
    } else {
      setReaction(0);
    }
  }, [data, currentUser]);
  
  useEffect(() => {
    if (!currentUser) return;
    if (data) {
      const hasReacted = data.some((like) => like.userId === currentUser.id);
      setRated(hasReacted);
    }
  }, [data, currentUser]);

  const delete_from_s3 = async (img) => {
    try {
      await makeRequest.delete(`/delete/${encodeURIComponent(img)}`);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (currentUser.id === post.userId || currentUser.account_type === 'admin') {
      const img0 = post.img0;
      const img1 = post.img1;
      const img2 = post.img2;
      const img3 = post.img3;
      const img4 = post.img4;
      const img5 = post.img5;
      const img6 = post.img6;
      const img7 = post.img7;
      const img8 = post.img8;
      const img9 = post.img9;
      deleteMutation.mutate(post.id);
      if (post.img0 != null && post.img0 != "") {
        await delete_from_s3(img0);
      }
      if (post.img1 != null && post.img1 != "") {
        await delete_from_s3(img1);
      }
      if (post.img2 != null && post.img2 != "") {
        await delete_from_s3(img2);
      }
      if (post.img3 != null && post.img3 != "") {
        await delete_from_s3(img3);
      }
      if (post.img4 != null && post.img4 != "") {
        await delete_from_s3(img4);
      }
      if (post.img5 != null && post.img5 != "") {
        await delete_from_s3(img5);
      }
      if (post.img6 != null && post.img6 != "") {
        await delete_from_s3(img6);
      }
      if (post.img7 != null && post.img7 != "") {
        await delete_from_s3(img7);
      }
      if (post.img8 != null && post.img8 != "") {
        await delete_from_s3(img8);
      }
      if (post.img9 != null && post.img9 != "") {
        await delete_from_s3(img9);
      }
    }
  };

  const isImage = (url) => {
    if (url === null) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };
  
  const isVideo = (url) => {
    if (url === null) return false;
    const videoExtensions = [".mp4", ".mov", ".webp", ".mp3", ".webm", ".ogg", ".m4a"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };


  const handleSelect = (id) => {
    if (!currentUser) {
      navigate("/guest");
      return;
    }
    setReaction(id);

    if (rated) {
      // User has already reacted, delete the existing reaction
      mutation.mutate();
    } else {
      // User has not reacted, add the new reaction
      mutation.mutate();
    }

    // Close reactions after a short delay
    setTimeout(() => {
      setReactionsOpen(false);
    }, 800);
  };

  const open = (id) => {
    if (id === 0) {
      if (shareOpen === true) setShareOpen(false);
      setReactionsOpen(!reactionsOpen);
      
    }
    else {
      if (reactionsOpen === true) setReactionsOpen(false);
      setShareOpen(!shareOpen);
    }
  }

  const getReaction = () => {
    if (reaction === 0) return (<RecommendIcon className={'icon'}/>);
    else if (reaction === 1) return (<img src={`${process.env.PUBLIC_URL}/reactions/thumbs_up.png`}/>);
    else if (reaction === 2) return (<img src={`${process.env.PUBLIC_URL}/reactions/heart.png`}/>);
    else if (reaction === 3) return (<img src={`${process.env.PUBLIC_URL}/reactions/applause.png`}/>);
    else if (reaction === 4) return (<img src={`${process.env.PUBLIC_URL}/reactions/laughing.png`}/>);
    else if (reaction === 5) return (<img src={`${process.env.PUBLIC_URL}/reactions/wow.png`}/>);
    else if (reaction === 6) return (<img src={`${process.env.PUBLIC_URL}/reactions/high-five.png`}/>);
    else return (process.env.PUBLIC_URL + "/reactions/sad.png");
  }

  const getReactionText = () => {
    if (reaction === 0) return (<span>{t('reactions.reactions')}</span>);
    else if (reaction === 1) return (<span>{t('reactions.like')}</span>);
    else if (reaction === 2) return (<span>{t('reactions.love')}</span>);
    else if (reaction === 3) return (<span>{t('reactions.applause')}</span>);
    else if (reaction === 4) return (<span>{t('reactions.laughing')}</span>);
    else if (reaction === 5) return (<span>{t('reactions.wow')}</span>);
    else if (reaction === 6) return (<span>{t('reactions.highfive')}</span>);
    else return ("Triste");
  }

  const getPostReactions = (id) => {
    return data.filter((like) => like.reaction === id).length;
  };


  const url = () => {
    return `https://poststation.netlify.app/post/${post.id}`
  }

  // FOR COMMENTS 
  const handleClick = () => {
    const postId = post.id;
    const postUserId = post.userId;
    commentMutation.mutate({ desc, postId, postUserId, gif });
    setDesc("");
    setGif(null);
    setGifOpen(false);
  };

  const commentMutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments", post.id]);
    },
  });

  const { isLoading: commentsLoading, error: commentError, data: commentData } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => makeRequest.get("/comments?postId=" + postId).then((res) => {return res.data})
  });

  const displayComments = () => {
    if (!currentUser) {
      navigate("/guest");
      return; 
    }
    return(
      <div className="comments">
        <div className="write">
          <img className="pfp" src={currentUser.profilePic} alt="" />
          <InputEmoji 
            placeholder={t('post.write')} 
            value={desc}
            onChange={setDesc}
            borderRadius = {10}
          />
            <label>
              <AddGif style={{color: "gray", cursor: "pointer"}} onClick={()=>setGifOpen(!gifOpen)}/>
            </label>
          <button className="submit" onClick={handleClick}>{t('post.send')}</button>
        </div>
        {gif && 
          <div>
            <button className="x" style={{position: "relative", left: "70%"}}onClick={()=>setGif(null)}>
              <DisabledByDefault style={{color: "gray", fontSize: "medium", cursor: "pointer"}}/>
            </button>
            <div style={containerStyle}>
              <iframe
                src={gif}
                width="100%"
                height="100%"
                style={iframeStyle}
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
                title="Giphy Embed"
              ></iframe>
              {/* <p>
                <a href={gif}>
                  via GIPHY
                </a>
              </p> */}
            </div>
          </div>
        }
        {gifOpen &&
          <div className='searchbox-wrapper'>
            <ReactGiphySearchbox 
              apiKey='wTlyF2IWF5BelAJ5IdnYcy5NJPZlEW5Z' 
              onSelect={(item) => {
                setGif(item.embed_url);
                setGifOpen(false);
              }}
              masonryConfig = {[
                {columns: 2, imageWidth:110,gutter:5},
                {mq: "700px", columns: 3, imageWidth: 120, gutter: 5}
              ]}
              />
          </div>
        }
        {commentError
          ? "Something went wrong"
          : commentsLoading
          ? "loading"
          : commentData.map((comment) => (
            (<Comment comment={comment} key={comment.id} />)
          )
        )}
      </div>
    )
  }


  const getCarousel = () => {
    return(
      <div>
        <Carousel
          containerProps={{
            style: {
              justifyContent: "space-between",
              userSelect: "none",
              width: "fit-content",
              display: "flex"
            }
          }}
          userSelect={true}
          activeSlideIndex={activeSlide}
          swipeTreshold={20}
          onRequestChange={setActiveSlide}
          forwardBtnProps={{
            children: <ArrowForwardIosIcon style={{color: "gray"}}/>,
            style: {
              height: 60,
              alignSelf: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }
          }}
          backwardBtnProps={{
            children: <ArrowBackIosNewIcon style={{color: "gray"}}/>,
            style: {
              height: 60,
              alignSelf: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer"
            }
          }}
          dotsNav={{
            show: true,
            itemBtnProps: {
              style: {
                height: 14,
                width: 14,
                borderRadius: "50%",
                border: 0,
                background: "lightgray",
                marginTop: 10,
                marginRight: 2,
                marginLeft: 2
              }
            },
            activeItemBtnProps: {
              style: {
                height: 14,
                width: 14,
                borderRadius: "50%",
                border: 0,
                background: "black",
                marginTop: 10,
                marginRight: 2,
                marginLeft: 2
              }
            }
          }}
          itemsToShow={1}
          speed={400}
        >
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                width: 400,
                height: 400
              }}
            > 
            {isImage(imageUrl) ? <img className="image" src={imageUrl}/> 
            : 
            <video controls>
              <source src={imageUrl} className="video" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            }
            </div>
          ))}
        </Carousel>
      </div>
    )
  }

  const getSingleFile = () => {
    if (post.img0 === 'not-found') {
      return <img className="image" src={ImageNotFound}/>
    }
    if (isImage(post.img0)) 
      return <img className="image" src={post.img0}/>
    else if (isVideo(post.img0)) { 
      return (
        <video controls>
          <source src={post.img0} className="video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (post.userId === currentUser.id || currentUser.account_type === 'admin') && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        
        <div className="content">
          {post.desc}
          <div className="centered">
            {post.img1 === null ? getSingleFile() : getCarousel()}
            {post.flag === 1 && 
              <img className="file" src={Tamu}/>
            }
          </div>
            {post.gifUrl && 
            <div style={containerStyle}>
              <iframe
                src={post.gifUrl}
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
        </div>
        
        <div style={{display: "flex"}}>
          <div className="info" style={{width: "10%"}}>
          {reactionsOpen && 
            <div className={`reaction-container ${reactionsOpen ? 'show' : ''}`}>
              <div className='section'>
                <div className={`reaction ${reaction === 1 ? 'enlarged' : ''}`} onClick={() => handleSelect(1)}>
                  <div className="reaction-icon">
                    <img className="reaction-img" src={`${process.env.PUBLIC_URL}/reactions/thumbs_up.png`} className="reaction-img" />
                    <div className="label">{t('reactions.like')}</div>
                  </div>
                </div>
                {getPostReactions(1)}
              </div>
              <div className='section'>
                <div className={`reaction ${reaction === 2 ? 'enlarged' : ''}`} onClick={() => handleSelect(2)}>
                  <div className="reaction-icon">
                    <img src={`${process.env.PUBLIC_URL}/reactions/heart.png`} className="reaction-img" />
                    <div className="label">{t('reactions.love')}</div>
                  </div>
                </div>
                {getPostReactions(2)}
              </div>
              <div className='section'>
                <div className={`reaction ${reaction === 3 ? 'enlarged' : ''}`} onClick={() => handleSelect(3)}>
                  <div className="reaction-icon">
                    <img src={`${process.env.PUBLIC_URL}/reactions/applause.png`} className="reaction-img" />
                    <div className="label">{t('reactions.applause')}</div>
                  </div>
                </div>
                {getPostReactions(3)}
              </div>
              <div className='section'>
                <div className={`reaction ${reaction === 4 ? 'enlarged' : ''}`} onClick={() => handleSelect(4)}>
                  <div className="reaction-icon">
                    <img src={Laugh} className="reaction-img" />
                    <div className="label">{t('reactions.laughing')}</div>
                  </div>
                </div>
                {getPostReactions(4)}
              </div>
              <div className='section'>
                <div className={`reaction ${reaction === 5 ? 'enlarged' : ''}`} onClick={() => handleSelect(5)}>
                  <div className="reaction-icon">
                    <img src={`${process.env.PUBLIC_URL}/reactions/wow.png`} className="reaction-img" />
                    <div className="label">{t('reactions.wow')}</div>
                  </div>
                </div>
                {getPostReactions(5)}
              </div>
              <div className='section'>
                <div className={`reaction ${reaction === 6 ? 'enlarged' : ''}`} onClick={() => handleSelect(6)}>
                  <div className="reaction-icon">
                    <img src={`${process.env.PUBLIC_URL}/reactions/high-five.png`} className="reaction-img" />
                    <div className="label">{t('reactions.highfive')}</div>
                  </div>
                </div>
                {getPostReactions(6)}
              </div>
            </div>
          }
          </div>
          <div className="info">
            {shareOpen && 
                <div className={`my-share-container ${shareOpen ? 'show' : ''}`}>
                  <div className='section'>
                    <div className={'reaction'}>
                      <a
                        className="twitter-share-button"
                        style={{ color: "inherit" }}
                        href={`https://twitter.com/intent/tweet?text=Check%20this%20out%20on%20Poststation:&url=${encodeURIComponent(url())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TwitterIcon style={{ color: '#1d9bf0' }}/>
                        {/* TODO: FIX URL */}
                      </a>
                    </div>
                  </div>
                  <div className='section'>
                    <div className={'reaction'}>
                      <a
                        className="facebook-share-button"
                        style={{ color: "inherit" }}
                        href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookTwoToneIcon style={{ color: '#0572e6' }}/>
                        {/* TODO: FIX URL */}
                      </a>
                    </div>
                  </div>
                  <div className='section'>
                    <div className={'reaction'}>
                      {post.img0 != null && 
                      <a style={{color: "inherit"}}
                        href={`https://pinterest.com/pin/create/bookmarklet/?media=${encodeURIComponent(post.img0)}&url=${encodeURIComponent(url())}&is_video=${encodeURIComponent(isVideo(post.img0))}&description=${encodeURIComponent(post.desc)}`} target="_blank" rel="noopener noreferrer">
                      </a>}
                        <PinterestIcon style={{color: "#e60023"}}/>
                        {/* TODO: FIX URL */}
                    </div>
                  </div>
                  <div className='section'>
                    <div className={'reaction'}>
                      <a style={{color: "inherit"}}
                        href={`https://api.whatsapp.com/send?text=Check%20this%20out%20on%20PostStation%20${encodeURIComponent(url())}`} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon style={{backgroundColor: "#38d672", padding: 1, borderRadius: 10, color: 'white'}}/>
                        {/* TODO: FIX URL */}
                      </a>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="info">
          <div className="item"
            onClick={() => open(0)}
          >
            {isLoading ? ("loading") : 
            <div className="item"> 
            {/* <img src={getReaction(data)} className={'icon'}/> */}
            {getReaction(data)}
            {getReactionText(data)}
            </div>
            }
          </div>
          {commentError || commentsLoading ? "loading"
          :
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentData.length} 
            {commentData.length === 1 ? t('post.comment') : t('post.comment')+'s'}
          </div>
          }
          <div className="item" onClick={() => open(1)}>
            <ShareOutlinedIcon />
            {t('post.share')}
          </div>
        </div>
        {commentOpen && displayComments()}
      </div>
    </div>
  );
};

export default Post;
