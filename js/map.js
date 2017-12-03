/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor(state_data_json) 
	{
      this.state_data_json = state_data_json;
      this.svgWidth = 750;
      this.svgHeight = 550;
	  this.margin1 = 170
	  this.margin2 = 200
      let mapDiv = d3.select("#map")
      this.svg = mapDiv.append("svg")
                          .attr("width",this.svgWidth)
                          .attr("height",this.svgHeight)
                          .attr("transform", "translate(0 ,50)")

	  this.mapView  = null;	
	  
	this.tipSVG = d3.select("#tipDiv")
					.append("svg")
					.attr("width", 750)
					.attr("height", 70);
					
	this.tipSVG.append("rect").attr("id","r1").attr("fill", "steelblue")
					.attr("x", 125)
					.attr("y", 27)
	this.tipSVG.append("rect").attr("id","r2").attr("fill", "steelblue")
					.attr("x", 95)
					.attr("y", 47)
						
	this.tipSVG.append("text").attr("id","t1").attr("x", 10).attr("y", 20)
	this.tipSVG.append("text").attr("id","t2").attr("x", 10).attr("y", 40)
	this.tipSVG.append("text").attr("id","t3").attr("x", 130).attr("y", 40)
	this.tipSVG.append("text").attr("id","t4").attr("x", 10).attr("y", 60)
	this.tipSVG.append("text").attr("id","t5").attr("x", 130).attr("y", 60)		 			
    }
  
  
    updateMap(stateAppCountsvalue, stateMeanSalaryvalue) 
	{
		
	    let this_=this;	
		
		let applicationScale = d3.scaleLinear()
					.domain([d3.min(stateAppCountsvalue, d => parseInt(d.value)),d3.max(stateAppCountsvalue, d => parseInt(d.value))])
					.range([0,this.svgWidth - this.margin1]); 
					
		let salaryScale = d3.scaleLinear()
					.domain([d3.min(stateMeanSalaryvalue, d => parseInt(d.value)),d3.max(stateMeanSalaryvalue, d => parseInt(d.value))])
					.range([0,this.svgWidth - this.margin2]); 
								

        let colorScale = d3.scaleLinear()
                      .domain([0, d3.max(stateAppCountsvalue, d => parseInt(d.value))])
					  .range(["#04efe7","#3009f4"]);

		for(let i=0; i < stateAppCountsvalue.length; i++)
		{
          d3.select("#"+stateAppCountsvalue[i].key).style("fill", colorScale(stateAppCountsvalue[i].value))
        }
		
	   this.mapView.on('mouseover', function(d,i) {

	    d3.select("#r1").attr("width", 0)
 					   .attr("height", 18)
					   .transition()
					   .duration(1000)
					   .attr("width",function(){
							  for(let i=0;i<stateAppCountsvalue.length;i++)
								{  
									if(d.id===stateAppCountsvalue[i].key)
									{
									return applicationScale(stateAppCountsvalue[i].value)
									}
								}
						  })
					  
		d3.select("#r2").attr("width", 0)
		    			.attr("height", 18)
					    .transition()
					    .duration(1000)
					    .attr("width",function(){
							  for(let i=0;i<stateMeanSalaryvalue.length;i++)
								{  
									if(d.id===stateMeanSalaryvalue[i].key)
									{
									return salaryScale(stateMeanSalaryvalue[i].value)
									}
								}
						  })
					  
	
	  
		d3.select("#t1").text("State: "+ d.properties.name+" ("+d.id+")")

					 
		d3.select("#t2").text("Total Applications: ")
						 
		d3.select("#t3").text(function(){
							  for(let i=0;i<stateAppCountsvalue.length;i++)
								{  
									if(d.id===stateAppCountsvalue[i].key)
									{
									return stateAppCountsvalue[i].value
									}
								}
						  })
						.transition()
				        .duration(1000)
				        .attr("x",function(){
							  for(let i=0;i<stateAppCountsvalue.length;i++)
								{  
									if(d.id===stateAppCountsvalue[i].key)
									{
									return 130 + applicationScale(stateAppCountsvalue[i].value)
									}
								}
						  })
						  
				  
		d3.select("#t4").text("Mean Salary: ")
						   
		d3.select("#t5").text(function(){
								for(let i=0;i<stateMeanSalaryvalue.length;i++)
									{  
									if(d.id===stateMeanSalaryvalue[i].key)
									{
									return "USD$ "+ stateMeanSalaryvalue[i].value.toFixed(2)
									}
								}
								
			  })
						.transition()
						.duration(1000)
						.attr("x",function(){
							  for(let i=0;i<stateMeanSalaryvalue.length;i++)
								{  
									if(d.id===stateMeanSalaryvalue[i].key)
									{
									return 100 + salaryScale(stateMeanSalaryvalue[i].value)
									}
								}
						  })
	   })
				  
				  
				  
		this.mapView.on('mouseout', function(d,i) {				 
				d3.select("#t1").text("")				 
				d3.select("#t3").text("")
								  .transition()
								  .duration(1000)
								  .attr("x", 130 + applicationScale(stateAppCountsvalue[i].value))
				  
				d3.select("#t5").text("").transition()
								.duration(1000)
								.attr("x", 100 + salaryScale(stateMeanSalaryvalue[i].value))
				  
				d3.select("#r1").attr("width", 0)
								.attr("height", 0)
					  
				d3.select("#r2").attr("width", 0)
								.attr("height", 0)
	  
			    d3.select("#t2").text("")
					   
				d3.select("#t4").text("")
					   
		})
    }

	
    drawMap(yearData)
	{
	
		let projection = d3.geoAlbersUsa()
						   .translate([390,220])
                           .scale([900]);

		// Define path generator
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
				
		 let colorScale = d3.scaleLinear()
                      .domain([0, d3.max(yearData, d => parseInt(d.Count))])
					  .range(["#04efe7","#3009f4"]);

		for(let i=0; i < yearData.length; i++)
		{
			d3.select("#"+yearData[i].State).style("fill", colorScale(yearData[i].Count))
        }
		
        let graticule = d3.geoGraticule();
        d3.select("#map").append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');

    }

}
