import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams} from "react-router-dom";

const API_URL = "http://localhost:5005";

function ImagesPage(props) {
  const [images, setImages] = useState([]);

//   const getAllImages = () => {
//   const storedToken = localStorage.getItem("authToken");
//   axios
//   .get(`${API_URL}/api/images`, {
//       headers: { Authorization: `Bearer ${storedToken}` },
//   })
//   .then((response) => setImages(response.data))
//   .catch((error) => console.log(error));
// };

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
  return (
    <div className="ImagesPage">
      <h3>holo</h3>
      {images.map((image) => (
        <Link to={`/images/${image.id}`}>
          <img src="{image.file}" alt={`${image.title} Image`}/>
          <h3>{image.title}</h3>
        </Link>
          ))}
    </div>
    )
  }
  
  export default ImagesPage;