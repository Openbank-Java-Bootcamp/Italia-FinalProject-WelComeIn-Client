import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function GalleryEditPage(props) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [slogan, setSlogan] = useState("");
  const [background, setBackground] = useState("");

  // Get the URL parameter `:galleryId`
  const { galleryId } = useParams();

  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the gallery id coming from URL parameter `galleryId` changes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
      .get(`${API_URL}/api/galleries/${galleryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the gallery data coming from the response.
          This way we set inputs to show the actual name, icon, slogan and background of the gallery
        */
        const theArtist = response.data;
        setName(theArtist.name);
        setIcon(theArtist.icon);
        setSlogan(theArtist.slogan);
        setBackground(theArtist.background);
      })
      .catch((error) => console.log(error));
  }, [galleryId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { name, icon, slogan, background};

    // Make a PUT request to update the gallery
    axios
      .put(`${API_URL}/api/galleries/${galleryId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the gallery
        // is updated we navigate back to the content page
        navigate("/galleries/" + galleryId);
      });
  };

  const deleteGallery = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/galleries/${galleryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/galleries");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="GalleryEditPage">
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Username:</label>
        <input
          type="text"
          name="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="text"
          name="slogan"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
        />

        <label>Background:</label>
        <input
          type="text"
          name="background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />

        <button type="submit">Update Gallery</button>
      </form>

      <button onClick={deleteGallery}>Delete Gallery</button>
    </div>
  )
}

export default GalleryEditPage;