import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function VideoEditPage(props) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  // Get the URL parameter `:videoId`
  const { videoId } = useParams();

  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the video id coming from URL parameter `videoId` changes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
      .get(`${API_URL}/api/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the video data coming from the response.
          This way we set inputs to show the actual title, icon, file and description of the video
        */
        const theVideo = response.data;
        setTitle(theVideo.title);
        setIcon(theVideo.icon);
        setFile(theVideo.file);
        setDescription(theVideo.description);
      })
      .catch((error) => console.log(error));
  }, [videoId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { title, icon, file, description};

    // Make a PUT request to update the video
    axios
      .put(`${API_URL}/api/videos/${videoId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the video
        // is updated we navigate back to the content page
        navigate("/videos/" + videoId);
      });
  };

  const deleteVideo = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/videos");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="VideoEditPage">
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          title="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Icon:</label>
        <input
          type="text"
          title="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <label>File:</label>
        <input
          type="text"
          title="file"
          value={file}
          onChange={(e) => setFile(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          title="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Video</button>
      </form>

      <button onClick={deleteVideo}>Delete Video</button>
    </div>
  )
}

export default VideoEditPage;