d3.json('data/us-states.json',function(error,data){
   let map = new Map(data)
   let yearWise = new YearChart(map)
   let lineChart = new LineChart()
   let barChart = new BarChart()


   map.drawMap()
   d3.csv('data/2011_Application_Count.csv', function(error,stateData){
     map.updateMap(stateData)
     lineChart.updateLine(stateData)
   })
   d3.csv('data/2011_Sector_Wise_Application_Count.csv', function(error,sectorData){
     barChart.updateBar(sectorData)
   })
   yearWise.update()
   // Provision for scrolly telling
    $(window).scroll(function(){
      console.log('SCROLL BODY', $(window).height());
      console.log($(window).scrollTop())
    });
 });
