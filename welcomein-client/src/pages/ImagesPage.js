import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ImagesPage(props) {
  const [images, setImages] = useState([]);
  console.log(props);

  //Get the URL parameter `:galleryId`
  const { galleryId } = useParams();
  console.log(galleryId);

  const getAllImages = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/images/gallery/${galleryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setImages(response.data))
      .catch((error) => console.log(error));
    console.log(images);
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllImages();
    console.log(images);
  }, []);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="ImagesPage">
      {images.map((image) => (
        <div className="ImagesDisp">
          
              <img
                src={`data:image/png;base64,${image.file}`}
                alt={`${image.title} Image`}
                width="80%"
                galleryId={galleryId}
              />
          <div className="ImgText">
              <h2>{image.title}</h2>
              <h4>{image.description}</h4>
          </div>
        {/* <div>
          <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <img
            src={`data:image/png;base64,${image.file}`}
            alt={`${image.title} Image`}
            width="30%"
            galleryId={galleryId}
          />
          </div> */}
  
          {/* {isHovering && (
            <div>
              
              <h2>{image.title}</h2>
              <h4>{image.description}</h4>
              <img
                src={`data:image/png;base64,${image.file}`}
                alt={`${image.title} Image`}
                width="80%"
                galleryId={galleryId}
              />
            </div>
          )}
        </div> */}
      </div>
      ))}
    </div>
  );
}

export default ImagesPage;
