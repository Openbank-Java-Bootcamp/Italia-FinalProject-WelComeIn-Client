import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import gal1 from "../images/gallery1.png";
import gal2 from "../images/gallery2.png";
import gal3 from "../images/gallery3.png";
import gal4 from "../images/gallery4.png";
import gal5 from "../images/gallery5.png";
import gal6 from "../images/gallery6.png";
import gal7 from "../images/gallery7.png";
import gal8 from "../images/gallery8.png";
import img1 from "../images/imageIcon1.png";
import img2 from "../images/imageIcon2.png";
import img3 from "../images/imageIcon3.png";
import img4 from "../images/imageIcon4.png";
import img5 from "../images/imageIcon5.png";
import img6 from "../images/imageIcon6.png";
import img7 from "../images/imageIcon7.png";
import img8 from "../images/imageIcon8.png";
import img9 from "../images/imageIcon9.png";
import img10 from "../images/imageIcon10.png";
import img11 from "../images/imageIcon11.png";
import img12 from "../images/imageIcon12.png";

const API_URL = "http://localhost:5005";

function GalleryEditPage(props) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [slogan, setSlogan] = useState("");
  const [imagesIcon, setImagesIcon] = useState("");

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
        setImagesIcon(theArtist.imagesIcon);
      })
      .catch((error) => console.log(error));
  }, [galleryId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    // Create an object representing the body of the PUT request
    const requestBody = { name, icon, slogan, imagesIcon };
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

  const randomizeIcon = () => {
    const nums = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8];
    const randomNum = Math.floor(Math.random() * nums.length);
    setIcon(nums[randomNum]);
  };

  const randomizeImagesIcon = () => {
    const nums = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
    ];
    const randomNum = Math.floor(Math.random() * nums.length);
    setImagesIcon(nums[randomNum]);
  };

  useEffect(() => {
    randomizeIcon();
    randomizeImagesIcon();
  }, []);

  return (
    <div className="GalleryEditPage">
      <h3>Edit {name} Gallery</h3>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div />
        <label>Slogan:</label>
        <input
          type="text"
          name="slogan"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
        />
        <div />
        <div className="ranGal">
          <img src={icon} width="50%" />
          <button onClick={randomizeIcon} type="button">
            Randomize Gallery Icon
          </button>
        </div>
        <div />
        <div>
          <img src={imagesIcon} width="50%" />
          <button onClick={randomizeImagesIcon} type="button">
            Randomize Images Icon
          </button>
        </div>
        <div />
        <button type="submit">Update Gallery</button>
      </form>

      <button onClick={deleteGallery} type="delete">
        Delete Gallery
      </button>
    </div>
  );
}

export default GalleryEditPage;
