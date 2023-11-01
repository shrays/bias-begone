import React, { useState, useRef } from "react";
import api from "../api";

const Home = () => {
  //const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [columnNames, setColumnNames] = useState([]);
  const [isEditingColumnNames, setIsEditingColumnNames] = useState(false);
  const [editedColumnNames, setEditedColumnNames] = useState([...columnNames]);
  const [isEditingButtonVisible, setIsEditingButtonVisible] = useState(false);
  const [isEditingFormVisible, setIsEditingFormVisible] = useState(false);
  const [files, setFiles] = useState(null);
  const inputref = useRef();

  const HandleUpload = async (event) => {
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await api.post('/uploadFile/', formData);
        const { columnNames, columnDataTypes } = response.data;

        if (columnNames) {

          setColumnNames(columnNames);
          setEditedColumnNames(columnNames);
          setIsEditingButtonVisible(true);
          console.log(columnNames);
          setUploadMessage("File uploaded successfully. Please confirm column names.");
        } else {
          setUploadMessage("File uploaded successfully, but no column information received.");
        }
      } catch (e) {
        console.error('File upload failed', e);
      }

      alert("File upload success"); // for debugging
    }

  };

  // Start
  const Start = async (event) => {
    try {
      const data = { columnNames };
  
      const response = await api.post('/start/', data);
  
      if (response.status === 200) {
        console.log('New column names successfully sent');
      } else {
        console.error('New column names not sent:', response.data);
      }
    } catch (error) {
      console.error('New column names not sent:', error);
    }
  };

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

        // or change the UI --> this is not working
        return (
          <div className="flex-container">
            <div className="flex-item">
              <h1 style={{ left: "10vw", fontSize: "3vw" }}>
                <span style={{ color: "white" }}>What is </span>
                <span style={{ color: "#FF6966" }}>bias</span>
              </h1>
              <h1 style={{ left: "10vw", fontSize: "3vw" }}>
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

  const handleEditColumnName = (index, newName) => {
    console.log(newName)
    const updatedNames = [...editedColumnNames];
    updatedNames[index] = newName;
    setEditedColumnNames(updatedNames);
  };

  // Function to save the edited column names
  const handleSaveColumnNames = () => {
    setColumnNames([...editedColumnNames]);
    setIsEditingColumnNames(false);
    setIsEditingFormVisible(false); // Hide the form after saving
  };



  // UI after file upload
  if (files) {
    if (isEditingColumnNames) {
      return (
        <div className="flex-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <div className="flex-item">
            <h1>Edit Column Names</h1>
            <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Current Names</label>
              </div>
              <div style={{ flex: 1 }}>
                <label>Enter New Names</label>
              </div>
            </div>
            <div style={{ color: 'white', marginBottom: '10px' }}>
              {columnNames.map((name, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label style={{ flex: 1, marginRight: '10px' }}>{name}:</label>
                  <input
                    type="text"
                    value={null}
                    onChange={(e) => handleEditColumnName(index, e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="actions" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <button
              className="smallButton"
              onClick={() => setIsEditingColumnNames(false)}
            >
              Cancel
            </button>
            <button
              className="smallButton"
              onClick={handleSaveColumnNames}
              style={{ width: "170px", marginLeft: '10px' }}
            >
              Save Column Names
            </button>
          </div>
        </div>
      );
    } else {
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
                <div style={{ marginTop: "8px" }}>
                  <button
                    className="smallButton"
                    onClick={() => {
                      setFiles(null);
                      setIsEditingButtonVisible(false);
                    }}
                    style={{ marginRight: "1vw" }}
                  >
                    Cancel
                  </button>
                  <button className="smallButton" onClick={HandleUpload}>
                    Upload
                  </button>
                </div>
                <div style={{ marginTop: "10px" }}>
                  {isEditingButtonVisible ? (
                    <div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <button
                          className="smallButton"
                          onClick={() => setIsEditingColumnNames(true)}
                          style={{ width: "170px" }}
                        >
                          Edit Column Names
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "12px" }}>
                        <button
                        className="smallButton"
                        onClick={() => Start()}
                        style={{ width: "70px" }}
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>Please click upload</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
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