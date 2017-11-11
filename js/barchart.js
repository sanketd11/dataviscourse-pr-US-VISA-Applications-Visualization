class BarChart{

    constructor() {
      this.svgWidth = 500;
      this.svgHeight = 800;
      let barDiv = d3.select("#barChart")

      this.margin = {top: 30, right: 20, bottom: 30, left: 100};
      this.svg =barDiv.append("svg")
                          .attr("width",this.svgWidth)
                          .attr("height",this.svgHeight)
                          .attr("transform", "translate(0 ,50)")
      this.xAxis = this.svg.append('g')
              .attr('id', 'xAxisBar');

      this.yAxis = this.svg.append('g')
              .attr('id', 'yAxisBar');

    }

    updateBar(data){
      console.log(data);
      let sectors = []
      let sectorCount = []
      let max_count =0
      for (let i =0; i<data.length; i++){
        sectors.push(data[i].US_Economic_Sector)
        sectorCount.push(parseInt(data[i].Count))
        if (parseInt(data[i].Count)>max_count){
          max_count = parseInt(data[i].Count)
        }
      }
      console.log(sectors)
      // Add domain according to the sector names
      let yScale = d3.scaleBand()
                  .domain(sectors)
                  .range([this.margin.top, this.svgHeight - this.margin.bottom])

      // Add the domain according to the max and min counts
      let xScale= d3.scaleLinear()
                  .domain([0, max_count])
                  .range([this.margin.left, this.svgWidth - this.margin.right])

      //X axis
      let xAxis = d3.axisTop().scale(xScale);
      //Y axis
      let yAxis = d3.axisLeft().scale(yScale);

      d3.select('#xAxisBar')
        .attr("transform", "translate(0,"+(this.margin.top)+")")
        .call(xAxis);

      d3.select("#yAxisBar")
        .attr("transform", "translate("+this.margin.left+","+0+")")
      .call(yAxis);

      let bars = this.svg.selectAll('rect').data(data);
      let bars_update = bars.enter()
                        .append('rect')
                        .attr('x', xScale(0)+5)
                        .attr('y', function(d){
                          return yScale(d.US_Economic_Sector)+7.5;
                        })
                        .attr('width', function(d){
                          return xScale(d.Count)
                        })
                        .attr('height', 30)
                        .style('fill', 'steelblue');
      bars.exit().remove()



    }

}
