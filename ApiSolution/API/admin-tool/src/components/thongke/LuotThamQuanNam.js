import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const LuotThamQuanNam = (props)=>{
  const listData = props.listData;
  const listYear = [];
  const listChild = [];
  const listAdult = [];
  listData.forEach(item=>{
    listYear.push(item.year);
    listChild.push(item.child);
    listAdult.push(item.adult);
  })
  const options = {
    chart: {
      type: 'column',
      style: {
                  fontFamily: 'Roboto'
              }
    },
    title: {
      text: 'Thống kê tổng lượt tham quan theo năm',
      style: { "color": "#F94527", "fontSize": "20px" }
    },
    colors: ['#0263FF', '#FF9021', '#22CFCF', '#8abb6f', '#bdc3c7', '#e74c3c'],
    xAxis: {
      categories:listYear,
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
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
      name: 'Người lớn',
      data:listAdult
  
    }, {
      name: 'Trẻ em',
      data: listChild
  
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
export default LuotThamQuanNam