import "./viral.scss"
import { useContext, useState, useEffect } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AuthContext } from "../../context/authContext";
import { Dropdown } from "react-nested-dropdown";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Embed from "../../components/embed/Embed";
import i18next from "i18next";

const Viral = () => {
  const [slide, setSlide] = useState(0);
  const currentUser = useContext(AuthContext);
  const [embedType, setEmbedType] = useState(null);
  const [link, setLink] = useState(null);
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(null);
  const [embedContent, setEmbedContent] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["embeds"],
    queryFn: () => makeRequest.get("/embeds").then((res) => {return res.data})
  });

  const items = [
    {
      label: 'TikTok',
      onSelect: () => setEmbedType("tiktok")
    },
    {
      label: 'Instagram',
      onSelect: () => setEmbedType("instagram")
    },
  ];

  const handleChange = (e) => {
    setLink((prev) => (e.target.value));
    setErr(null);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newEmbed)=>{
      return makeRequest.post("/embeds", newEmbed);
    },
    onSuccess:
    () => {
        // invalidate and refetch
        queryClient.invalidateQueries(["embeds"]);
      },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (link === null || link === "" || embedType === null) {
        setErr("All fields are required.");
        return;
    }
    mutation.mutate({ link, type: embedType });
    setErr(null);
    setLink(null);
    setEmbedType(null);
    setOpen(false);
  }

  const decrementSlide = (e) => {
    e.preventDefault();
    if (slide === 0 && data && !isLoading) {
        setSlide(data.length-1);
    }
    else if (data && !isLoading) {
        setSlide((slide-1)%data.length)
    }
  }

  return (
    <div className="viral">
        {/* <div className="background">
            <h1 className="title">Discover</h1>
            <span>Have a laugh and browse through this week's featured media.</span>
        </div> */}
        <div className="section" style={{display: "flex", justifyContent: "center", padding: 30 }}>
            {i18next.language == 'en' ? 
            <iframe width="400" height="700" src="https://rss.app/embed/v1/feed/_WFZEboCZQYPItoIQ" frameborder="0"></iframe>
            :
            <iframe width="400" height="700" src="https://rss.app/embed/v1/feed/_DMvof61NN3rH5dAj" frameborder="0"></iframe>
            }
        </div>
    </div>
  )
}

export default Viral;