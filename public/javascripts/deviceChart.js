if(category == 'Sensor'){
  if(deviceType == 'Both'){
    // // Sensor value for Both
    var chartData = getValue();
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "dark",
        "marginRight": 80,
        "legend": {
          "useGraphSettings": true
        },
        "dataProvider": chartData,
        "mouseWheelZoomEnabled": true,
        "valueAxes": [{
          "id":"v1",
          "axisColor": "#AADA6D",
          "axisThickness": 2,
          "gridAlpha": 0,
          "axisAlpha": 1,
          "position": "left"
        },{
          "id":"v2",
          "axisColor": "#DFC7FB",
          "axisThickness": 2,
          "gridAlpha": 0,
          "axisAlpha": 1,
          "position": "right"
        }],
        "graphs": [{
            "valueAxis": "v1",
            "id": "g1",
            "lineColor": "#AADA6D",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "valueField": "publish",
            "useLineColorForBulletBorder": true,
            "title": "Publish",
            "balloon":{
                "fontSize" : 12,
                "drop":true
            }
        },{
            "valueAxis": "v2",
            "id": "g2",
            "lineColor": "#DFC7FB",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "valueField": "subscribe",
            "useLineColorForBulletBorder": true,
            "title": "Subscribe",
            "balloon":{
                "fontSize" : 12,
                "drop":true
            }
        }],
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":25,
          "scrollbarHeight":10
        },
        "chartScrollbar": {},
        "chartCursor": {
            "categoryBalloonDateFormat": "HH:NN:SS, DD MMMM",
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "minPeriod": "ss",
            "parseDates": true,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true,
            "dateFormat": "YYYY-MM-DD HH:NN:SS",
            "position": "bottom-right"
        }
    });

    // chart.addListener("dataUpdated", zoomChart);
    // // when we apply theme, the dataUpdated event is fired even before we add listener, so
    // // we need to call zoomChart here
    // zoomChart();
    // // this method is called when chart is first inited as we listen for "dataUpdated" event
    // function zoomChart() {
    //     // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    //     chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    // }
  }else{
    // // Sensor value
    var chartData = getValue();
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "dark",
        "marginRight": 80,
        "dataProvider": chartData,
        "mouseWheelZoomEnabled": true,
        "valueAxes": [{
            "position": "left",
            "title": "Sensor value"
        }],
        "graphs": [{
            "id": "g1",
            "lineColor": "#AADA6D",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "valueField": "value",
            "useLineColorForBulletBorder": true,
            "balloon":{
                "fontSize" : 12,
                "drop":true
            }
        }],
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":25,
          "scrollbarHeight":10
        },
        "chartScrollbar": {
            "graph": "g1",
            "scrollbarHeight": 30,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "categoryBalloonDateFormat": "JJ:NN:SS, DD MMMM",
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "minPeriod": "ss",
            "parseDates": true
        },
        "export": {
            "enabled": true,
             "dateFormat": "YYYY-MM-DD HH:NN:SS"
        }
    });

    chart.addListener("dataUpdated", zoomChart);
    // when we apply theme, the dataUpdated event is fired even before we add listener, so
    // we need to call zoomChart here
    zoomChart();
    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }
  }
}else{
  if(deviceType == 'Both'){
    // Message value for Both Type
    var chartData = getMessage();
    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "serial",
      "theme": "dark",
      "mouseWheelZoomEnabled": true,
      "dataProvider": chartData,
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "id": "AmGraph-1",
        "balloonText": "Publish:<b>[[value]]</b>",
        "fillColorsField": "colorPub",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "publish",
        "balloon":{
                "drop":true
        }
      },{
        "id": "AmGraph-2",
        "balloonText": "Subscribe: <b>[[value]]</b>",
        "fillColorsField": "colorSub",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "subscribe",
        "balloon":{
                "drop":true
        }
      }],
      "valueScrollbar":{
        "title": "Number of message",
        "oppositeAxis":false,
        "offset":25,
        "scrollbarHeight":10
      },
      "chartScrollbar": {
          "graph": "g1",
          "scrollbarHeight": 30,
          "backgroundAlpha": 0,
          "selectedBackgroundAlpha": 0.1,
          "selectedBackgroundColor": "#888888",
          "graphFillAlpha": 0,
          "graphLineAlpha": 0.5,
          "selectedGraphFillAlpha": 0,
          "selectedGraphLineAlpha": 1,
          "autoGridCount": true,
          "color": "#AAAAAA"
      },
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": true
      },
      "plotAreaFillAlphas": 0.1,
      "categoryField": "value",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20,
      },
      "export": {
        "enabled": true
      }

    } );

    chart.addListener("dataUpdated", zoomChart);
    // when we apply theme, the dataUpdated event is fired even before we add listener, so
    // we need to call zoomChart here
    zoomChart();
    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }
  }else{
    // Message value for Publisher and Subscriber;
    var chartData = getMessage();
    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "serial",
      "theme": "dark",
      "mouseWheelZoomEnabled": true,
      "dataProvider": chartData,
      "valueAxes": [ {
        "gridColor": "#FFFFFF",
        "gridAlpha": 0.2,
        "dashLength": 0
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "balloonText": "[[value]]",
        "fillColorsField": "color",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "amount",
        "balloon":{
          "maxWidth": 100,
          "fontSize": 14,
          "drop":true
        }
      }],
      "valueScrollbar":{
        "title": "Number of message",
        "oppositeAxis":false,
        "offset":25,
        "scrollbarHeight":10
      },
      "chartScrollbar": {
          "graph": "g1",
          "scrollbarHeight": 30,
          "backgroundAlpha": 0,
          "selectedBackgroundAlpha": 0.1,
          "selectedBackgroundColor": "#888888",
          "graphFillAlpha": 0,
          "graphLineAlpha": 0.5,
          "selectedGraphFillAlpha": 0,
          "selectedGraphLineAlpha": 1,
          "autoGridCount": true,
          "color": "#AAAAAA"
      },
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": true
      },
      "categoryField": "value",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20,
      },
      "export": {
        "enabled": true
      }

    } );

    chart.addListener("dataUpdated", zoomChart);
    // when we apply theme, the dataUpdated event is fired even before we add listener, so
    // we need to call zoomChart here
    zoomChart();
    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }
  }
}


