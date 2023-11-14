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
  Start,
  setIsEditingButtonVisible,
}) => {
  return (
    <div className="flex-item">
      <h1>Upload File</h1>
      <h2>
        Start detecting the bias in your dataset by uploading your csv file
      </h2>
      <div className="dropZone" onDragOver={onDragOver} onDrop={onDrop}>
        {/* Conditional rendering based on whether files are present */}
        {!files && (
          <>
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
              onChange={(event) => onFilesSelected(event.target.files)}
              hidden
              ref={inputref}
            />
            <button
              className="uploadButton"
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
                        style={{ width: "170px" }}
                      >
                        Edit Column Names
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "12px",
                      }}
                    >
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
