import { useState, useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5005";

function LinkContentPage(props) {
  const [link, setLink] = useState([]);
// Get the URL parameter `:linkId`
const { linkId } = useParams();

// Helper function that makes a GET request to the API
// and retrieves the link by id
const getLink = () => {
  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // Send the token through the request "Authorization" Headers
  axios
    .get(`${API_URL}/api/links/${linkId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => setLink(response.data))
    .catch((error) => console.log(error));
};

// We set this effect will run only once, after the initial render
// by setting the empty dependency array - []
useEffect(() => {
    getLink();
}, []);

  return (
    <div className="LinkContentPage">
        <Navbar />
        <img 
            src={link.file}
            alt={`${link.title} File`}
            className="LinkFile"
        />
        <h2>{link.title}</h2>
        <p>{link.description}</p>
    </div>
  )
}

export default LinkContentPage;