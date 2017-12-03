class BarChart{

    constructor() {
      this.svgWidth = 750;
      this.svgHeight = 550;
      let barDiv = d3.select("#barChart")

      this.margin = {top: 30, right: 20, bottom: 30, left: 100};
      this.svg =barDiv.append("svg")
                          .attr("width",this.svgWidth)
                          .attr("height",this.svgHeight)
                          .attr("transform", "translate(0 ,0)")
      this.xAxis = this.svg.append('g')
              .attr('id', 'xAxisBar');

      this.yAxis = this.svg.append('g')
              .attr('id', 'yAxisBar');
      this.barsArea = this.svg.append('g')
              .attr('id', 'barsArea');

    }

    updateBar(data){


      let THIS = this
      console.log("Economic Bar chart ",data);
      data = data.sort(function(a,b){
          if (d3.sum(a.values,function(v){ return v.value})> d3.sum(b.values,function(v){ return v.value})){
            return -1
          }else{
            return 1
          }
      })
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
                  .range([this.margin.top,( this.svgHeight - this.margin.bottom)])

      // Add the domain according to the max and min counts
      let xScale= d3.scaleLinear()
                  .domain([0, max_count])
                  .range([this.margin.left, (this.svgWidth - this.margin.right)])

      //X axis
      let xAxis = d3.axisTop().scale(xScale);
      //Y axis
      let yAxis = d3.axisLeft().scale(yScale);

      d3.select('#xAxisBar')
        .attr("transform", "translate(0,"+(this.margin.top)+")")
        .transition()
        .duration(1500)
        .call(xAxis);

      d3.select("#yAxisBar")
        .attr("transform", "translate("+this.margin.left+","+0+")")
        .transition()
        .duration(1500)
      .call(yAxis);

      let barNames = ["Denied","Withdrawn", "Certified","Certified_Expired"]
      let chooseColor={
        "Denied" : "#56ef89",
        "Withdrawn": "#c10b0b",
         "Certified":"#840ac1",
        "Certified_Expired": "#1500ff"
      }


      let barsG = this.barsArea.selectAll('g').data(data);
      barsG.enter().append('g').merge(barsG);
      barsG.exit().remove();

      let barsG_ =this.barsArea.selectAll('g').data(data);

      barsG_.each(function(d,i){
          let j = d.key;
          let data_ = d.values
          if (data_.length > 1){

          }
          data_ = data_.sort(function(a,b){
            if (b.key> a.key){
              return -1;
            }else{
              return 1;
            }
          })
          let sumArray = [0]
          // let sum =0
          for (let k = 1; k<data_.length; k++){
            sumArray.push(sumArray[k-1]+data_[k-1].value)
          }
          let bar = d3.select(this).selectAll('rect').data(data_);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('x', function(d,i){
                return xScale(sumArray[i])+1

            })
            .attr('y', function(d){
              return yScale(j)+4;
            })
            .attr('width',0).transition().duration(1500)
            .attr('width', function(d,i){
              return xScale(d.value) - THIS.margin.left
            })
            .attr('height', 20)
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

      let THIS = this
      console.log(data);
      data = data.sort(function(a,b){
          if ( d3.sum(a.value, function(v){return v.value;})>  d3.sum(b.value, function(v){return v.value;})){
            return -1
          }else{
            return 1
          }
      })
      let max_count = d3.max(data, function(d){ let k =d3.sum(d.value, function(v){ console.log(v.key,v.value);return v.value;}); console.log("Max Val ",k);return k })
      console.log("Max Count"+max_count)
      let sectors = []
      for (let i =0; i<data.length; i++){
        sectors.push(data[i].key)
      }
      // console.log(sectors)
      // Add domain according to the sector names
      let yScale = d3.scaleBand()
                  .domain(sectors)
                  .range([this.margin.top, (this.svgHeight - this.margin.bottom)])

      // Add the domain according to the max and min counts
      let xScale= d3.scaleLinear()
                  .domain([0, max_count])
                  .range([this.margin.left, (this.svgWidth - this.margin.right)])

      //X axis
      let xAxis = d3.axisTop().scale(xScale);
      //Y axis
      let yAxis = d3.axisLeft().scale(yScale);

      d3.select('#xAxisBar')
        .attr("transform", "translate(0,"+(this.margin.top)+")")
        .transition()
        .duration(1500)
        .call(xAxis);

      d3.select("#yAxisBar")
        .attr("transform", "translate("+this.margin.left+","+0+")")
        .transition()
        .duration(1500)
      .call(yAxis);

      let barNames = ["2011","2012", "2013","2014","2015","2016"]
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
          data_ = data_.sort(function(a,b){
            if (b.key> a.key){
              return -1;
            }else{
              return 1;
            }
          })
          console.log("DATA: -----",data_)
          let sumArray = [0]
          // let sum =0
          for (let k = 1; k<data_.length; k++){
            sumArray.push(sumArray[k-1]+data_[k-1].value)
          }
          console.log(sumArray)
          let bar = d3.select(this).selectAll('rect').data(sumArray);
          bar.enter()
            .append('rect')
            .merge(bar)
            .attr('x', function(d,i){
              // if (i==0){
              //   return xScale(d);
              // }else{
                console.log("inside stacked bar ---> ", d, " ", xScale(d), "Width ", " ", data_[i].value," ", xScale(data_[i].value))

                return xScale(d)+1
              // }
            })
            .attr('y', function(d){
              return yScale(j)+4;
            })  .attr('width',0).transition().duration(1500)
            .attr('width', function(d,i){
              return xScale(data_[i].value)- THIS.margin.left
            })
            .attr('height', 20)
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
