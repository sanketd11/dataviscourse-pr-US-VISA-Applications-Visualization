d3.json('data/us-states.json',function(error,data){
   let map = new Map(data)
   let yearWise = new YearChart(map)
   let lineChart = new LineChart()
   let barChart = new BarChart()
   let barChart2 = new BarChart2()
   let parallelChart = new ParallelChart()
   let allyearEconomicSectorData = []
   let allyeareconomicSectorCaseCounts=[]
   let allyearCaseCounts=[]
   let allyearVisaTypeCounts =[]
   let allyearVisaTypeCaseCounts =[]
   let data_econ = []
   let data_visaType =[]
   let allyearParallelPlot = []
   let flag = true



   map.drawMap()
   callLine = function(i){
       lineChart.updateLine(allyearCaseCounts[i].value,parseInt(allyearCaseCounts[i].key))
   }
   callBarChart= function(i){
      barChart.updateBar(allyeareconomicSectorCaseCounts[i].value)
   }
   callBarChart2= function(i){
      barChart2.updateBar(allyearVisaTypeCaseCounts[i].value)
   }
   callAllBarChart= function(data_econ){
      barChart.updateAllBar(data_econ)
   }
   callAllBarChart2= function(data_visaType){
      barChart2.updateAllBar(data_visaType)
   }
   callParallelPlot = function(yearData){
      parallelChart.updateParallelPlot(yearData)
  }

  let yearValues = ["2011","2012", "2013","2014","2015","2016"]
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
      let yearVisaTypeCounts = d3.nest()
                                .key(function(d){return d.Class_Of_Admission})
                                .rollup(function(v){ return v.length})
                                .entries(yearData);

      let yearVisaTypeCaseCounts = d3.nest()
                              .key(function(d){ return d.Class_Of_Admission;})
                              .key(function(d){ return d.Case_Status})
                              .rollup(function(v){ return v.length})
                              .entries(yearData);


      let parallelPlotData = getRandom(yearData, 1500)

      allyearEconomicSectorData.push({key:year, value:economicSectorCounts});
      allyeareconomicSectorCaseCounts.push({key:year, value:economicSectorCaseCounts});
      allyearCaseCounts.push({key:year, value:yearCaseCounts})
      allyearParallelPlot.push({key:year, value:parallelPlotData})
      allyearVisaTypeCounts.push({key:year, value:yearVisaTypeCounts})
      allyearVisaTypeCaseCounts.push({key:year, value:yearVisaTypeCaseCounts})
     })
  }
  function getRandom(arr, n) {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len;
      }
      return result;
  }
  yearValues.forEach(dataInput);



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
        // d3.select('#container1').classed('navbar-fixed-top', true)
        d3.select('#container1').classed('hide',false)
        d3.select('#container1').classed('show',true)

      }
      if ($(window).scrollTop() >=-10 && $(window).scrollTop()<150){
        callLine(0);

      }else if(($(window).scrollTop() >=150 && $(window).scrollTop()<300)){
        callLine(1);
      }
      else if(($(window).scrollTop() >=300 && $(window).scrollTop()<450)){
        callLine(2);
      }
      else if(($(window).scrollTop() >=450 && $(window).scrollTop()<600)){
        callLine(3);
      }
      else if(($(window).scrollTop() >=600 && $(window).scrollTop()<750)){
        callLine(4);
      }
      else if(($(window).scrollTop() >=750 && $(window).scrollTop()<900)){
        callLine(5);
      }else{
        if (flag == true){
          console.log('data --->',allyearEconomicSectorData)
          if (data_econ.length == 0){
            for (let key1=0 ; key1<allyearEconomicSectorData.length; key1++) {
              console.log("Key--->",key1)
              let counter =0
              for (let key2=0; key2 < allyearEconomicSectorData[key1].value.length; key2++){
                let temp = allyearEconomicSectorData[key1].value[key2]
                if (!data_econ.hasOwnProperty(counter)) {
                    data_econ[counter] = { key:temp.key, value:[{key:allyearEconomicSectorData[key1].key, value: temp.value}]}
                }else{
                    data_econ[counter].value.push({key:allyearEconomicSectorData[key1].key, value : temp.value})
                }
                counter+=1
              }
            }
            if (data_visaType.length == 0){
              let counter2 =0
              for (let key1=0 ; key1<allyearVisaTypeCounts.length; key1++) {
                console.log("Key--->",key1)
                let counter =0

                for (let key2=0; key2 < allyearVisaTypeCounts[key1].value.length; key2++){
                  let temp = allyearVisaTypeCounts[key1].value[key2]
                  if (counter2 == 0) {
                      data_visaType[counter] = {key:temp.key, value:[{key:allyearVisaTypeCounts[key1].key, value: temp.value}]}
                  }else{
                      data_visaType[counter].value.push({key:allyearVisaTypeCounts[key1].key, value : temp.value})
                  }
                  counter+=1
                }
                counter2+=1
              }
          }
        }
          console.log("data_econ:--->",data_econ)
          callAllBarChart(data_econ);
          callAllBarChart2(data_visaType)
          console.log("Data Vis Type: --->", data_visaType)
          callParallelPlot(allyearParallelPlot[0].value)
          flag = false
        }

      }
    });
    // console.log(allyearParallelPlot[0].key)
    // callParallelPlot(allyearParallelPlot[0].value)

});
