import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Select from "react-select";

const API_URL = "http://localhost:5005";

function UploadImage() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [galleryName, setGalleryName] = useState("Kingdom");
  const [galleryNames, setGalleryNames] = useState("");
  const [galleries, setGalleries] = useState([]);

  const handleChange = (event) => {
    setGalleryName(event.target.value);
  };

  const getAllGalleries = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/galleries/artist/${user.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setGalleries(response.data);
        var galleryNames = response.data;
        console.log(galleryNames[0].name);
        setGalleryName(galleryNames[0].name);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllGalleries();
  }, []);

  const onFormChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setFile(btoa(binaryString));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object representing the body of the POST request
    const requestBody = { title, file, description, galleryName };
    console.log(galleryName);
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/images`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setFile("");
        setDescription("");
        setGalleryName("");

        // Invoke the callback function coming through the props
        // from the UploadingPage, to refresh the Gallery details
        //props.refreshGallery();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="UploadImage">
      <h3>Upload New Image</h3>

      <form onSubmit={handleSubmit} onChange={(e) => onFormChange(e)}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Image</label>
        <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Gallery:</label>
        {/* <div className="col-xs-12 col-sm-7 example-col">
          <DropDownList
            style={{
              width: "300px",
            }}
            data={galleries.map((gallery) => gallery.name)}
            onChange={(e) => setGalleryName(e.target.value)}
            defaultValue="Kingdom"
          />
        </div>
        <Select
          className="basic-simple"
          options={galleryNames}
          onChange={(e) => setGalleryName(e.target.value)}
        /> */}
        <select value={galleryName} onChange={handleChange}>
          {galleries.map((gallery) => (
            <option value={gallery.name}>{gallery.name}</option>
          ))}
        </select>
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

export default UploadImage;
