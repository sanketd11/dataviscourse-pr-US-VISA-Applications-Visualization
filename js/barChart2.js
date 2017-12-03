class BarChart2{

    constructor() {
      this.svgWidth = 600;
      this.svgHeight = 540;
      let barDiv = d3.select("#barChart2")

      this.margin = {top:30, right: 20, bottom: 30, left: 50};
      this.svg =barDiv.append("svg")
                          .attr("width",this.svgWidth)
                          .attr("height",this.svgHeight)
                          .attr("transform", "translate(0 ,0)")
      this.svg.append("text")
          .attr("x", (this.svgWidth / 2))
          .attr("y",(15))
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text("Application Counts (Visa Type)");
      this.xAxis = this.svg.append('g')
              .attr('id', 'xAxisBar2');

      this.yAxis = this.svg.append('g')
              .attr('id', 'yAxisBar2');
      this.barsArea = this.svg.append('g')
              .attr('id', 'barsArea');

    }

    updateBar(data){
      let THIS =this
      // draw legend
      let typeArr = ["Certified", 'Denied', "Withdrawn", "Certified_Expired"]

      let color = [ "#56ef89","#c10b0b", "#840ac1","#000000"]
      let legend = this.svg.selectAll(".legend")
      .data(typeArr);
      legend
      .enter().append("g")
      .merge(legend)
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .each(function(d,i){
        let j =i
        // draw legend colored rectangles
        let legendbar = d3.select(this).selectAll('rect').data([d]);

        legendbar.enter().append("rect").merge(legendbar)
        .attr("x", THIS.svgWidth - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return color[j]; });

        legendbar.exit().remove();


        // draw legend text
        let legendText = d3.select(this).selectAll('text').data([d]);
        legendText.enter().append("text").merge(legendText)
        .attr("x", THIS.svgWidth - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})
        legendText.exit().remove();
      });
      legend.exit().remove();


      console.log("barchart2:-->", data);
      data = data.sort(function(a,b){
          if (d3.sum(a.values,function(v){ return v.value})> d3.sum(b.values,function(v){ return v.value})){
            return -1
          }else{
            return 1
          }
      })
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
        .transition()
        .duration(1500)
        .call(xAxis);

      d3.select("#yAxisBar2")
        .attr("transform", "translate("+this.margin.left+","+0+")")
        .transition()
        .duration(1500)
      .call(yAxis);

      let barNames = ["Denied","Withdrawn", "Certified","Certified_Expired"]
      let chooseColor={
        "Denied" : "#c10b0b",
        "Withdrawn": "#840ac1",
         "Certified":"#56ef89",
        "Certified_Expired": "#000000"
      }


      let barsG = this.barsArea.selectAll('g').data(data);
      barsG.enter().append('g').merge(barsG);
      barsG.exit().remove();

      let barsG_ =this.barsArea.selectAll('g').data(data);
      barsG_
            .each(function(d,i){
          let j = d.key;
          let data_ = d.values
          let sumArray = [0]
          // let sum =0
          for (let k = 1; k<data_.length; k++){
            sumArray.push(sumArray[k-1]+data_[k-1].value)
          }
          let bar = d3.select(this).attr("transform", "translate(0,"+(THIS.svgHeight - THIS.margin.bottom)+") scale(1,-1)").selectAll('rect').data(data_);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('y', function(d,i){

                return (THIS.svgHeight - THIS.margin.bottom - yScale(sumArray[i]))

            })
            .attr('x', function(d){
              return xScale(j)+22;
            })  .attr('height',0).transition().duration(1500)
            .attr('height', function(d,i){
              return (THIS.svgHeight - THIS.margin.bottom -yScale(data_[i].value))
            })
            .attr('width', 30)
            .style('fill', function(d,i){
              return chooseColor[d.key];
            });
        bar.exit().remove();

        let bartitle = d3.select(this).selectAll('rect').data(data_);
        bartitle.each(function(d){
          let t =d3.select(this).selectAll('title').data([0]);
          t.enter().append('title')
          .merge(t)
          .text('Case State: '+d.key+"\nApplication Count: "+d.value);
          t.exit().remove();
        });
        bartitle.exit().remove();
      })

    }


    updateAllBar(data){

      let THIS =this
      // draw legend
      let barNames = ["2011","2012", "2013","2014","2015","2016"]

      let color = ["#56ef89","#c10b0b","#840ac1","#ffab44", "#ff0044","#1500ff"]
      let legend = this.svg.selectAll(".legend")
      .data(barNames);
      legend
      .enter().append("g")
      .merge(legend)
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .each(function(d,i){
        let j =i
        // draw legend colored rectangles
        let legendbar = d3.select(this).selectAll('rect').data([d]);

        legendbar.enter().append("rect").merge(legendbar)
        .attr("x", THIS.svgWidth - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return color[j]; });

        legendbar.exit().remove();


        // draw legend text
        let legendText = d3.select(this).selectAll('text').data([d]);
        legendText.enter().append("text").merge(legendText)
        .attr("x", THIS.svgWidth - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d;})
        legendText.exit().remove();
      });
      legend.exit().remove()





      console.log("Final:---->",data);
      data = data.sort(function(a,b){
          if ( d3.sum(a.value, function(v){return v.value;})>  d3.sum(b.value, function(v){return v.value;})){
            return -1
          }else{
            return 1
          }
      })
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
        .transition()
        .duration(1500)
        .call(xAxis);

      d3.select("#yAxisBar2")
        .attr("transform", "translate("+this.margin.left+","+0+")")
        .transition()
        .duration(1500)
      .call(yAxis);


      let chooseColor={
        0 : "#56ef89",
        1: "#c10b0b",
        2:"#840ac1",
        3: "#ffab44",
        4: "#ff0044",
        5:  "#1500ff"
      }


      let barsG = this.barsArea.selectAll('g').data(data);
      barsG.enter().append('g').merge(barsG);
      barsG.exit().remove();

      let barsG_ =this.barsArea.selectAll('g').data(data);


      barsG_.each(function(d,i){
          let j = d.key;
          let data_ = d.value
          console.log("DATA: -----",data_)
          let sumArray = [0]
          // let sum =0
          for (let k = 1; k<data_.length; k++){
            sumArray.push(sumArray[k-1]+data_[k-1].value)
          }
          console.log(sumArray)
          let bar = d3.select(this).attr("transform", "translate(0,"+(THIS.svgHeight - THIS.margin.bottom)+") scale(1,-1)").selectAll('rect').data(sumArray);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('y', function(d,i){
              // if (i==0){
              //   return (THIS.svgHeight - THIS.margin.bottom - yScale(THIS.margin.bottom));
              // }else{
              //   let key = barNames[(i-1)]
                return (THIS.svgHeight - THIS.margin.bottom - yScale(d))
              // }
            })
            .attr('x', function(d){
              return xScale(j)+22;
            })
            .attr('height',0).transition().duration(1500)
            .attr('height', function(d,i){
              return (THIS.svgHeight - THIS.margin.bottom - yScale(data_[i].value))
            })
            .attr('width', 30)
            .style('fill', function(d,i){
              return chooseColor[i];
            });

        bar.exit().remove();
                let bartitle = d3.select(this).selectAll('rect').data(data_);
                bartitle.each(function(d){
                  let t =d3.select(this).selectAll('title').data([0]);
                  t.enter().append('title')
                  .merge(t)
                  .text('Year: '+d.key+"\nApplication Count: "+d.value);
                  t.exit().remove();
                });
                bartitle.exit().remove();
      })
    }

}
