 d3.json('data/us-states.json',function(error,data){
   let map = new Map(data)
   let yearWise = new YearChart(map)
   map.drawMap()
   d3.csv('data/2011.csv', function(error,yearData){
     map.updateMap(yearData)
   })
   yearWise.update()
 });
