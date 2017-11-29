class LineChart{
  constructor() {
    this.svgWidth = 600;
    this.svgHeight = 500;
    let lineDiv = d3.select("#lineChart")

    this.margin = {top: 10, right: 20, bottom: 30, left: 50};
    this.svg = lineDiv.append("svg")
                        .attr("width",this.svgWidth)
                        .attr("height",this.svgHeight)
                        .attr("transform", "translate(0 ,50)")

    this.linesvg = this.svg.append('g')
                      .attr('id', "line1");
    //Certified
    this.certifiedsvg = this.svg.append('g')
                      .attr('id', "Certified");

    //denied
    this.deniedsvg = this.svg.append('g')
                      .attr('id', "Denied");
    //Withdrawn
    this.Withdrawnsvg = this.svg.append('g')
                      .attr('id', "Withdrawn");
    //Certified_Expired
    this.Certified_Expiredsvg = this.svg.append('g')
                      .attr('id', "Certified_Expired");

    this.xAxis = this.svg.append('g')
            .attr('id', 'xAxis');

    this.yAxis = this.svg.append('g')
            .attr('id', 'yAxis');

    this.yearDataSet={}

    // draw legend
    let typeArr = ["Total Applications","Certified", 'Denied', "Withdrawn", "Certified_Expired"]

    let color = ["#000000", "#56ef89", "#c10b0b","#840ac1","#ffab44"]
    let legend = this.svg.selectAll(".legend")
    .data(typeArr)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
    .attr("x", this.svgWidth - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) { return color[i]; });


    // draw legend text
    legend.append("text")
    .attr("x", this.svgWidth - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d;})





  }

  updateLine(yearCaseCounts,year){

    // Implement Dictionary to keep track of all the years data
    let THIS  = this
    let appCount = 0
    let certifiedCount = 0
    let deniedCount = 0
    let withdrawnCount =0
    let certefiedExpiredCount = 0
    console.log(yearCaseCounts,yearCaseCounts[0].value)
    for (let i=0; i<yearCaseCounts.length; i++){
      appCount += parseInt(yearCaseCounts[i].value);
    }
    // console.log(appCount)\\
    let dataObj = {
      "Year": year,
      "Appcount": appCount,
      "Certified": yearCaseCounts[2].value,
      "Denied": yearCaseCounts[0].value,
      "Withdrawn": yearCaseCounts[1].value,
      "Certified_Expired" : yearCaseCounts[3].value
    };
    this.yearDataSet[year]=dataObj
    // console.log(this.yearDataSet)
    let yearData = [2011, 2012, 2013, 2014, 2015, 2016];
    let xScale = d3.scaleBand()
                   .domain([2011, 2012, 2013, 2014,2015, 2016])
                   .range([this.margin.left, this.svgWidth-this.margin.right]);
    let yScale = d3.scaleLinear()
                  .domain([0, 150000])
                  .range([this.svgHeight-this.margin.bottom,this.margin.bottom]);

    // 7. d3's line generator
    let line = d3.line()
      .x(function(d) { return xScale(d.Year)+50; }) // set the x values for the line generator
      .y(function(d) { return yScale(d.Appcount); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line


    //X axis
    let xAxis = d3.axisBottom().scale(xScale);
    //
    let yAxis = d3.axisLeft().scale(yScale);

    d3.select('#xAxis')
      .attr("transform", "translate(0,"+(THIS.svgHeight- this.margin.bottom)+")")
      .call(xAxis);

    d3.select("#yAxis")
      .attr("transform", "translate("+this.margin.left+","+0+")")
      .call(yAxis);

    // let dots = this.svg.selectAll('circle').data([appCount]);
    //
    // let dots_update = dots.enter()
    //                       .append('circle')
    //                       .merge(dots)
    //                       .attr('cx', function(d,i){
    //                         return xScale(year)+50  // Hard Coded for now
    //                       })
    //                       .attr('cy', function(d){
    //                         return yScale(d);
    //                       })
    //                       .attr('r',5)
    //                       .style('fill', '');
    // dots.exit().remove()
    let dataset = []
    for (let i =0; i<= yearData.indexOf(year); i++){
      dataset.push(this.yearDataSet[yearData[i]])
    }
    console.log(dataset)


   let lines = d3.select('#line1').selectAll('line').data(dataset.slice(0,dataset.length -1));
   lines.enter().append('line')
              .merge(lines)
              .attr('x1', function(d,i){
                  return xScale(d.Year)+50
              })
              .attr('y1', function(d){
                return yScale(d.Appcount)
              })
              .attr('x2',function(d,i){
                if (i< dataset.length -1){
                  return xScale(dataset[i+1].Year)+50
                }
              })
              .attr('y2', function(d,i){
                if (i< dataset.length -1){
                  return yScale(dataset[i+1].Appcount)
                }
              })
              .attr('class', 'line');

   lines.exit().remove();


   // 12. Appends a circle for each datapoint
    let dots = d3.select('#line1').selectAll(".dot")
        .data(dataset);
    dots.enter().append("circle")
        .merge(dots)
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(d.Year)+50 })
        .attr("cy", function(d) { return yScale(d.Appcount) })
        .attr("r", 5);
   dots.exit().remove();

   // Certified
   let linesCertified = d3.select('#Certified').selectAll('line').data(dataset.slice(0,dataset.length -1));
   linesCertified.enter().append('line')
              .merge(linesCertified)
              .attr('x1', function(d,i){
                  return xScale(d.Year)+50
              })
              .attr('y1', function(d){
                return yScale(d.Certified)
              })
              .attr('x2',function(d,i){
                if (i< dataset.length -1){
                  return xScale(dataset[i+1].Year)+50
                }
              })
              .attr('y2', function(d,i){
                if (i< dataset.length -1){
                  return yScale(dataset[i+1].Certified)
                }
              })
              .attr('class', 'lineCeritified');

   linesCertified.exit().remove();


   // 12. Appends a circle for each datapoint
    let dotsCertified = d3.select('#Certified').selectAll(".dot")
        .data(dataset);
    dotsCertified.enter().append("circle")
        .merge(dotsCertified)
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(d.Year)+50 })
        .attr("cy", function(d) { return yScale(d.Certified) })
        .attr("r", 2);
   dotsCertified.exit().remove();

   // Denied
   let linesDenied = d3.select('#Denied').selectAll('line').data(dataset.slice(0,dataset.length -1));
   linesDenied.enter().append('line')
              .merge(linesDenied)
              .attr('x1', function(d,i){
                  return xScale(d.Year)+50
              })
              .attr('y1', function(d){
                return yScale(d.Denied)
              })
              .attr('x2',function(d,i){
                if (i< dataset.length -1){
                  return xScale(dataset[i+1].Year)+50
                }
              })
              .attr('y2', function(d,i){
                if (i< dataset.length -1){
                  return yScale(dataset[i+1].Denied)
                }
              })
              .attr('class', 'lineDenied');

   linesDenied.exit().remove();


   // 12. Appends a circle for each datapoint
    let dotsDenied = d3.select('#Denied').selectAll(".dot")
        .data(dataset);
    dotsDenied.enter().append("circle")
        .merge(dotsDenied)
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(d.Year)+50 })
        .attr("cy", function(d) { return yScale(d.Denied) })
        .attr("r", 2);
   dotsDenied.exit().remove();

   //Withdrawn
   let linesWithdrawn = d3.select('#Withdrawn').selectAll('line').data(dataset.slice(0,dataset.length -1));
   linesWithdrawn.enter().append('line')
              .merge(linesWithdrawn)
              .attr('x1', function(d,i){
                  return xScale(d.Year)+50
              })
              .attr('y1', function(d){
                return yScale(d.Withdrawn)
              })
              .attr('x2',function(d,i){
                if (i< dataset.length -1){
                  return xScale(dataset[i+1].Year)+50
                }
              })
              .attr('y2', function(d,i){
                if (i< dataset.length -1){
                  return yScale(dataset[i+1].Withdrawn)
                }
              })
              .attr('class', 'lineWithdrawn');

   linesWithdrawn.exit().remove();


   // 12. Appends a circle for each datapoint
    let dotsWithdrawn = d3.select('#Withdrawn').selectAll(".dot")
        .data(dataset);
    dotsWithdrawn.enter().append("circle")
        .merge(dotsWithdrawn)
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(d.Year)+50 })
        .attr("cy", function(d) { return yScale(d.Withdrawn) })
        .attr("r", 2);
   dotsWithdrawn.exit().remove();

   //Certified_Expired

   let linesCertified_Expired = d3.select('#Certified_Expired').selectAll('line').data(dataset.slice(0,dataset.length -1));
   linesCertified_Expired.enter().append('line')
              .merge(linesCertified_Expired)
              .attr('x1', function(d,i){
                  return xScale(d.Year)+50
              })
              .attr('y1', function(d){
                return yScale(d.Certified_Expired)
              })
              .attr('x2',function(d,i){
                if (i< dataset.length -1){
                  return xScale(dataset[i+1].Year)+50
                }
              })
              .attr('y2', function(d,i){
                if (i< dataset.length -1){
                  return yScale(dataset[i+1].Certified_Expired)
                }
              })
              .attr('class', 'linesCertified_Expired');

   linesCertified_Expired.exit().remove();


   // 12. Appends a circle for each datapoint
    let dotsCertified_Expired = d3.select('#Certified_Expired').selectAll(".dot")
        .data(dataset);
    dotsCertified_Expired.enter().append("circle")
        .merge(dotsCertified_Expired)
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(d.Year)+50 })
        .attr("cy", function(d) { return yScale(d.Certified_Expired) })
        .attr("r", 2);
   dotsCertified_Expired.exit().remove();

      }


  // clearLine()


};
