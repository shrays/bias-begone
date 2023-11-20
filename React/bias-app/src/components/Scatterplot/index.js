import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data }) => {
  const d3Container = useRef(null);
  const { xArray, yArray } = data;
  //const { xArray, yArray } = generateDummyData(50);

  useEffect(() => {
    if (xArray && yArray && d3Container.current) {
      // remove existing scatter plot
      d3.select(d3Container.current).selectAll("*").remove();

      // print xarray yarray
      console.log(xArray);
      console.log(yArray);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Set up SVG
      const svg = d3
        .select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set up scales
      const xScale = d3
        .scaleLinear()
        .domain([d3.min(xArray), d3.max(xArray)])
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([d3.min(yArray), d3.max(yArray)])
        .range([height, 0]);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      // Add Y axis
      svg.append("g").call(d3.axisLeft(yScale));

      //   const line = d3
      //     .line()
      //     .x((d, i) => xScale(xArray[i]))
      //     .y((d) => yScale(d));

      //   // Add the line path
      //   svg
      //     .append("path")
      //     .datum(yArray) // Binds data to the line
      //     .attr("fill", "none")
      //     .attr("stroke", "#69b3a2")
      //     .attr("stroke-width", 1.5)
      //     .attr("d", line);

      // Add points
      svg
        .selectAll(".dot")
        .data(xArray.map((x, i) => ({ x, y: yArray[i] })))
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .style("fill", "#55CD9C");
    }
  }, [data]);

  return <svg className="d3-component" ref={d3Container} />;
};

const generateDummyData = (numPoints) => {
  const xArray = [];
  const yArray = [];

  for (let i = 0; i < numPoints; i++) {
    xArray.push(Math.random() * 100); // Random x value between 0 and 100
    yArray.push(Math.random() * 100); // Random y value between 0 and 100
  }

  return { xArray, yArray };
};

export default ScatterPlot;
