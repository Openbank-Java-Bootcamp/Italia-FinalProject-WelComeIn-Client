import { useState, useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function VideoContentPage(props) {
  const [video, setVideo] = useState([]);
// Get the URL parameter `:videoId`
const { videoId } = useParams();

// Helper function that makes a GET request to the API
// and retrieves the video by id
const getVideo = () => {
  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // Send the token through the request "Authorization" Headers
  axios
    .get(`${API_URL}/api/videos/${videoId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => setVideo(response.data))
    .catch((error) => console.log(error));
};

// We set this effect will run only once, after the initial render
// by setting the empty dependency array - []
useEffect(() => {
    getVideo();
}, []);

  return (
    <div className="VideoContentPage">
        <img 
            src={video.file}
            alt={`${video.title} File`}
            className="VideoFile"
        />
        <h2>{video.title}</h2>
        <p>{video.description}</p>
    </div>
  )
}

export default VideoContentPage;