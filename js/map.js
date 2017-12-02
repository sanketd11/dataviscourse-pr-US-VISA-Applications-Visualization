/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor(state_data_json) {
      this.state_data_json = state_data_json;
      this.svgWidth = 750;
      this.svgHeight = 500;
      let mapDiv = d3.select("#map")
      this.svg = mapDiv.append("svg")
                          .attr("width",this.svgWidth)
                          .attr("height",this.svgHeight)
                          .attr("transform", "translate(0 ,50)")

	  this.mapView  = null;			  
						
				
    }

  

	tooltip_render (tooltip_data){
	    let text = "<ul>";
	    tooltip_data.result.forEach((row)=>{
	        text += "<li>" +"Country: "+row.State+"</li>" +"<li>"+"Application Count: "  + row.Count+ "</li>"});

	    return text;
	}
	
	
	
	
    /**
     * Update Map with info for a specific year
     * @param yearData the data for one specific world cup
     */
    updateMap(stateWiseCaseCountsvalue, stateWiseCaseCountskey,
	   stateAppCountsvalue,stateAppCountskey,
	   stateMeanSalaryvalue,stateMeanSalarykey) 
	{
		console.log(stateAppCountsvalue)
		console.log(stateAppCountskey)
	    let this_=this;	
		
		let xScale = d3.scaleLinear()
					.domain([d3.min(stateAppCountsvalue, d => d.value), d3.max(stateAppCountsvalue, d => d.value)])
					.range([0,20]); 
	
	
		let max = d3.max(stateAppCountsvalue, d => parseInt(d.value))
        let colorScale = d3.scaleLinear()
                      .domain([0, max])
					  .range(["#04efe7","#3009f4"]);
					  
					  
		let tip = d3.tip()
					.attr("class", "d3-tip")
					.offset([50, 200])
					.html("<div id='tipDiv'></div>");
  
  
		let g=this.svg.selectAll('g').data([1])
		let g0=g.enter().append("g")
		g.exit().remove()
		g=g0.merge(g);

		g.call(tip)
		
		for(let i=0; i < stateAppCountsvalue.length; i++)
		{
          d3.select("#"+stateAppCountsvalue[i].key).style("fill", colorScale(stateAppCountsvalue[i].value))
        }
		
	   this.mapView.on('mouseover', function(d,i) {
					
		tip.show();
		let tipSVG = d3.select("#tipDiv")
					.append("svg")
					.attr("width", 610)
					.attr("height", 70);

		tipSVG.append("rect")
					  .attr("fill", "steelblue")
					  .attr("x", 130)
					  .attr("y", 25)
					  .attr("width", 0)
					  .attr("height", 20)
					  .transition()
					  .duration(1000)
					  .attr("width", xScale(stateAppCountsvalue[i].value));
	  
		tipSVG.append("text")
					  .text("State: "+ stateAppCountsvalue[i].key)
					  .attr("x", 10)
					  .attr("y", 20)
	  
	   tipSVG.append("text")
				  .text("Application Count: ")
				  .attr("x", 10)
				  .attr("y", 40)

		tipSVG.append("text")
				  .text(stateAppCountsvalue[i].value)
				  .attr("x", 130)
				  .attr("y", 40)
				  .transition()
				  .duration(1000)
				  .attr("x", 130 + xScale(stateAppCountsvalue[i].value))
	  
		tipSVG.append("text")
				  .text("Avg. Salary: ")
				  .attr("x", 10)
				  .attr("y", 60)

		tipSVG.append("text")
				  .text(stateAppCountsvalue[i].value)
				  .attr("x", 130)
				  .attr("y", 60)
				  .transition()
				  .duration(1000)
				  .attr("x", 130 + xScale(stateAppCountsvalue[i].value))
			  })
			  
					.on('mouseout', tip.hide)

    }


    drawMap() {
	
    let projection = d3.geoAlbersUsa()
                        .translate([390,220])
                        .scale([900]);

      // // Define path generator
    let path = d3.geoPath()
                .projection(projection);
    this.mapView = this.svg.selectAll("path")
                    .data(this.state_data_json.features)
                    .enter()
                    .append("path")
                    .attr("d",path)
                    .attr("id",function(d){
                        return d.id;
                    })	
				
					
        let graticule = d3.geoGraticule();
        d3.select("#map").append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');

    }

}
