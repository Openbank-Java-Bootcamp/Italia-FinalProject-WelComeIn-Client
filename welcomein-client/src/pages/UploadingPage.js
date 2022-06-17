import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import UploadGallery from "../components/UploadGallery";
import gal from "../images/gallery5.png"
import ima from "../images/imageIcon5.png"

const API_URL = "http://localhost:5005";

function UploadingPage() {
  const [gallery, setGallery] = useState();
  const [image, setImage] = useState();

  const [showGalForm, setShowGalForm] = useState(false);
  const [showImForm, setShowImForm] = useState(false);

  const toggleShowGalForm = () => {
    setShowGalForm(true);
  };

  const toggleShowImForm = () => {
    setShowImForm(true);
  };

  return (
    <div className="UploadingPage">
      <div className="selector">
        <div className="UploadingGallery">
          <button onClick={toggleShowGalForm}>
            <img src={gal} alt="gallery icon" width="30%"/>
            <h5>Upload Gallery</h5>
          </button>
        </div>
        <div className="UploadingImage">
          <button onClick={toggleShowImForm}>
            <img src={ima} alt="image icon" width="29%"/>
            <h5>Upload Image</h5>
          </button>
        </div>
      </div>

      <div className="UploadForm">
        {showGalForm && <UploadGallery />}
        {showImForm && <UploadImage />}
      </div>
      
    </div>
  );
}

export default UploadingPage;
