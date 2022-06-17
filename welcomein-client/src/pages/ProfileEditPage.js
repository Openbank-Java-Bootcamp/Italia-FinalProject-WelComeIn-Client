import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfileEditPage(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [biography, setBiography] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the URL parameter `:artistId`
  const { artistId } = useParams();

  const navigate = useNavigate();


  const onFormChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setPicture(btoa(binaryString));
  };

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
        setPicture(theArtist.picture);
        setBiography(theArtist.biography);
        setEmail(theArtist.email);
        setPassword(theArtist.password);
      })
      .catch((error) => console.log(error));
  }, [artistId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { name, username, picture, biography, email, password};

    // Make a PUT request to update the artist
    axios
      .put(`${API_URL}/api/artists/${artistId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the artist
        // is updated we navigate back to the profile page
        navigate("/artists/profile");
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
      <form onSubmit={handleFormSubmit} onChange={(e) => onFormChange(e)}>
        
      <h3>Edit Profile</h3>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div/>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div/>
        <label>Picture:</label>
        <input
         type="file"
         name="picture"
          id="picture"
           accept=".jpeg, .png, .jpg"
            />
        <div/>
        <label>Biography:</label>
        <textarea
          name="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />


        <button type="submit">Update Profile</button>
        <button onClick={deleteAccount} type="delete">Delete Account</button>
      </form>
    </div>
  )
}

export default ProfileEditPage;