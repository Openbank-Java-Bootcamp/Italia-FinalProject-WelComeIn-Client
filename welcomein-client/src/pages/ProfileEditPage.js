import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfileEditPage(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [avatar, setAvatar] = useState("");
  const [biography, setBiography] = useState("");
  const [background, setBackground] = useState("");

  // Get the URL parameter `:artistId`
  const { artistId } = useParams();

  const navigate = useNavigate();

  // This effect will run after the initial render and each time
  // the artist id coming from URL parameter `artistId` changes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
      .get(`${API_URL}/api/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        /* 
          We update the state with the artist data coming from the response.
          This way we set inputs to show the actual variables of the artist
        */
        const theArtist = response.data;
        setName(theArtist.name);
        setUsername(theArtist.username);
        setEmail(theArtist.email);
        setPicture(theArtist.picture);
        setAvatar(theArtist.avatar);
        setBiography(theArtist.biography);
        setBackground(theArtist.background);
      })
      .catch((error) => console.log(error));
  }, [artistId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { name, username, email, picture, avatar, biography, background};

    // Make a PUT request to update the artist
    axios
      .put(`${API_URL}/api/artists/${artistId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the artist
        // is updated we navigate back to the profile page
        navigate("/api/artists/" + artistId);
      });
  };

  const deleteAccount = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="ProfileEditPage">
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
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Picture:</label>
        <input
          type="text"
          name="picture"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />

        <label>Avatar:</label>
        <input
          type="text"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <label>Biography:</label>
        <textarea
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />

        <label>Background:</label>
        <input
          type="text"
          name="background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  )
}

export default ProfileEditPage;