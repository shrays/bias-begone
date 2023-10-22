import React, { useState, useRef } from "react";
import api from '../api';

const Home = () => {
  //const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUpload = async (event) => {
    if (files) {
      const formData = new FormData();
      formData.append('csvFile', files[0]);
  
      try {
        const response = await api.post('/uploadFile', formData); // Change the URL as needed
        // Handle the response from the backend
        console.log('File uploaded successfully:', response);
        // Optionally, you can set a message or update your UI based on the response
        setUploadMessage('File uploaded successfully.');
      } catch (error) {
        // Handle errors
        console.error('Error uploading file:', error);
        // Optionally, set an error message or update your UI based on the error
        setUploadMessage('Error uploading file. Please try again.');
      }
    } else {
      // Handle the case where no file is selected
      console.error('No file selected for upload.');
    }
  };

  const [files, setFiles] = useState(null);
  const inputref = useRef();

  // handle file drag
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    // Check if at least one file was dropped
    if (droppedFiles.length > 0) {
      const firstFile = droppedFiles[0];

      // Check if the first file's type is CSV
      if (
        firstFile.type === "application/vnd.ms-excel" ||
        firstFile.name.endsWith(".csv")
      ) {
        setFiles(droppedFiles);
      } else {
        // Display an error message for non-CSV files
        alert("Please drop a CSV file.");

        // or change the UI
        return (
          <div className="flex-container">
            <div className="flex-item">
              <h1 style={{ left: "10vw", fontSize: "3vw" }}>
                <span style={{ color: "white" }}>What is </span>
                <span style={{ color: "#FF6966" }}>bias</span>
              </h1>
              <h1 style={{ left: "10vw", fontSize: "3vw", top: "0.5vw" }}>
                in datasets?
              </h1>
            </div>
            <div className="flex-item">
              <h1>Upload File</h1>
              <h2>
                Start detecting the bias in your dataset by uploading your csv
                file
              </h2>
              <div className="dropZone">
                <img
                  src={require("../Assets/wrong_file.png")}
                  style={{ width: "5vw", height: "5vw", marginBottom: "2vw" }}
                />
                <p> Please upload a .csv file! </p>
                <button
                  className="smallButton"
                  onClick={() => setFiles(null)}
                  style={{ marginRight: "1vw" }}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  // handle file selection
  const handleFileSelection = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      const firstFile = selectedFiles[0];

      // Check if the first file's type is CSV
      if (
        firstFile.type === "application/vnd.ms-excel" ||
        firstFile.name.endsWith(".csv")
      ) {
        setFiles(selectedFiles);
      } else {
        alert("Please select a CSV file.");
      }
    }
  };

  // UI after file upload
  if (files)
    return (
      <div className="flex-container">
        <div className="flex-item">
          <h1 style={{ left: "10vw", fontSize: "3vw" }}>
            <span style={{ color: "white" }}>What is </span>
            <span style={{ color: "#FF6966" }}>bias</span>
          </h1>
          <h1 style={{ left: "10vw", fontSize: "3vw", top: "0.5vw" }}>
            in datasets?
          </h1>
        </div>
        <div className="flex-item">
          <h1>Upload File</h1>
          <h2>
            Start detecting the bias in your dataset by uploading your csv file
          </h2>
          <div className="dropZone">
            <img
              src={require("../Assets/document.png")}
              style={{ width: "5vw", height: "5vw", marginBottom: "2vw" }}
            />
            {Array.from(files).map((file, idx) => (
              <p key={idx}>{file.name}</p>
            ))}
            <div className="actions">
              <button
                className="smallButton"
                onClick={() => setFiles(null)}
                style={{ marginRight: "1vw" }}
              >
                Cancel
              </button>
              <button className="smallButton" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  // UI before file upload
  return (
    <div className="flex-container">
      <div className="flex-item">
        <h1 style={{ left: "10vw", fontSize: "3vw" }}>
          <span style={{ color: "white" }}>What is </span>
          <span style={{ color: "#FF6966" }}>bias</span>
        </h1>
        <h1 style={{ left: "10vw", fontSize: "3vw", top: "0.5vw" }}>
          in datasets?
        </h1>
      </div>
      <div className="flex-item">
        <h1>Upload File</h1>
        <h2>
          Start detecting the bias in your dataset by uploading your csv file
        </h2>
        <>
          {!files && (
            <div
              className="dropZone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <img
                src={require("../Assets/upload.png")}
                style={{ width: "5vw", height: "5vw", marginBottom: "2vw" }}
              />
              <p> Drag and drop files to upload </p>
              <p style={{ fontSize: "1.3vw" }}>OR</p>
              <input
                className="uploadButton"
                type="file"
                multiple
                onChange={(event) => handleFileSelection(event.target.files)}
                hidden
                ref={inputref}
              />
              <button
                className="uploadButton"
                onClick={() => inputref.current.click()}
              >
                {" "}
                Browse Files{" "}
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Home;
