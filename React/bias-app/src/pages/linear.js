import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Matrix from "../components/Matrix";
import ScatterPlot from "../components/Scatterplot";

const LinearCorrelation = () => {
  const location = useLocation();
  const [visibleTextIndex, setVisibleTextIndex] = useState(0);
  const [selectedData, setSelectedData] = useState({ xArray: [], yArray: [] });
  const { openai_resp, heatMap, columnNames } = location.state;

  const typeOpenaiResp = () => {
    const text = openai_resp;

    if (visibleTextIndex < text.length) {
      setTimeout(() => {
        setVisibleTextIndex(visibleTextIndex + 1);
      }, 50); // Reduce the delay for a faster animation
    }
  };

  useEffect(() => {
    console.log("linear.js");
    console.log(selectedData.xArray);
    console.log(selectedData.yArray);
  }, [selectedData]);

  // a callback function to render scatter plot after a cell is clicked
  const renderScatterPlot = (xArray, yArray) => {
    setSelectedData({ xArray, yArray });
  };

  typeOpenaiResp();
  return (
    <div>
      <div
        className="flex-container"
        style={{
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div className="flex-left">
          <div className="linear-heading ">Heatmap</div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Matrix
              data={heatMap}
              columnNames={columnNames}
              onCellClick={renderScatterPlot}
            />
          </div>
        </div>
        <div className="flex-right">
          <div className="linear-heading">Scatter Plot</div>
          <div>
            <ScatterPlot data={selectedData} />
          </div>
        </div>
      </div>
      <h1 style={{ marginLeft: "210px", marginBottom: "-20px" }}>Summary</h1>
      <div className="left-aligned-boundary">
        <p style={{ textAlign: "left" }}>
          {openai_resp.slice(0, visibleTextIndex)}
        </p>
      </div>
      <p>test</p>
    </div>
  );
};

export default LinearCorrelation;
