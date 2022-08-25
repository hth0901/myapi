import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const LuotThamQuanNgay = (props) => {
    const data = props.listData
    console.log(data)
    const listPlace = []
    const child = []
    const adult = []
    const specal = []
    data.forEach((item) => {
        listPlace.push(item.name)
        child.push(item.Child)
        adult.push(item.Adult)
        specal.push(item.Specal)
    })
    const options = {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Roboto',
            },
        },
        title: {
            text: 'Thống kê lượt tham quan trong ngày',
            style: { color: '#F94527', fontSize: '20px' },
        },
        colors: [
            '#0263FF',
            '#FF9021',
            '#22CFCF',
            '#8abb6f',
            '#bdc3c7',
            '#e74c3c',
        ],
        xAxis: {
            categories: listPlace,
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Người lớn',
                data: adult,
            },
            {
                name: 'Trẻ em',
                data: child,
            },
            {
                name: 'Đặc biệt',
                data: specal,
            },
        ],
    }

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}
export default LuotThamQuanNgay
