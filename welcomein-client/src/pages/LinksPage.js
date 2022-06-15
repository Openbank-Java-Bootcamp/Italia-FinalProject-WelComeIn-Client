import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
        {links.map((link) => (
          <Link to={`/links/${link.id}`}>
            <img src={`${link.file}`} />
            <h3>{link.name}</h3>
          </Link>
            ))}
      </div>
    )
  }
  
  export default LinksPage;