import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function GalleryContentPage(props) {
  const {user} = useContext(AuthContext);
  const [gallery, setGallery] = useState([]);
  const [artist, setArtist] = useState([]);

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

  // Helper function that makes a GET request to the API
  // and retrieves the artist by id
  const getArtist = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/artists/${user.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setArtist(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getGallery();
    getArtist();
  }, []);
  console.log(gallery);
  console.log(artist);

  return (
    <div className="GalleryContentPage">
      {/* Edit profile */}
      <div className="GalleryBanner">
        <img src={gallery.icon} width="20%"/>
        <div>
          <h2>{gallery.name} Gallery</h2>
          <p>{gallery.slogan}</p>
        </div>

        <Link to={`/galleries/${galleryId}/edit`}>
          EditGallery
        </Link>
        {/* <div>
          <h6>Curated by: {artist.name}</h6>
          <img
            src={artist.picture}
            alt={`${artist.name}'s profile pic`}
            className="ProfilePic"
            width="15%"
            />
        </div> */}
      </div>
      <div className="GalleryImages">
        <div className="ImagesCont">
          <Link to={`/galleries/${galleryId}/images`} galleryId={galleryId}>
            <img src={gallery.imagesIcon} width="20%" alt="image icon" />
            <h3>Images</h3>
          </Link>
          </div>
      </div>

      {/* <div className="UserAvatar">
        <img src="" alt="avatar" />
      </div> */}

    </div>
  );
}

export default GalleryContentPage;
