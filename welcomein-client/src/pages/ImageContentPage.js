import { useState, useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ImageContentPage(props) {
  const [image, setImage] = useState([]);
// Get the URL parameter `:imageId`
const { imageId } = useParams();

// Helper function that makes a GET request to the API
// and retrieves the image by id
const getImage = () => {
  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  // Send the token through the request "Authorization" Headers
  axios
    .get(`${API_URL}/api/images/${imageId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => setImage(response.data))
    .catch((error) => console.log(error));
};

// We set this effect will run only once, after the initial render
// by setting the empty dependency array - []
useEffect(() => {
    getImage();
}, []);

  return (
    <div className="ImageContentPage">
        <img 
            src={image.file}
            alt={`${image.title} File`}
            className="ImageFile"
        />
        <h2>{image.title}</h2>
        <p>{image.description}</p>
    </div>
  )
}

export default ImageContentPage;