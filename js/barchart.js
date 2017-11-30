class BarChart{

    constructor() {
      this.svgWidth = 800;
      this.svgHeight = 550;
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
      this.barsArea = this.svg.append('g')
              .attr('id', 'barsArea');

    }

    updateBar(data){
      console.log(data);
      let max_count = d3.max(data, function(d){ return d3.sum(d.values, function(v){ return v.value;})})
      console.log("Max Count"+max_count)
      let sectors = []
      for (let i =0; i<data.length; i++){
        sectors.push(data[i].key)
      }
      // console.log(sectors)
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

      let barNames = ["Denied","Withdrawn", "Certified","Certified_Expired"]
      let chooseColor={
        0 : "#56ef89",
        1: "#c10b0b",
        2:"#840ac1",
        3: "#ffab44"
      }


      let barsG = this.barsArea.selectAll('g').data(data);
      barsG.enter().append('g').merge(barsG);
      barsG.exit().remove();

      let barsG_ =this.barsArea.selectAll('g').data(data);

      barsG_.each(function(d,i){
          let j = d.key;
          let data_ = d.values
          let sumArray = []
          let sum =0
          for (let k = 0; k<data_.length; k++){
            sumArray.push(sum+data_[k].value)
            sum+= data_[k].value
          }
          let bar = d3.select(this).selectAll('rect').data(d.values);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('x', function(d,i){
              if (i==0){
                return xScale(0)+5;
              }else{
                let key = barNames[(i-1)]
                return xScale(sumArray[(i-1)])+5
              }
            })
            .attr('y', function(d){
              return yScale(j)+3;
            })
            .attr('width', function(d,i){
              return xScale(data_[i].value)
            })
            .attr('height', 20)
            .style('fill', function(d,i){
              return chooseColor[i];
            });
        bar.exit().remove();
      })

    }


    updateAllBar(data){
      console.log(data);
      let max_count = d3.max(data, function(d){ return d3.sum(d.value, function(v){ console.log(v.key,v.value);return v.value;})})
      console.log("Max Count"+max_count)
      let sectors = []
      for (let i =0; i<data.length; i++){
        sectors.push(data[i].key)
      }
      // console.log(sectors)
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

      let barNames = ["2011","2012", "2013","2014","2015","2016"]
      let chooseColor={
        0 : "#56ef89",
        1: "#c10b0b",
        2:"#840ac1",
        3: "#ffab44",
        4: "#ff0044",
        5:  "#000000"
      }


      let barsG = this.barsArea.selectAll('g').data(data);
      barsG.enter().append('g').merge(barsG);
      barsG.exit().remove();

      let barsG_ =this.barsArea.selectAll('g').data(data);


      barsG_.each(function(d,i){
          let j = d.key;
          let data_ = d.value
          console.log("DATA: -----",data_)
          let sumArray = []
          let sum =0
          for (let k = 0; k<data_.length; k++){
            sumArray.push(sum+data_[k].value)
            sum+= data_[k].value
          }
          console.log(sumArray)
          let bar = d3.select(this).selectAll('rect').data(data_);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('x', function(d,i){
              if (i==0){
                return xScale(0)+5;
              }else{
                let key = barNames[i-1]
                return xScale(sumArray[i-1])+5
              }
            })
            .attr('y', function(d){
              return yScale(j)+3;
            })
            .attr('width', function(d,i){
              return xScale(data_[i].value)
            })
            .attr('height', 20)
            .style('fill', function(d,i){
              return chooseColor[i];
            });
        bar.exit().remove();
      })
    }

}