function getMessage(){
  var chartData = [];
  var amount = {};

  var chartDataPublish = [];
  var chartDataSubscribe = [];
  var amountPublish = {};
  var amountSubscribe = {};

  if(deviceType == 'Both'){
    for (var i = 0; i < allMessageToGraph['publish'].length; i++) {
      var count = 0;
      var mainVal = allMessageToGraph['publish'][i].payload;
      // console.log("mainVal = " + mainVal);
      for (var j = 0; j < allMessageToGraph['publish'].length; j++) {
        var compareVal = allMessageToGraph['publish'][j].payload;
        // console.log("compareVal = " + compareVal);
        if(mainVal == compareVal){
          count++
          amountPublish[mainVal] = count;

          var index = _.findIndex(chartDataPublish, {'value': compareVal});
          // console.log(index);
          if (index == -1) {
            chartDataPublish.push({
              value: mainVal,
              amount: amountPublish[mainVal],
              type: 'publish'
            })
          }else{
            chartDataPublish[index]['amount'] = amountPublish[mainVal];
          }
        }
      }
    }

    for (var i = 0; i < allMessageToGraph['subscribe'].length; i++) {
      var count = 0;
      var mainVal = allMessageToGraph['subscribe'][i].payload;
      // console.log("mainVal = " + mainVal);
      for (var j = 0; j < allMessageToGraph['subscribe'].length; j++) {
        var compareVal = allMessageToGraph['subscribe'][j].payload;
        // console.log("compareVal = " + compareVal);
        if(mainVal == compareVal){
          count++
          amountSubscribe[mainVal] = count;

          var index = _.findIndex(chartDataSubscribe, {'value': compareVal});
          // console.log(index);
          if (index == -1) {
            chartDataSubscribe.push({
              value: mainVal,
              amount: amountSubscribe[mainVal],
              type: 'subscribe'
            })
          }else{
            chartDataSubscribe[index]['amount'] = amountSubscribe[mainVal];
          }
        }
      }
    }

    for (var i = 0; i < chartDataPublish.length; i++) {
      var countPub,countSub = 0;
      var mainVal = chartDataPublish[i];
      for (var j = 0; j < chartDataSubscribe.length; j++) {
        var compareVal = chartDataSubscribe[j];
        if(mainVal.value == compareVal.value){
          chartData.push({
            value: mainVal.value,
            publish: mainVal.amount,
            subscribe: compareVal.amount,
            colorPub: "#AADA6D",
            colorSub: "#DFC7FB"
          })
        }
      }
    }

    for (var i = 0; i < chartDataPublish.length; i++) {
      var indexPub = _.findIndex(chartData, {'value': chartDataPublish[i].value});
      if(indexPub == -1){
        chartData.push({
          value: chartDataPublish[i].value,
          publish: chartDataPublish[i].amount,
          colorPub: "#AADA6D"
        })
      }
    }

    for (var i = 0; i < chartDataSubscribe.length; i++) {
      var indexSub = _.findIndex(chartData, {'value': chartDataSubscribe[i].value});
      if(indexSub == -1){
        chartData.push({
          value: chartDataSubscribe[i].value,
          subscribe: chartDataSubscribe[i].amount,
          colorSub: "#DFC7FB"
        })
      }
    }
    
    console.log(chartData);
    return chartData;

  }else{
    for (var i = 0; i < allMessageToGraph.length; i++) {
      var count = 0;
      var mainVal = allMessageToGraph[i].payload;
      // console.log("mainVal = " + mainVal);
      for (var j = 0; j < allMessageToGraph.length; j++) {
        var compareVal = allMessageToGraph[j].payload;
        // console.log("compareVal = " + compareVal);
        if(mainVal == compareVal){
          count++
          amount[mainVal] = count;

          var index = _.findIndex(chartData, {'value': compareVal});
          console.log(index);
          if (index == -1) {
            chartData.push({
              value: mainVal,
              amount: amount[mainVal],
              color: randomColor({hue: 'green', count: 1})
            })
          }else{
            chartData[index]['amount'] = amount[mainVal];
          }
        }
      }
    }

    console.log(amount);
    console.log(chartData);
    return chartData;
  }
}

