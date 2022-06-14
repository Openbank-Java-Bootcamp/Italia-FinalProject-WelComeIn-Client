import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5005";

function LinkEditPage(props) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  // Get the URL parameter `:linkId`
  const { linkId } = useParams();

  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the link id coming from URL parameter `linkId` changes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
      .get(`${API_URL}/api/links/${linkId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the link data coming from the response.
          This way we set inputs to show the actual title, icon, file and description of the link
        */
        const theLink = response.data;
        setTitle(theLink.title);
        setIcon(theLink.icon);
        setFile(theLink.file);
        setDescription(theLink.description);
      })
      .catch((error) => console.log(error));
  }, [linkId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { title, icon, file, description};

    // Make a PUT request to update the link
    axios
      .put(`${API_URL}/api/links/${linkId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the link
        // is updated we navigate back to the content page
        navigate("/links/" + linkId);
      });
  };

  const deleteLink = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/links/${linkId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/links");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="LinkEditPage">
      <Navbar />
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

        <button type="submit">Update Link</button>
      </form>

      <button onClick={deleteLink}>Delete Link</button>
    </div>
  )
}

export default LinkEditPage;