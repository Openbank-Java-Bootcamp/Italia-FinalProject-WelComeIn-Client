import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function UploadImage(props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // We need the gallery id when creating the new image
    const { galleryId } = props;
    // Create an object representing the body of the POST request
    const requestBody = { title, file, icon, description, galleryId };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/images`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setFile("");
        setIcon("");
        setDescription("");

        // Invoke the callback function coming through the props
        // from the UploadingPage, to refresh the Gallery details
        props.refreshGallery();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="UploadImage">
      <h3>Upload New Image</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>File:</label>
        <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>
                Upload!
            </button>
        </div>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Icon:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

export default UploadImage;
