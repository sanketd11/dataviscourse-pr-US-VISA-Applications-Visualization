d3.json('data/us-states.json',function(error,data){
   let map = new Map(data)
   let yearWise = new YearChart(map)
   let lineChart = new LineChart()
   let barChart = new BarChart()
   let parallelChart = new ParallelChart()


   map.drawMap()
   d3.csv('data/2011_Application_Count.csv', function(error,stateData){
     map.updateMap(stateData)
     lineChart.updateLine(stateData)
   })
   d3.csv('data/2011_Sector_Wise_Application_Count.csv', function(error,sectorData){
     barChart.updateBar(sectorData)
   })
   yearWise.update()
   d3.csv('data/2011_all_data.csv', function(error, yearData){
     // console.log(yearData)
     // var nested_data = d3.nest()
     //                  .key(function(d) { return d.employer_name; }).sortKeys(d3.descending)
     //                  .key(function(d) { return d.pw_job_title_9089; }).sortKeys(d3.descending )
     //                  .rollup(function(leaves) { return leaves.length; })
     //                  .entries(yearData);
     //  console.log(nested_data)
     parallelChart.updateParallelPlot(yearData)
   })
   // Provision for scrolly telling
    $(window).scroll(function(){
      console.log('SCROLL BODY', $(window).height());
      console.log($(window).scrollTop())
    });
 });
