import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function ProfilePage(props) {
  const { user } = useContext(AuthContext);
  const [artist, setArtist] = useState([]);

  // Get the URL parameter `:artistId`
  const artistId = user.id;
  console.log(artistId)

  // Helper function that makes a GET request to the API
  // and retrieves the artist by id
  const getArtist = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setArtist(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div className="ProfilePage">
        <div className="ProfileCont">
            <img 
            src={`data:image/png;base64,${artist.picture}`} 
            alt={`${artist.name}'s profile pic`} className="ProfilePic" width="50%" height="50%"/>
            <h2>{artist.name}</h2>
            <h4>{artist.username}</h4>
            <p>{artist.biography}</p>
            <Link to={`/artists/${artistId}/edit`}>
              Edit Profile
            </Link>
         </div>  
    </div>
  );
}

export default ProfilePage;

// src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" 
