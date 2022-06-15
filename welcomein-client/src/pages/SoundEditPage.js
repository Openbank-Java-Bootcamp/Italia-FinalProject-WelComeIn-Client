import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function SoundEditPage(props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  // Get the URL parameter `:soundId`
  const { soundId } = useParams();

  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the sound id coming from URL parameter `soundId` changes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
      .get(`${API_URL}/api/sounds/${soundId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the sound data coming from the response.
          This way we set inputs to show the actual title, icon, file and description of the sound
        */
        const theSound = response.data;
        setTitle(theSound.title);
        setFile(theSound.file);
        setDescription(theSound.description);
      })
      .catch((error) => console.log(error));
  }, [soundId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { title, file, description};

    // Make a PUT request to update the sound
    axios
      .put(`${API_URL}/api/sounds/${soundId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the sound
        // is updated we navigate back to the content page
        navigate("/sounds/" + soundId);
      });
  };

  const deleteSound = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/sounds/${soundId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/sounds");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="SoundEditPage">
      
      {/* <label>File:</label>
        <input
          type="text"
          title="file"
          value={file}
          onChange={(e) => setFile(e.target.value)}
        /> */}

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          title="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          title="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Sound</button>
      </form>

      <button onClick={deleteSound}>Delete Sound</button>
    </div>
  )
}

export default SoundEditPage;