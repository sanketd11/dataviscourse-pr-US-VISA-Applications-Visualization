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
   let allyearstateWiseCaseCounts = []
   let allyearstateAppCounts = []
   let allyearstateMeanSalary = []
   let flag = true
   let yearValues = ["2011","2012", "2013","2014","2015","2016"]
   let yearValuesAll = ["2011","2012", "2013","2014","2015","2016","All"]


     d3.csv('data/processed_data/2011_Application_Count.csv', function(error,stateData){
	   map.drawMap(stateData)
   })


   let bigDict ={}
   let bigDict1 ={}


   callMap = function(i){
       map.updateMap(allyearstateAppCounts[i].value, allyearstateMeanSalary[i].value)
   }


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
   callParallelPlot = function(i){
      parallelChart.updateParallelPlot(allyearParallelPlot[i].value)
  }


  dataInput = function(year){
     d3.csv('data/'+year+'_all_data.csv', function(error, yearData){

		let stateWiseCaseCounts = d3.nest()
                                .key(function(d){ return d.Employer_State;})
                                .key(function(d){ return d.Case_Status})
                                .rollup(function(v){ return v.length})
                                .entries(yearData);
		let stateAppCounts = d3.nest()
                               .key(function(d){ return d.Employer_State;})
                               .rollup(function(v){ return v.length})
                               .entries(yearData);

		let stateMeanSalary = d3.nest()
                                .key(function(d){ return d.Employer_State;})
                                .rollup(function(v){ return d3.mean(v, function(d) {return d.Wage_Offer})})
                                .entries(yearData);

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


      let parallelPlotData = getRandom(yearData, 500)


      allyearEconomicSectorData.push({key:year, value:economicSectorCounts});
      allyeareconomicSectorCaseCounts.push({key:year, value:economicSectorCaseCounts});
      allyearCaseCounts.push({key:year, value:yearCaseCounts})
      allyearParallelPlot.push({key:year, value:parallelPlotData})

      allyearVisaTypeCounts.push({key:year, value:yearVisaTypeCounts})
      allyearVisaTypeCaseCounts.push({key:year, value:yearVisaTypeCaseCounts})

      allyearstateWiseCaseCounts.push({key:year, value:stateWiseCaseCounts});
      allyearstateAppCounts.push({key:year, value:stateAppCounts});
      allyearstateMeanSalary.push({key:year, value:stateMeanSalary});
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



		callYearWise = function(year){
		 yearWise.update(year)

		}
		 callYearWise('2011');

		 let yrChartSelection = d3.select('#yearwise').selectAll('circle').data(yearValuesAll)
							  .on('click', function(d,i){
								d3.selectAll('.highlighted')
								.classed('highlighted', false)
								d3.select(this)
								.classed('highlighted',true)
								if(i === 6)
								{
								callAllBarChart(data_econ);

                callAllBarChart2(data_visaType);

								}
								else		 
								{

								callMap(i)
								callLine(i)
								callBarChart(i)
                callBarChart2(i)
								callParallelPlot(i)
								}
								})
							   .style("fill", 'green');


   // Provision for scrolly telling
    $(window).scroll(function(){
      // console.log('SCROLL BODY', $(window).height());

      console.log($(window).scrollTop())

      if (($(window).scrollTop() >=-10 && $(window).scrollTop()<900)){
          d3.select('.navbar').classed('show',true)
            d3.select('.navbar').classed('hide',false)
        d3.select('#container0').attr("style", "margin-top: 60px;")
        d3.select('#container').classed('navbar-fixed-top',true)
        d3.select('#container1').classed('navbar-fixed-top', false)
        d3.select('#container1').classed('show',false)
        d3.select('#container1').classed('hide',true)
        d3.select('#parallelP').classed('show',false)
        d3.select('#parallelP').classed('hide',true)


      }else if((($(window).scrollTop() >=900 && $(window).scrollTop()<1200))){
        d3.select('.navbar').classed('hide',false)
        d3.select('#container0').attr("style", "margin-top: 60px;")

        d3.select('#container').classed('navbar-fixed-top',false)
        d3.select('#container1').classed('navbar-fixed-top', true)
        d3.select('#container1').classed('hide',false)
        d3.select('#container1').classed('show',true)
        d3.select('#parallelP').classed('show',false)
        d3.select('#parallelP').classed('hide',true)
      }else{
          d3.select('.navbar').classed('show',false)
        d3.select('.navbar').classed('hide',true)
        d3.select('#container').classed('navbar-fixed-top',false)
        d3.select('#container1').classed('show',false)
        d3.select('#container1').classed('hide',true)
        d3.select('#container0').attr("style", "margin-top: 10px;")
        d3.select('#parallelP').classed('hide',false)
        d3.select('#parallelP').classed('show',true)
        d3.select('#parallelP').classed('navbar-fixed-top', true)
      }
      if ($(window).scrollTop() >=-10 && $(window).scrollTop()<150){
		callYearWise("2011");
        callLine(0);
		callMap(0);

      }else if(($(window).scrollTop() >=150 && $(window).scrollTop()<300)){
		callYearWise("2012");
        callLine(1);

		callMap(1);

      }
      else if(($(window).scrollTop() >=300 && $(window).scrollTop()<450)){
		callYearWise("2013");
        callLine(2);

		callMap(2);

      }
      else if(($(window).scrollTop() >=450 && $(window).scrollTop()<600)){
		callYearWise("2014");
        callLine(3);

		callMap(3);

      }
      else if(($(window).scrollTop() >=600 && $(window).scrollTop()<750)){
		callYearWise("2015");
        callLine(4);

		callMap(4);

      }
      else if(($(window).scrollTop() >=750 && $(window).scrollTop()<900)){
		callYearWise("2016");
        callLine(5);

		callMap(5);

      }else{
		callYearWise("All");

        if (flag == true){
          console.log('data --->',allyearEconomicSectorData)

          if (data_econ.length == 0){

            for (let key1=0 ; key1<allyearEconomicSectorData.length; key1++) {
                temp = allyearEconomicSectorData[key1]
                for (let key2=0; key2 < temp.value.length; key2++){
                  let temp2 = temp.value[key2]
                  if (!bigDict.hasOwnProperty(temp2.key)){
                    bigDict[temp2.key]={}
                    bigDict[temp2.key][temp.key] = temp2.value
                  }else{
                    bigDict[temp2.key][temp.key] = temp2.value
                  }
                }
              }
              let ctr = 0
              for (let key1 in bigDict) {
                if (bigDict.hasOwnProperty(key1)) {
                  data_econ.push({key:key1,value:[]})
                  for (let key2 in bigDict[key1]){
                    data_econ[ctr].value.push({key: key2, value:bigDict[key1][key2]})
                  }
                }
                ctr+=1
              }
            }
            if (data_visaType.length == 0){
              for (let key1=0 ; key1<allyearVisaTypeCounts.length; key1++) {
                  temp = allyearVisaTypeCounts[key1]
                  for (let key2=0; key2 < temp.value.length; key2++){
                    let temp2 = temp.value[key2]
                    if (!bigDict1.hasOwnProperty(temp2.key)){
                      bigDict1[temp2.key]={}
                      bigDict1[temp2.key][temp.key] = temp2.value
                    }else{
                      bigDict1[temp2.key][temp.key] = temp2.value
                    }
                  }
                }
                let ctr = 0
                let flagVisaType = false
                for (let key1 in bigDict1) {
                  if (bigDict1.hasOwnProperty(key1)) {
                    if (key1 == "H1B" || key1 == "H-1B" ){
                      if (flagVisaType == false){
                        data_visaType.push({key:"H-1B",value:[]})
                        flagVisaType = true
                      }

                    }else{
                      data_visaType.push({key:key1,value:[]})
                    }
                    for (let key2 in bigDict1[key1]){
                      if (key1 == "H1B" || key1 == "H-1B" ){
                        for (let m = 0; m<data_visaType.length; m++){
                          if (data_visaType[m].key == "H-1B"){
                            data_visaType[m].value.push({key: key2, value:bigDict1[key1][key2]})
                            break
                          }
                        }
                      }else{
                        data_visaType[ctr].value.push({key: key2, value:bigDict1[key1][key2]})
                      }
                    }
                  }
                  ctr+=1
                }

            for (let n=0 ; n<6; n++){
              let data_visaType_ = data_visaType[n]
              let val2 = data_visaType_.value.sort(function(a,b){
                if (parseInt(b.key)>parseInt(a.key)){
                  return -1;
                }else{
                  return 1;
                }
              })
              data_visaType[n].value = val2;
            }

        }
          console.log("data_econ:--->",data_econ)
          callAllBarChart(data_econ);
          callAllBarChart2(data_visaType)
          console.log("Data Vis Type: --->", data_visaType)
          callParallelPlot(0)
          flag = false
        }
      }

    });

})
