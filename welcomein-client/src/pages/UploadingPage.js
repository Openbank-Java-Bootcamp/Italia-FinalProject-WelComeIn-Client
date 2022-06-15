import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";

const API_URL = "http://localhost:5005";

function UploadingPage() {
  const [gallery, setGallery] = useState();
  const [image, setImage] = useState();
  const [link, setLink] = useState();
  const [sound, setSound] = useState();
  const [video, setVideo] = useState();

  // Get the URL parameter `:galleryId`
  const { galleryId } = useParams();

  // Helper function that makes a GET request to the API
  // and retrieves the gallery by id
  const getGallery = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/galleries/${galleryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setGallery(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="UploadingPage">
      <div className="UploadImage">
        <Link to={`/upload/image`}>
          <img src="" alt="image icon" />
          <h5>Upload Image</h5>
        </Link>
      </div>

      <div className="UploadLink">
        <Link to={`/upload/link`}>
          <img src="" alt="link icon" />
          <h5>Upload Link</h5>
        </Link>
      </div>

      <div className="UploadSound">
        <Link to={`/upload/sound`}>
          <img src="" alt="sound icon" />
          <h5>Upload Sound</h5>
        </Link>
      </div>

      <div className="UploadVideo">
        <Link to={`/upload/video`}>
          <img src="" alt="video icon" />
          <h5>Upload Video</h5>
        </Link>
      </div>

      <UploadImage refreshGallery={getGallery} galleryId={galleryId} />
    </div>
  );
}

export default UploadingPage;
