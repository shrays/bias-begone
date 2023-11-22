import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ columnNames, values }) => {
  const trace = {
    type: 'bar',
    x: values,
    y: columnNames,
    orientation: 'h',
    marker: {
      color: 'lightgreen'
    },
  };

  const indices = values.map((value, index) => [value, index])
    .sort((a, b) => a[0] - b[0])
    .map(pair => pair[1]);

  const sortedValues = indices.map(index => values[index]);
  const sortedColumnNames = indices.map(index => columnNames[index]);

  return (
    <Plot
      data={[{ ...trace, x: sortedValues, y: sortedColumnNames }]}
      layout={{
        xaxis: { title: 'Score Against "Loan_Status', automargin: true },
        yaxis: { 
          automargin: true,
          tickfont: { size: 12 }, 
          tickwidth: 10
        },
        margin: { l: 300, r: 30, t: 30, b: 30 }, 
        height: 400,
        width: 600
      }}
      config={{ responsive: true }}
    />
  );
};

export default BarChart;
