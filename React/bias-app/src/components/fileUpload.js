import React, { useRef } from "react";
import PropTypes from "prop-types";

const FileUploadArea = ({
  onFilesSelected,
  onDragOver,
  onDrop,
  files,
  inputref,
  HandleUpload,
  isEditingButtonVisible,
  setIsEditingColumnNames,
  setFiles,
  HandleStart,
  setIsEditingButtonVisible,
}) => {
  return (
    <div className="flex-item">
      <h1>Upload File</h1>
      <h2 style={{ marginTop: "1rem" }}>
        Start detecting the bias in your dataset by uploading your csv file
      </h2>
      <div className="dropZone" onDragOver={onDragOver} onDrop={onDrop}>
        {/* Conditional rendering based on whether files are present */}
        {!files && (
          <>
            <img
              src={require("../Assets/upload.png")}
              style={{ width: "5vw", height: "5vw", marginBottom: "2rem" }}
            />
            <p> Drag and drop files to upload </p>
            <p style={{ fontSize: "1rem" }}>OR</p>
            <input
              className="uploadButton"
              type="file"
              multiple
              onChange={(event) => onFilesSelected(event.target.files)}
              hidden
              ref={inputref}
            />
            <button
              className="smallButton"
              style={{ width: "145px", height: "35px" }}
              onClick={() => inputref.current.click()}
            >
              Browse Files
            </button>
          </>
        )}
        {files && (
          <>
            <img
              src={require("../Assets/document.png")}
              style={{ width: "5vw", height: "5vw", marginBottom: "2vw" }}
            />
            {Array.from(files).map((file, idx) => (
              <p key={idx}>{file.name}</p>
            ))}
            <div className="actions">
              {isEditingButtonVisible ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="smallButton"
                      onClick={() => setIsEditingColumnNames(true)}
                      style={{ width: "200px" }}
                    >
                      Edit Column Names
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "12px",
                      width: "200px",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      className="cancelButton"
                      onClick={() => {
                        setFiles(null);
                        setIsEditingButtonVisible(false);
                      }}
                      style={{ marginRight: "1vw", width: "80px" }}
                    >
                      Cancel
                    </button>
                    <button
                      className="smallButton"
                      style={{ width: "100px" }}
                      onClick={HandleStart}
                    >
                      Start
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "8px" }}>
                  <button
                    className="cancelButton"
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
              )}
              {/* <div style={{ marginTop: "10px" }}>
                {isEditingButtonVisible ? (
 
                ) : (
                  <p>Please click upload</p>
                )}
              </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

FileUploadArea.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  files: PropTypes.array,
  onRemoveFiles: PropTypes.func.isRequired,
};

export default FileUploadArea;
