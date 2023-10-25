import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import api from "../api";

const DisplayBias = () => {
  const handleDownload = () => {
    fetch('/DisplayBias')  // Replace with the actual URL of your FastAPI endpoint
      .then((response) => {
        // Check if the response is OK (status code 200)
        if (response.ok) {
          return response.blob(); // Get the response body as a blob
        } else {
          throw new Error('File download failed');
        }
      })
      .then((blob) => {
        // Create a temporary URL for the blob and initiate the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'your_file.csv'; // Specify the desired filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div className="flex-container">
      <div className="flex-item">
      </div>

      <div className="flex-item">
          
          <button
            className="uploadButton"
            onClick={handleDownload}
          >
            {" "}
            Show Ouput{" "}
          </button>
      </div>
    </div>
    );
}


  
  // const [uploadMessage, setUploadMessage] = useState("");

  // const HandleDownlowd = async (event) => {
  //       const response = await api.get('/DisplayBias/iris.csv');
  //       console.log(response.data.filename);
  //   }
  //   const inputref = useRef();
  //   return (
  //       <div className="flex-container">
  //         <div className="flex-item">
  //         </div>

  //         <div className="flex-item">
              
  //             <button
  //               className="uploadButton"
  //               onChange={(event) => HandleDownlowd(event.target.file)}
  //               onClick={() => inputref.current.click()}
  //               ref={inputref}
  //             >
  //               {" "}
  //               Show Ouput{" "}
  //             </button>
  //         </div>
  //       </div>
  // );
  // }
  export default DisplayBias;