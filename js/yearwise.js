class YearChart {

    constructor (mapObject) {

        //Creating YearChart instance
        this.mapObj = mapObject;
        // this.lineChartObj = lineChartObj;


        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 30, left: 20};
        let yearcircles = d3.select("#yearwise")

        this.svgWidth = 700
        this.svgHeight = 100

        //add the svg to the div
        this.svg = yearcircles.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("transform", "translate(0 ,0)")
    };





    /**
     * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
     */
    update (year) {



       console.log(this.electionWinners)
       let THIS = this;
       let yearData = [2011, 2012, 2013, 2014,2015, 2016, 'All'];
       let xScale = d3.scaleBand()
                      .domain([2011, 2012, 2013, 2014,2015, 2016, 'All'])
                      .range([this.margin.left, this.svgWidth])

       let dashlineSelect = this.svg.selectAll('line').data([1])

       let dashline = dashlineSelect.enter()
                                    .append('line')
                                    .attr('x1', xScale(2011))
                                    .attr('y1', (THIS.svgHeight/2)- THIS.margin.bottom)
                                    .attr('x2', xScale('All'))
                                    .attr('y2', (THIS.svgHeight/2) - THIS.margin.bottom)
                                    .attr('stroke-dasharray',"10,1")
                                    .attr('stroke-width',2)
                                    .style('stroke', 'black');
       dashlineSelect.merge(dashline);
       dashlineSelect.exit().remove();
       let container1 = this.svg.selectAll('g').data([0]);
       let newContainer =container1.enter().append('g').merge(container1);
       newContainer.exit().remove()


       let yrChartSelection = this.svg
                          .selectAll('circle')
                          .data(yearData);
       let yrChart = yrChartSelection.enter().append('circle')
                                     .attr('cx',function(d){
                                       return xScale(d);
                                     })
                                     .attr('cy', (THIS.svgHeight/2) - THIS.margin.bottom )
                                     .attr('r',15 )
                                     .attr('id',function(d){
                                       return 'x'+d.toString();
                                     })
                                     .style("fill", 'green');



      yrChartSelection.merge(yrChart);
      yrChartSelection.exit().remove();

      let yrTextselect = this.svg.select('g').selectAll('text')
                                  .data(yearData);

      let yrText = yrTextselect.enter()
                                .append('text')
                                .attr('x', function(d){
                                  return xScale(d);
                                })
                                .attr('y', (THIS.svgHeight/2)+THIS.margin.top)
                                .text(function(d){
                                  return d;
                                })
                                .classed('yeartext', true);

     yrTextselect.merge(yrText);
     yrTextselect.exit().remove();

     d3.selectAll('.highlighted')
      .classed('highlighted', false);
    let id = "#x"+year;
     d3.select(id)
        .classed('highlighted',true);

    };

};