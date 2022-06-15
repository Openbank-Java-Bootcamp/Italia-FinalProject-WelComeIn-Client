import { useState, useEffect } from "react";
import axios from "axios";
import GalleryCard from "../components/GalleryCard";
const API_URL = "http://localhost:5005";

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState([]);

  const getAllGalleries = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/galleries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setGalleries(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllGalleries();
  }, []);

  return (
    <div className="GalleriesPage">

      {galleries.map((gallery) => (
        <GalleryCard key={gallery.id} {...gallery} />
      ))}

      {/* {galleries.length > 0 && (
            <h2>There are no galleries yet.</h2>
        )}

        <section>
            {galleries.map((gallery) => (
            <GalleryCard key={gallery.id} {...gallery} />
            ))}
        </section> */}
    </div>
  );
}
