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

						  
						
				
    }

    /**
     * Function that clears the map
     */
    clearMap() {

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
    updateMap(yearData) {

	
	    let max = d3.max(yearData, d => parseInt(d.Count))
        let colorScale = d3.scaleLinear()
                      .domain([0, max])
						.range(["#04efe7","#3009f4"]);

        for(let i=0; i < yearData.length; i++){
          // let tem  pid =
          // console.log(tempid,yearData[i].Count)
          d3.select("#"+yearData[i].State).style("fill", colorScale(yearData[i].Count))
        }
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(yearData) {

      // console.log(this.state_data_json)
      // D3 Projection
	  console.log(yearData[2].Count)
	    let this_=this;		
		
		 let xScale = d3.scaleLinear()
	.domain([d3.min(yearData, d => d.Count),     d3.max(yearData, d => d.Count)])
    .range([0,20]); 
	
		/* let tip = d3.tip().attr('class', 'd3-tip')
	            .direction('s')
	            .offset(function() {
	                return [0,0];
	            })
	            .html((d,i)=> {
	                // populate data in the following format
							
	                let  tooltip_data ;
			
					tooltip_data=	{
	                  "result":[
					      {"State": d.properties.name,"Count": yearData[i].Count}                   
	                  ]} 
	                  
	                return (this_.tooltip_render (tooltip_data));
	            }); */
				
				var tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([50, 200])
  .html("<div id='tipDiv'></div>");
  
  
						let g=this.svg.selectAll('g').data([1])
		let g0=g.enter().append("g")
		g.exit().remove()
		g=g0.merge(g);

		g.call(tip)
		
		
    let projection = d3.geoAlbersUsa()
                        .translate([390,220])
                        .scale([900]);

      // // Define path generator
    let path = d3.geoPath()
                .projection(projection);
    let mapView = this.svg.selectAll("path")
                    .data(this.state_data_json.features)
                    .enter()
                    .append("path")
                    .attr("d",path)
                    .attr("id",function(d){
                        return d.id;
                    })	
					
					
				//	.on('mouseover', tip.show)
				.on('mouseover', function(d,i) {
					console.log(yearData[i].State);
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
      .attr("width", xScale(yearData[i].Count));
	  
	tipSVG.append("text")
      .text("State: "+ yearData[i].State)
      .attr("x", 10)
      .attr("y", 20)
	  
	   tipSVG.append("text")
      .text("Application Count: ")
      .attr("x", 10)
      .attr("y", 40)

    tipSVG.append("text")
      .text(yearData[i].Count)
      .attr("x", 130)
      .attr("y", 40)
      .transition()
      .duration(1000)
      .attr("x", 130 + xScale(yearData[i].Count))
	  
	   tipSVG.append("text")
      .text("Avg. Salary: ")
      .attr("x", 10)
      .attr("y", 60)

    tipSVG.append("text")
      .text(yearData[i].Count)
      .attr("x", 130)
      .attr("y", 60)
      .transition()
      .duration(1000)
      .attr("x", 130 + xScale(yearData[i].Count))
  })
					.on('mouseout', tip.hide)
        let graticule = d3.geoGraticule();
        d3.select("#map").append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');

    }

}