function getValue() {
  var chartData = [];
  var chartDataPublish = [];
  var chartDataSubscribe = [];

  console.log(deviceType);
  if(deviceType == 'Both'){
    for (var i = 0; i < allMessageToGraph['publish'].length; i++) {
      var messageDate = new Date(allMessageToGraph['publish'][i].date);

      chartData.push({
        date: messageDate,
        publish: allMessageToGraph['publish'][i].payload,
        topic: allMessageToGraph['publish'][i].topic
      })
    }

    for (var i = 0; i < allMessageToGraph['subscribe'].length; i++) {
      var messageDate = new Date(allMessageToGraph['subscribe'][i].date);

      chartData.push({
        date: messageDate,
        subscribe: allMessageToGraph['subscribe'][i].payload,
        topic: allMessageToGraph['subscribe'][i].topic
      })
    }

    // console.log(chartDataPublish);
    // console.log(chartDataSubscribe);
    console.log(chartData);
    return _.sortBy(chartData,function(o) { return o.date; });
  }else{
    for (var i = 0; i < allMessageToGraph.length; i++) {
      var messageDate = new Date(allMessageToGraph[i].date);

      chartData.push({
        date: messageDate,
        value: allMessageToGraph[i].payload,
        topic: allMessageToGraph[i].topic
      })
    }
    console.log(chartData);
    return chartData;
  }
}

function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);

    for (var i = 0; i < 100; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setSeconds(newDate.getSeconds() + i);

        var visits = Math.round(Math.random() * 40) + 100;
        var hits = Math.round(Math.random() * 80) + 500;
        var views = Math.round(Math.random() * 6000);

        chartData.push({
            date: newDate,
            visits: visits,
            hits: hits,
            views: views
        });
    }
    return chartData;
}