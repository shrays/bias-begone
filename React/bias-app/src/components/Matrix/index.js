import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};


const Matrix = ({ data, columnNames }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && columnNames && d3Container.current) {
      d3.select(d3Container.current).html("");

      const margin = { top: 80, right: 50, bottom: 50, left: 80 };
      const width = 450 - margin.left - margin.right;
      const height = 450 - margin.top - margin.bottom;

      const svg = d3.select(d3Container.current)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleBand()
                       .range([0, width])
                       .domain(d3.range(data.length))
                       .padding(0.05);

      const myColor = d3.scaleDiverging()
                        .interpolator(d3.interpolateRdBu)
                        .domain([1, 0, -1]);

      svg.selectAll('rect')
         .data(data.flat())
         .enter()
         .append("rect")
         .attr("x", (d, i) => xScale(i % data.length))
         .attr("y", (d, i) => xScale(Math.floor(i / data.length)))
         .attr("width", xScale.bandwidth())
         .attr("height", xScale.bandwidth())
         .style("fill", d => myColor(d));

      svg.selectAll('text.value')
         .data(data.flat())
         .enter()
         .append("text")
         .classed('value', true)
         .text(d => d.toFixed(2))
         .attr("x", (d, i) => xScale(i % data.length) + xScale.bandwidth() / 2)
         .attr("y", (d, i) => xScale(Math.floor(i / data.length)) + xScale.bandwidth() / 2)
         .attr("text-anchor", "middle")
         .attr("dy", ".35em")
         .style("fill", d => Math.abs(d) > 0.5 ? "white" : "black")
         .style("font-size", "10px");

      svg.selectAll('text.colname')
      .data(columnNames)
      .enter()
      .append("text")
      .classed('colname', true)
      .text(d => truncateText(d, 10))
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr("y", 0)
      .style("text-anchor", "start")
      .attr("transform", (d, i) => `translate(0, -5) rotate(-45, ${xScale(i) + xScale.bandwidth() / 2}, 0)`) // Rotate the text
      .style("font-size", "12px")

      svg.selectAll('text.rowname')
         .data(columnNames)
         .enter()
         .append("text")
         .classed('rowname', true)
         .text(d => d)
         .attr("x", -10)
         .attr("y", (d, i) => xScale(i) + xScale.bandwidth() / 2)
         .attr("dy", ".35em")
         .attr("text-anchor", "end")
         .style("font-size", "12px");
    }
  }, [data, columnNames]);

  return (
    <svg className="d3-component" ref={d3Container} />
  );
};

export default Matrix;
