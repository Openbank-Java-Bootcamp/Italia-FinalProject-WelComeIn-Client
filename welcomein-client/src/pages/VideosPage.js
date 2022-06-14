import { useState, useEffect } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5005";

function VideosPage() {
  const [videos, setVideos] = useState();

  const getAllVideos = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
      .get(`${API_URL}/api/videos`, {
          headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setVideos(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllVideos();
  }, []);
  return (
    <div>
      <Navbar />
      {videos.map((video) => (
        <Link to={`/api/videos/${video.id}`}>
          <img src={`${video.file}`} />
          <h3>{video.name}</h3>
        </Link>
          ))}
    </div>
    )
}

export default VideosPage;