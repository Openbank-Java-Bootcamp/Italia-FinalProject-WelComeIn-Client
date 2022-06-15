import { useState, useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function SoundContentPage(props) {
  const [sound, setSound] = useState([]);
// Get the URL parameter `:soundId`
const { soundId } = useParams();

// Helper function that makes a GET request to the API
// and retrieves the sound by id
const getSound = () => {
  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // Send the token through the request "Authorization" Headers
  axios
    .get(`${API_URL}/api/sounds/${soundId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => setSound(response.data))
    .catch((error) => console.log(error));
};

// We set this effect will run only once, after the initial render
// by setting the empty dependency array - []
useEffect(() => {
    getSound();
}, []);

  return (
    <div className="SoundContentPage">
        <img 
            src={sound.file}
            alt={`${sound.title} File`}
            className="SoundFile"
        />
        <h2>{sound.title}</h2>
        <p>{sound.description}</p>
    </div>
  )
}

export default SoundContentPage;