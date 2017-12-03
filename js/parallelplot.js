class ParallelChart {

constructor(){

    this.svgWidth = 1500;
    this.svgHeight = 600;
    let parallelDiv = d3.select("#parallelChart")

    this.margin = {top: 30, right: 20, bottom: 30, left: 100};
    this.svg =parallelDiv.append("svg")
                        .attr("width",this.svgWidth)
                        .attr("height",this.svgHeight)
                        .attr("transform", "translate(0 ,50)")

}

updateParallelPlot(yearData){
  // console.log("here"+yearData.case_status)
  console.log(yearData)
  d3.select("#parallelChart").selectAll('svg').remove();
  this.svg = d3.select("#parallelChart").append("svg")
                      .attr("width",this.svgWidth)
                      .attr("height",this.svgHeight)
                      .attr("transform", "translate(0 ,50)")
                      .attr("height",this.svgHeight);
                      let THIS = this
                      let yAxis =d3.axisRight();
                      let yScales ={}
                      let column_names = ['Case_Status', 'Class_Of_Admission', 'US_Economic_Sector', 'Employer_State', 'Country_Of_Citzenship' ]
                        // Extract the list of column_names and create a scale for each.
                      let xScale = d3.scaleBand()
                                    .domain(column_names)
                                    .range([this.margin.left, this.svgWidth-this.margin.right]);

                      for (let i=0; i<column_names.length; i++) {
                        let temp =[]
                        let country ={}
                        // if (column_names[i] == 'country_of_citzenship'){
                        //   for (let j =0; j<yearData.length; j++){
                        //     let key = yearData[j][column_names[i]]
                        //     if (key in country){
                        //         country[yearData[j][column_names[i]]] += 1
                        //     }else{
                        //         country[yearData[j][column_names[i]]] = 1
                        //     }
                        //   }
                        //   // Create items array
                        //   let items = Object.keys(country).map(function(key) {
                        //       return [key, country[key]];
                        //   });
                        //
                        //   // Sort the array based on the second element
                        //   items.sort(function(first, second) {
                        //       return second[1] - first[1];
                        //   });
                        //   let temp1 = items.slice(0, 10)
                        //   console.log(temp1)
                        //   for (let k = 0; k<temp.length; k++){
                        //     temp.push(temp1[k][0])
                        //   }
                        //   temp.push("other")
                        //
                        // }else{
                          for (let j =0; j<yearData.length; j++){
                            temp.push(yearData[j][column_names[i]])
                          }
                        // }
                        let tempArray = [...new Set(temp)]
                        yScales[column_names[i]] = d3.scaleBand()
                                                    .domain(tempArray)
                                                    .range([this.margin.top, this.svgHeight - this.margin.bottom])
                                                    .padding(1)
                                                    .round(true);
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
                          .attr("class", "column")
                          .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; });

                      // Add an axis and title.
                      g.append("g")
                          .attr("class", "axis")
                          .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll('text')
                          .style("font-size",12)
                          .style("fill",'black');})
                            .append("text")
                              .style("text-anchor", "middle")
                              .attr("y", 12)
                              .text(function(d,i) { console.log(d); return d; })
                              .style("stroke","black")
                              .style("font-size",15)
                              .style("fill",'black');



                        // Add and store a brush for each axis.
                       g.append("g")
                           .attr("class", "brush")
                           .each(function(d) {
                             d3.select(this).call(yScales[d].brush = d3.brushY().extent([[-10,THIS.margin.top],[10,(THIS.svgHeight - THIS.margin.bottom)]]).on("brush", brush));
                           })
                         .selectAll("rect")
                           .attr("x", -8)
                           .attr("width", 16);

                      console.log(yScales)
                      // Returns the path for a given data point.
                      function path(d) {
                        return line(column_names.map(function(p) {
                          return [xScale(p), yScales[p](d[p])]; }));
                      }

                      function getRandom(arr, n) {
                          var result = new Array(n),
                              len = arr.length,
                              taken = new Array(len);
                          if (n > len)
                              throw new RangeError("getRandom: more elements taken than available");
                          while (n--) {
                              var x = Math.floor(Math.random() * len);
                              result[n] = arr[x in taken ? taken[x] : x];
                              taken[x] = --len;
                          }
                          return result;
                      }

                      // Handles a brush event, toggling the display of foreground lines.
                    function brush() {

                      var actives = [];
                        d3.selectAll(".brush")
                          .filter(function(d) {
                            return d3.brushSelection(this);
                          })
                          .each(function(d) {
                            actives.push({
                              dimension: d,
                              extent: d3.brushSelection(this)
                            });
                          });
                      let extents = actives.map(function(p) { return p.extent});
                      console.log(actives, extents)
                      foreground.style("display", function(d) {
                        return actives.every(function(p, i) {
                          console.log(d[p.dimension]  )
                          return extents[i][0] <= yScales[p.dimension](d[p.dimension]) && yScales[p.dimension](d[p.dimension]) <= extents[i][1];

                        }) ? null : "none";
                      });
                    }

                    }



                    }
