import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Matrix from "../components/Matrix";
import ScatterPlot from "../components/Scatterplot";

const LinearCorrelation = () => {
  const location = useLocation();
  const [visibleSummaryIndex, setVisibleSummaryIndex] = useState(0);
  const [visibleTipsIndex, setVisibleTipsIndex] = useState(0);
  const [selectedData, setSelectedData] = useState({ xArray: [], yArray: [] });
  const { summary, tips, heatMap, columnNames } = location.state;

  const typeSummary = () => {
    const text = summary;

    if (visibleSummaryIndex < text.length) {
      setTimeout(() => {
        setVisibleSummaryIndex(visibleSummaryIndex + 1);
      }, 50); // Reduce the delay for a faster animation
    }
  };

  const typeTips = () => {
    const text = tips;

    if (visibleTipsIndex < text.length) {
      setTimeout(() => {
        setVisibleTipsIndex(visibleTipsIndex + 1);
      }, 50); // Reduce the delay for a faster animation
    }
  };

  // a callback function to render scatter plot after a cell is clicked
  const renderScatterPlot = (xArray, yArray, xColumn, yColumn) => {
    setSelectedData({ xArray, yArray });
    setSelectedColumn({ xColumn, yColumn });
    console.log("selected columns: " + xColumn + " " + yColumn);
  };

  typeSummary();
  typeTips();
  return (
    <div>
      <div
        className="flex-container"
        style={{
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: "20px", // Add padding to create space below the container
        }}
      >
        <div className="flex-left">
          <h1 style={{ textAlign: "center", margin: "0", width: "100%" }}>Heatmap</h1>
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
          <h1 style={{ textAlign: "center", margin: "0", width: "100%" }}>Scatter Plot</h1>
          <div>
            <ScatterPlot data={selectedData} columnNames={selectedColumn} />
          </div>
        </div>
      </div>
  
      <div
        className="flex-container"
        style={{
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: "20px", // Add padding to create space below the container
        }}
      >
        <div className="flex-left">
          <h1 style={{ textAlign: "center", margin: "0 0 10px 0", width: "100%" }}>Summary</h1>
          <p style={{ textAlign: "left" }}>{summary.slice(0, visibleSummaryIndex)}</p>
        </div>
        <div className="flex-right">
          <h1 style={{ textAlign: "center", margin: "0 0 10px 0", width: "100%" }}>Recommendations</h1>
          <p style={{ textAlign: "left" }}>{tips.slice(0, visibleTipsIndex)}</p>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default LinearCorrelation;
