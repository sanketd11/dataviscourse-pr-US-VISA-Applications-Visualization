/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor(state_data_json) {
      this.state_data_json = state_data_json;
      this.svgWidth = 800;
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

    /**
     * Update Map with info for a specific year
     * @param yearData the data for one specific world cup
     */
    updateMap(yearData) {
        console.log(yearData)
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap() {

      console.log(this.state_data_json)
      // D3 Projection
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
        let graticule = d3.geoGraticule();
        d3.select("#map").append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');

    }

}
