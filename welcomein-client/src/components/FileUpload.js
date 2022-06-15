import React from 'react'

export default function FileUpload() {
    const state = {
 
        // Initially, no file is selected
        selectedFile: null
      };
      
      // On file select (from the pop up)
      const onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };
      
      // On file upload (click the upload button)
      const onFileUpload = () => {
      
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
      };
      
      // File content to be displayed after
      // file upload is complete
      const fileData = () => {
      
        if (this.state.selectedFile) {
           
          return (
            <div>
              <h2>File Details:</h2>
               
    <p>File Name: {this.state.selectedFile.name}</p>
    
               
    <p>File Type: {this.state.selectedFile.type}</p>
    
               
    <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
    
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
  return (
    <div>
        <label>File:</label>
        <div>
            <input
              type="file"
              name="file"
              value={file}
              onChange={onFileChange}
             />
            <button onClick={onFileUpload}>
                Add File!
            </button>
        </div>

        
        {/* <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
    </div>
  )
}
