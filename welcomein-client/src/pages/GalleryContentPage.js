import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5005";

function GalleryContentPage(props) {
    const [gallery, setGallery] = useState([]);

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
    <div className="GalleryContentPage">
        <Navbar />
        
        {/* Edit profile */}
        <div className="GalleryBanner">
            <h2>{gallery.name} Gallery</h2>
            {/* <h6>Curated by: {gallery.artist.name}</h6> */}
            <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" 
            alt="Name's profile pic" className="ProfilePic" width="15%"/>
        </div>

        <div className="GallerySounds">
            <Link to={`/api/sounds`}>
                <img src="" alt="sound icon"/>
                <h3>Sounds</h3>
            </Link>
        </div>
        <div className="GalleryImages">
            <Link to={`/api/images`}>
                <img src="" alt="image icon"/>
                <h3>Images</h3>
            </Link>
        </div>
        <div className="GalleryVideos">
            <Link to={`/api/videos`}>
                <img src="" alt="video icon"/>
                <h3>Videos</h3>
            </Link>
        </div>
        <div className="GalleryLinks">
            <Link to={`/api/links`}>
                <img src="" alt="link icon"/>
                <h3>Links</h3>
            </Link>
        </div>
        <div className="GalleryAvatar">
            <img src="" alt="avatar"/>
        </div>
    </div>
  )
}

export default GalleryContentPage;