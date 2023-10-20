import React, { useState } from "react";
import ReactDOM from "react-dom";


const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

    // ***upload file handler example***
    // const handleFormSubmit = async (event) => {
    //   event.preventDefault();
    //   await api.post('/transactions/', formData);
    //   fetchTransactions();
    //   setFormData({
    //     amount: '',
    //     category: '',
    //     description: '',
    //     is_income: false,
    //     date: ''
    //   });
    // };

  const handleUpload = async (event) => {

    if (!selectedFile) {
      setUploadMessage("Please select a file.");
      return;
    }

    // convert the uploaded file into form data
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // TODO: change this
      const response = await fetch("http://your-upload-url", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        setUploadMessage("File uploaded successfully.");
      } else {
        setUploadMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Upload failed. Please try again.");
    }
  };

  const[files, setFiles] = useState(null);

  // The UI 
  return (
    
    <div className="flex-container">
      <div className="flex-item">
        <h1 style={{ left: '10vw', fontSize: '3vw'}}>
        <span style={{ color: 'white' }}>What is </span>
        <span style={{ color: '#FF6966' }}>bias</span>
        </h1>
        <h1 style={{ left: '10vw', fontSize: '3vw', top:'0.5vw'}}>
          in datasets?
        </h1>
      </div>
      <div className="flex-item">
      <h1>Upload File</h1>
        <h2>Start detecting the bias in your dataset by uploading your csv file</h2>
        {/* <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadMessage && <p>{uploadMessage}</p>} */}
        <>
          {!files && (
              <div className = "dropZone">
                  <img src="../Assets/upload.png" />
                  <p> Drag and drop files to upload </p>
                  <p style={{ fontSize: '1.3vw' }}>OR</p>
                  <button className="uploadButton"> Browse Files </button>
              </div>
          )}
        </>
      </div>
    </div>
  );

};

export default Home;
