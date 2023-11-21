import React, { useState, useRef, useEffect } from "react";
import api from "../api";
import FileUploadArea from "../components/fileUpload";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/loading";

const Home = () => {
  //const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [columnNames, setColumnNames] = useState([]);
  const [heatMap, setHeatMap] = useState([]); // heatmap data is a 2D list
  const [summary, setSummary] = useState("");
  const [tips, setTips] = useState("");
  const [isEditingColumnNames, setIsEditingColumnNames] = useState(false);
  const [editedColumnNames, setEditedColumnNames] = useState([...columnNames]);
  const [isEditingButtonVisible, setIsEditingButtonVisible] = useState(false);
  const [isEditingFormVisible, setIsEditingFormVisible] = useState(false);
  const [files, setFiles] = useState(null);
  const inputref = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  const Start = async (columnNames, onSuccess, onError) => {
    try {
      const data = { columnNames };
      const response = await api.post("/start/", data);
      if (response.status === 200) {
        // HeatMap Data is received here
        const { heatMap, summary, tips } = response.data;
        console.log("New column names successfully sent");

        if (heatMap && typeof onSuccess === "function") {
          onSuccess(heatMap, summary, tips);
        }
      } else {
        console.error("New column names not sent:", response.data);
      }
    } catch (error) {
      console.error("New column names not sent:", error);
      if (typeof onError === "function") {
        onError(error);
      }
    }
  };

  // function to handle start button click
  const HandleStart = async (event) => {
    console.log("Handle start");
    setLoading(true);
    console.log(loading);
    try {
      await Start(
        columnNames,
        (heatMap, summary, tips) => {
          setLoading(false);
          setSummary(summary);
          setTips(tips);
          setHeatMap(heatMap);
          navigate("/linear", {
            state: {
              summary,
              tips,
              heatMap,
              columnNames,
            },
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error("Failed to start:", error);
    } finally {
      setLoading(false);
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
      }
    }
  };

  function createScatterPlot(data) {
    const svg = d3.select("body").append("svg");
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

  // Function to redirect to learn more page
  function redirect() {
    navigate("/about");
  }

  // jsx
  if (loading) {
    return <LoadingComponent loading={loading} />;
  }
  if (!isEditingColumnNames) {
    return (
      <div className="flex-container">
        <div className="flex-left">
          <h1 style={{ left: "10vw" }}>
            <span>What is </span>
            <span style={{ color: "#35a68d" }}>bias</span>
          </h1>
          <h1
            style={{
              left: "10vw",
              fontSize: "1.7vw",
              top: "1rem",
              flexWrap: "nowrap",
            }}
          >
            in machine learning?
          </h1>
          <div className="justified">
            Bias in machine learning happens when the algorithms or data used to
            train models unfairly favor some groups or outcomes over others.
            This usually means the data isn't showing the full picture or the
            model acts in a way that's not even-handed. As a result, this can
            lead to unfair treatment for certain people or groups, causing
            uneven and possibly unjust outcomes.
          </div>
          <button className="textButton" onClick={redirect}>
            Learn more
          </button>
        </div>
        <div className="flex-right">
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
            HandleStart={HandleStart}
            setIsEditingButtonVisible={setIsEditingButtonVisible}
          />
        </div>
      </div>
    );
  } else {
    {
      return (
        <div
          className="flex-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div className="flex-item">
            <h1>Edit Column Names</h1>
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <label>Current Names</label>
              </div>
              <div style={{ flex: 1 }}>
                <label>Enter New Names</label>
              </div>
            </div>
            <div style={{ color: "white", marginBottom: "10px" }}>
              {columnNames.map((name, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <label style={{ flex: 1, marginRight: "10px" }}>
                    {name}:
                  </label>
                  <input
                    type="text"
                    value={null}
                    onChange={(e) =>
                      handleEditColumnName(index, e.target.value)
                    }
                    style={{ flex: 1 }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className="actions"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <button
              className="smallButton"
              onClick={() => setIsEditingColumnNames(false)}
            >
              Cancel
            </button>
            <button
              className="smallButton"
              onClick={handleSaveColumnNames}
              style={{ width: "170px", marginLeft: "10px" }}
            >
              Save Column Names
            </button>
          </div>
        </div>
      );
    }
  }
};

export default Home;
