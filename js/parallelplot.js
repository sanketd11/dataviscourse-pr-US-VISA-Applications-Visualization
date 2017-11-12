class ParallelChart {

constructor(){

    this.svgWidth = 900;
    this.svgHeight = 500;
    let parallelDiv = d3.select("#parallelChart")

    this.margin = {top: 30, right: 20, bottom: 30, left: 100};
    this.svg =parallelDiv.append("svg")
                        .attr("width",this.svgWidth)
                        .attr("height",this.svgHeight)
                        .attr("transform", "translate(0 ,50)")

}

updateParallelPlot(yearData){
  // console.log("here"+yearData.case_status)
  let yScales ={}
  let column_names = ['case_status', 'class_of_admission', 'us_economic_sector', 'pw_job_title_9089', 'employer_name', 'job_info_work_state']
    // Extract the list of column_names and create a scale for each.
  let xScale = d3.scaleBand()
                .domain(column_names)
                .range([this.margin.left, this.svgWidth-this.margin.right]);

  for (let i=0; i<column_names.length; i++) {
    let temp []
    for (let j =0; j<yearData.length; j++){
      temp.push(yearData[j][column_names[i]])
    }
    let tempArray = [...new Set(temp)]
    yScales[column_names[i]] = d3.scaleBand()
                                .domain(tempArray)
                                .range([this.margin.top, this.svgHeight - this.margin.bottom]);
  }

  // define the line
  let line = d3.line();


  // Add grey background lines for context.
  let background = this.svg.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(yearData)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  let foreground = this.svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(yearData)
    .enter().append("path")
      .attr("d", path);

  // Add a group element for each dimension.
  let g = this.svg.selectAll(".column")
      .data(column_names)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; });

  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(yScales[d])); })
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; });

  // Returns the path for a given data point.
  function path(d) {
    return line(column_names.map(function(p) { return [xScale(p), yScales[p](d[p])]; }));
  }

}



}
