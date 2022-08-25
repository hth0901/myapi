import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const ThamQuanDaiNoiNgay = ()=>{
  const options = {
    chart: {
      type: 'column',
      style: {
                  fontFamily: 'Roboto'
              }
    },
    title: {
      text: 'Thống kê tham quan tại Đại Nội trong ngày',
      style: { "color": "#F94527", "fontSize": "20px" }
    },
    colors: ['#FF9021', '#0263FF', '#22CFCF', '#8abb6f', '#bdc3c7', '#e74c3c'],
    xAxis: {
      categories: [
        'Khách ngoài tỉnh',
        'Khách trong tỉnh',
        'Khách Quốc tế',
        'Khách miễn phí tham quan'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} lượt</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Lượt',
      data: [590, 250, 570, 320]
  
    }]
  };
  return(
    
        <div>
                <HighchartsReact
                    highcharts = {Highcharts}
                    options = {options}
                />
            </div>
   
  );
}
export default ThamQuanDaiNoiNgay