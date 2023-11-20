import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const ScatterPlot = ({ data, columnNames }) => {
  const { xArray, yArray } = data;
  const { xColumn, yColumn } = columnNames;

  // State to hold the Plotly data
  const [plotData, setPlotData] = useState([]);
  const [xAxis, setXAxis] = useState(columnNames.xColumn);
  const [yAxis, setYAxis] = useState(columnNames.yColumn);

  useEffect(() => {
    if (xArray && yArray) {
      setPlotData([
        {
          x: xArray,
          y: yArray,
          type: "scatter",
          mode: "markers",
          marker: { color: "#55CD9C" },
        },
      ]);
      setXAxis(xColumn);
      setYAxis(yColumn);
      console.log("x axis label: " + xColumn);
      console.log("y axis label: " + yColumn);
    }
  }, [xArray, yArray, xColumn, yColumn]);

  return (
    <Plot
      data={plotData}
      layout={{
        width: 600,
        height: 400,
        margin: {
          l: 60,
          r: 20,
          b: 50,
          t: 20,
        },
        xaxis: {
          title: xAxis,
        },
        yaxis: {
          title: yAxis,
        },
      }}
    />
  );
};

export default ScatterPlot;
