import React, { useState, useRef, useEffect } from "react";
import api from "../api";
import Matrix from "./../components/Matrix";
import FileUploadArea from "./fileUpload";

const Home = () => {
  //const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [columnNames, setColumnNames] = useState([]);
  const [heatMap, setHeatMap] = useState([]); // heatmap data is a 2D list
  const [openai_resp, setopenai_resp] = useState("");
  const [isEditingColumnNames, setIsEditingColumnNames] = useState(false);
  const [editedColumnNames, setEditedColumnNames] = useState([...columnNames]);
  const [isEditingButtonVisible, setIsEditingButtonVisible] = useState(false);
  const [isEditingFormVisible, setIsEditingFormVisible] = useState(false);
  const [visibleTextIndex, setVisibleTextIndex] = useState(0);
  const [files, setFiles] = useState(null);
  const inputref = useRef();

  const HandleUpload = async (event) => {
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await api.post("/uploadFile/", formData);
        const { columnNames, columnDataTypes } = response.data;

        if (columnNames) {
          setColumnNames(columnNames);
          setEditedColumnNames(columnNames);
          setIsEditingButtonVisible(true);
          console.log(columnNames);
          setUploadMessage(
            "File uploaded successfully. Please confirm column names."
          );
        } else {
          setUploadMessage(
            "File uploaded successfully, but no column information received."
          );
        }
      } catch (e) {
        console.error("File upload failed", e);
      }

      alert("File upload success"); // for debugging
    }
  };

  // Start
  const Start = async (event) => {
    try {
      const data = { columnNames };

      const response = await api.post("/start/", data);
      if (response.status === 200) {
        // HeatMap Data is received here
        const { heatMap, openai_resp } = response.data;
        if (heatMap) {
          setopenai_resp(openai_resp);
          setHeatMap(heatMap);
          console.log(heatMap);
        }
        console.log("New column names successfully sent");
      } else {
        console.error("New column names not sent:", response.data);
      }
    } catch (error) {
      console.error("New column names not sent:", error);
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
        //return (
        <div className="flex-container">
          <div className="flex-item">
            <h1 style={{ left: "10vw", fontSize: "3vw" }}>
              <span>What is </span>
              <span style={{ color: "#FF6966" }}>bias</span>
            </h1>
            <h1 style={{ left: "10vw", fontSize: "3vw" }}>in datasets?</h1>
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
        </div>;
        //);
      }
    }
  };

  const typeOpenaiResp = () => {
    const text = openai_resp;

    if (visibleTextIndex < text.length) {
      setTimeout(() => {
        setVisibleTextIndex(visibleTextIndex + 1);
      }, 50); // Reduce the delay for a faster animation
    }
  };

  // Problem: Page in render loop
  if (heatMap && openai_resp) {
    typeOpenaiResp();
    return (
      <div>
        <div
          className="flex-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <h1
            style={{
              marginLeft: "auto",
              marginRight: "200px",
              marginBottom: "-20px",
            }}
          >
            Heatmap
          </h1>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Matrix data={heatMap} columnNames={columnNames} />
          </div>
          <h1 style={{ marginLeft: "210px", marginBottom: "-20px" }}>
            Summary
          </h1>
          <div className="left-aligned-boundary">
            <p style={{ textAlign: "left" }}>
              {openai_resp.slice(0, visibleTextIndex)}
            </p>
          </div>
          <p>test</p>
        </div>
      </div>
    );
  }

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
    console.log(newName);
    const updatedNames = [...editedColumnNames];
    updatedNames[index] = newName;
    setEditedColumnNames(updatedNames);
  };

  // Function to save the edited column names
  const handleSaveColumnNames = () => {
    setColumnNames([...editedColumnNames]);
    setIsEditingColumnNames(false);
    setIsEditingFormVisible(false);
  };

  // jsx
  return (
    <div className="flex-container">
      <div className="flex-item">
        <h1 style={{ left: "10vw", fontSize: "2.5vw" }}>
          <span>What is </span>
          <span style={{ color: "#35a68d" }}>bias</span>
        </h1>
        <h1 style={{ left: "10vw", fontSize: "2.5vw", top: "2px" }}>
          in datasets?
        </h1>
      </div>
      <div className="flex-item">
        <FileUploadArea
          onFilesSelected={handleFileSelection}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          files={files}
          onRemoveFiles={() => setFiles(null)}
          inputref={inputref}
          HandleUpload={HandleUpload}
          isEditingButtonVisible={isEditingButtonVisible}
          setIsEditingColumnNames={setIsEditingColumnNames}
          setFiles={setFiles}
          Start={Start}
          setIsEditingButtonVisible={setIsEditingButtonVisible}
        />
      </div>
    </div>
  );
};

export default Home;
