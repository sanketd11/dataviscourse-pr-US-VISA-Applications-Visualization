class BarChart2{

    constructor() {
      this.svgWidth = 500;
      this.svgHeight = 550;
      let barDiv = d3.select("#barChart2")

      this.margin = {top: 30, right: 20, bottom: 30, left: 50};
      this.svg =barDiv.append("svg")
                          .attr("width",this.svgWidth)
                          .attr("height",this.svgHeight)
                          .attr("transform", "translate(0 ,0)")
      this.xAxis = this.svg.append('g')
              .attr('id', 'xAxisBar2');

      this.yAxis = this.svg.append('g')
              .attr('id', 'yAxisBar2');
      this.barsArea = this.svg.append('g')
              .attr('id', 'barsArea');

    }

    updateBar(data){
      let THIS =this
      console.log("barchart2:-->", data);
      let max_count = d3.max(data, function(d){ return d3.sum(d.values, function(v){ return v.value;})})
      console.log("Max Count: "+max_count)
      let visaTypes = []
      for (let i =0; i<data.length; i++){
        visaTypes.push(data[i].key)
      }
      // console.log(visaTypes)
      // Add domain according to the sector names
      let xScale = d3.scaleBand()
                  .domain(visaTypes)
                  .range([this.margin.left, this.svgWidth - this.margin.right])

      // Add the domain according to the max and min counts
      let yScale= d3.scaleLinear()
                  .domain([0, max_count])
                  .range([ (this.svgHeight-this.margin.top), 0])
      // let yScale2= d3.scaleLinear()
      //             .domain([0, max_count])
      //             .range([  0, this.svgHeight-this.margin.bottom,])

      //X axis
      let xAxis = d3.axisBottom().scale(xScale);
      //Y axis
      let yAxis = d3.axisLeft().scale(yScale);

      d3.select('#xAxisBar2')
        .attr("transform", "translate(0,"+(this.svgHeight- this.margin.bottom)+")")
        .call(xAxis);

      d3.select("#yAxisBar2")
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
      barsG_
            .each(function(d,i){
          let j = d.key;
          let data_ = d.values
          let sumArray = []
          let sum =0
          for (let k = 0; k<data_.length; k++){
            sumArray.push(sum+data_[k].value)
            sum+= data_[k].value
          }
          let bar = d3.select(this).attr("transform", "translate(0,"+(THIS.svgHeight - THIS.margin.bottom)+") scale(1,-1)").selectAll('rect').data(d.values);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('y', function(d,i){
              if (i==0){
                return (THIS.svgHeight - THIS.margin.bottom - yScale(THIS.margin.bottom));
              }else{
                let key = barNames[(i-1)]
                return (THIS.svgHeight - THIS.margin.bottom - yScale(sumArray[(i-1)]))
              }
            })
            .attr('x', function(d){
              return xScale(j)+10;
            })
            .attr('height', function(d,i){
              return (THIS.svgHeight - THIS.margin.bottom -yScale(data_[i].value))
            })
            .attr('width', 30)
            .style('fill', function(d,i){
              return chooseColor[i];
            });
        bar.exit().remove();
      })

    }


    updateAllBar(data){
        let THIS =this
      console.log("Final:---->",data);
      let max_count = d3.max(data, function(d){ return d3.sum(d.value, function(v){ console.log(v.key,v.value);return v.value;})})
      console.log("Max Count"+max_count)
      let visaTypes = []
      for (let i =0; i<data.length; i++){
        visaTypes.push(data[i].key)
      }
      // console.log(visaTypes)
      // Add domain according to the sector names
      let xScale = d3.scaleBand()
                  .domain(visaTypes)
                  .range([this.margin.left, this.svgWidth - this.margin.right])

      // Add the domain according to the max and min counts
      let yScale= d3.scaleLinear()
                  .domain([0, max_count])
                  .range([ (this.svgHeight-this.margin.top), 0])

      //X axis
      let xAxis = d3.axisBottom().scale(xScale);
      //Y axis
      let yAxis = d3.axisLeft().scale(yScale);

      d3.select('#xAxisBar2')
        .attr("transform", "translate(0,"+(this.svgHeight- this.margin.bottom)+")")
        .call(xAxis);

      d3.select("#yAxisBar2")
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
          let bar = d3.select(this).attr("transform", "translate(0,"+(THIS.svgHeight - THIS.margin.bottom)+") scale(1,-1)").selectAll('rect').data(data_);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('y', function(d,i){
              if (i==0){
                return (THIS.svgHeight - THIS.margin.bottom - yScale(THIS.margin.bottom));
              }else{
                let key = barNames[(i-1)]
                return (THIS.svgHeight - THIS.margin.bottom - yScale(sumArray[(i-1)]))
              }
            })
            .attr('x', function(d){
              return xScale(j)+10;
            })
            .attr('height', function(d,i){
              return (THIS.svgHeight - THIS.margin.bottom - yScale(data_[i].value))
            })
            .attr('width', 30)
            .style('fill', function(d,i){
              return chooseColor[i];
            })
            .append('title')
            .text(function(d,i){
              return (data_[i].key+ "\nApplication Count: "+ data_[i].value)
            });
        bar.exit().remove();
      })
    }

}
