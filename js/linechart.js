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
    this.xAxis = this.svg.append('g')
            .attr('id', 'xAxis');

    this.yAxis = this.svg.append('g')
            .attr('id', 'yAxis');

  }

  updateLine(data){

    // Implement Dictionary to keep track of all the years data
    let THIS  = this
    let appCount = 0
    // let certifiedCount = 0
    // let deniedCount = 0
    // let withdrawnCount =0
    // let certefiedExpiredCount = 0

    for (let i=0; i<data.length; i++){
      appCount += parseInt(data[i].Count);
    }
    console.log(appCount)
    let yearData = [2011, 2012, 2013, 2014, 2015];
    let xScale = d3.scaleBand()
                   .domain([2011, 2012, 2013, 2014,2015])
                   .range([this.margin.left, this.svgWidth-this.margin.right]);
    let yScale = d3.scaleLinear()
                  .domain([0, 10000])
                  .range([this.svgHeight-this.margin.bottom,this.margin.bottom]);

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

    let dots = this.svg.selectAll('circle').data([appCount]);

    let dots_update = dots.enter()
                          .append('circle')
                          .merge(dots)
                          .attr('cx', function(d,i){
                            return xScale('2011')+50  // Hard Coded for now
                          })
                          .attr('cy', function(d){
                            return yScale(d);
                          })
                          .attr('r',10)
                          .style('fill', '');
    dots.exit().remove()
  }
  // clearLine()


};
