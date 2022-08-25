import React,{useState,useEffect} from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import mConfig from '../../config/vnp_config.json';
const API_URL = process.env.REACT_APP_URL
function pad(num, size) {
    num = num.toString()
    while (num.length < size) num = '0' + num
    return num
  }
const DoanhThuNgay = (props)=>{
  const dateTime = new Date();
  const [day,setDay] = useState(dateTime.getDate());
  const [month,setMonth] = useState(dateTime.getMonth()+1);
  const [year,setYear] = useState(dateTime.getFullYear());
  const [ListPlace,setListPlace] = useState([]);
  const [ListPrice,setListPrice] = useState([]);
  useEffect(()=>{
    const dateTime2 = new Date(props.dateString);
    setDay(dateTime2.getDate());
    setMonth(dateTime2.getMonth()+1);
    setYear(dateTime2.getFullYear());
    ChangeValue(day,month,year);

  },[props])
  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
  //    fetch(`https://localhost:44311/api/ChiTietVe/${year}${month}${day}`, requestOptions)
  //   //fetch(`${API_URL}/ChiTietVe/20211223`, requestOptions)
  //     .then(response => response.text())
  //     .then(result =>{
  //       const listPrice = JSON.parse(result);
  //       const listSort = [];
  //       listPrice.forEach(item=>{
  //         const check = listSort.findIndex(item2=>item2.orderId===item.orderId)
  //         if(check===-1){
  //           const check2 = listSort.findIndex(item3=>item3.placeId===item.placeId)
  //           if (check2!=-1){
  //             listSort[check2].totalPrice = listSort[check2].totalPrice + item.totalPrice;
  //           }else {
  //             listSort.push(item);
  //           }
  //         }
  //       });
  //       const listPlaceCheck = [];
  //       const listPriceCheck = [];
  //       fetch(`${API_URL}/DiaDiem`, requestOptions)
  //       .then(response2 => response2.text())
  //       .then(result2=>{
  //         const listPlace = JSON.parse(result2);
  //         listSort.forEach(item=>{
  //           listPriceCheck.push(item.totalPrice);
  //            listPlace.forEach(item2=>{
  //              if(item2.id===item.placeId){
  //                listPlaceCheck.push(item2.title); 
  //              }
  //            })
  //         });
  //         setListPrice(listPriceCheck);
  //         setListPlace(listPlaceCheck);
  //         //console.log(listPriceCheck);
  //         //console.log(listPlaceCheck);
          
  //       });
       
        
  //     }) 
  //     .catch(error => console.log('error', error));
  // }, []);
  const options2 = {
chart: {
  type: 'column',
  style: {
              fontFamily: 'Roboto'
          }
},
title: {
  text: `Thống kê doanh thu ngày ${day}/${month}/${year}` ,
  style: { "color": "#F94527", "fontSize": "20px" }
},
colors: ['#0263FF', '#FF9021', '#22CFCF', '#8abb6f', '#bdc3c7', '#e74c3c'],
xAxis: {
  categories: ListPlace,
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
  name: 'Triệu đồng',
  data: ListPrice,
  dataLabels: {
    enabled: true,
    formatter: function() {
        return Highcharts.numberFormat(this.y, 0)+ " đ";
    }
  }
}]
}






  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'My chart'
    },
    xAxis: {
      categories: ['Lăng tự đức', 'Lăng minh mạng', 'Lăng khai định'],
    },
    series: [
      {
        data: [1,2,3,4,5
    ]
      }
    ]
  };
  const ChangeValue =(d,m,y)=>{
       
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
     fetch(`${API_URL}/api/ChiTietVe/${y}${pad(m,2)}${pad(d,2)}`, requestOptions)
    //fetch(`${API_URL}/ChiTietVe/20211223`, requestOptions)
      .then(response => response.text())
      .then(result =>{
        const listPrice = JSON.parse(result);
        const listSort = [];
        listPrice.forEach(item=>{
         
            const check2 = listSort.findIndex(item3=>item3.placeId===item.placeId)
            if (check2!=-1){
              listSort[check2].totalPrice = listSort[check2].totalPrice + item.totalPrice;
            }else {
              listSort.push(item);
            }
          
        });
        const listPlaceCheck = [];
        const listPriceCheck = [];
        fetch(`${API_URL}/api/DiaDiem`, requestOptions)
        .then(response2 => response2.text())
        .then(result2=>{
          const listPlace = JSON.parse(result2);
          listSort.forEach(item=>{
            listPriceCheck.push(item.totalPrice);
             listPlace.forEach(item2=>{
               if(item2.id===item.placeId){
                 listPlaceCheck.push(item2.title); 
               }
             })
          });
          setListPrice(listPriceCheck);
          setListPlace(listPlaceCheck);
          //console.log(listPriceCheck);
          //console.log(listPlaceCheck);
          
        });
       
        
      }) 
      .catch(error => console.log('error', error));

  }
  return(

        <div>
          {/* <input type="date" className="form-control pickTime" id="test"  />                    */}
                <HighchartsReact
                    highcharts = {Highcharts}
                    options = {options2}
                />
          </div>
    )
}
export default DoanhThuNgay

  