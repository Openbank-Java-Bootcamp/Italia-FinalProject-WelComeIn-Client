import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar'
const API_URL = "http://localhost:5005";

function LinksPage() {
    const [links, setLinks] = useState();

    const getAllLinks = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        // Send the token through the request "Authorization" Headers
        axios
        .get(`${API_URL}/api/links`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setLinks(response.data))
        .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
      getAllLinks();
    }, []);
    return (
      <div>
        <Navbar />
        {links.map((link) => (
          <Link to={`/api/links/${id}`}>
            <img src={`${icon}`} />
            <h3>{link.name}</h3>
          </Link>
            ))}
      </div>
    )
  }
  
  export default LinksPage;