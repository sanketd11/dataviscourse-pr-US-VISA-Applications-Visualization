d3.json('data/us-states.json',function(error,data){
   let map = new Map(data)
   let yearWise = new YearChart(map)
   let lineChart = new LineChart()
   let barChart = new BarChart()
   let parallelChart = new ParallelChart()
   let allyearEconomicSectorData = {}

   map.drawMap()
   callLine = function(year,yearCaseCounts){
       lineChart.updateLine(yearCaseCounts,parseInt(year))
   }
   callBarChart= function(economicSectorCaseCounts){
      barChart.updateBar(economicSectorCaseCounts)
   }
   callAllBarChart= function(economicSectorCaseCounts){
      barChart.updateAllBar(economicSectorCaseCounts)
   }

   callParallelPlot = function(yearData){
    parallelChart.updateParallelPlot(yearData)
  }

   dataInput = function(year){
     d3.csv('data/'+year+'_all_data.csv', function(error, yearData){

      let economicSectorCaseCounts = d3.nest()
                              .key(function(d){ return d.US_Economic_Sector;})
                              .key(function(d){ return d.Case_Status})
                              .rollup(function(v){ return v.length})
                              .entries(yearData);
      let economicSectorCounts = d3.nest()
                              .key(function(d){ return d.US_Economic_Sector;})
                              .rollup(function(v){ return v.length})
                              .entries(yearData);

      let yearCaseCounts = d3.nest()
                              .key(function(d){ return d.Case_Status;})
                              .rollup(function(v){ return v.length})
                              .entries(yearData);

      callLine(year,yearCaseCounts);
      allyearEconomicSectorData[year] = economicSectorCounts;

     })
   }
   // Provision for scrolly telling
    $(window).scroll(function(){
      // console.log('SCROLL BODY', $(window).height());
      console.log($(window).scrollTop())
      if (($(window).scrollTop() >=-10 && $(window).scrollTop()<900)){
        d3.select('#container').classed('navbar-fixed-top',true)
        d3.select('#container1').classed('navbar-fixed-top', false)
        d3.select('#container1').classed('show',false)
        d3.select('#container1').classed('hide',true)

      }else{
        d3.select('#container').classed('navbar-fixed-top',false)
        d3.select('#container1').classed('navbar-fixed-top', true)
        d3.select('#container1').classed('hide',false)
        d3.select('#container1').classed('show',true)

      }
      if ($(window).scrollTop() >=-10 && $(window).scrollTop()<150){
        dataInput ('2011');

      }else if(($(window).scrollTop() >=150 && $(window).scrollTop()<300)){
        dataInput('2012');
      }
      else if(($(window).scrollTop() >=300 && $(window).scrollTop()<450)){
        dataInput('2013');
      }
      else if(($(window).scrollTop() >=450 && $(window).scrollTop()<600)){
        dataInput('2014');
      }
      else if(($(window).scrollTop() >=600 && $(window).scrollTop()<750)){
        dataInput('2015');
      }
      else if(($(window).scrollTop() >=750 && $(window).scrollTop()<900)){
        dataInput('2016');
      }else{
        let data = []
        for (let key1 in allyearEconomicSectorData) {
            let counter =0
            for (let key2 in allyearEconomicSectorData[key1]){
              let temp = allyearEconomicSectorData[key1][key2]
              if (!data.hasOwnProperty(counter)) {
                  data[counter] = { key:temp.key, value:[{key:key1, value: temp.value}]}
              }else{
                  data[counter].value.push({key:key1, value : temp.value})
              }
              counter+=1
            }

        }
        callAllBarChart(data);
        // callParallelPlot('2011');
      }
    });
});
