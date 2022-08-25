import React,{useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SearchHighChart = ()=>{
  const [startDate, setStartDate] = useState(new Date());
  const [endDate,setEndDate]= useState(new Date());
  const [typePay,setTypePay] = useState (0);
  const ChangeStartDate = (date)=>{
    setStartDate(date)
  };
  const ChangeEndDate = (date)=>{
    setEndDate(date)
  }
  const ChangeTypePay = (e)=>{
    setTypePay(e.target.value);
  }
  const SubmitFilter = (e) =>{
    e.preventDefault();
    console.log(startDate);
    console.log(endDate);
    console.log(typePay);
  }
    return (
        <div className="search-hightchart">
              <form action="" className="search-hightchart__form">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label col-form-label-sm">Thời gian</label>
                  <div className="col-sm-2">
                    <div className="input-group date" data-provide="datepicker">
                      <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={ChangeStartDate}
                      />
                      {/* <div className="input-group-addon">
                        <i className="material-icons-outlined">today</i>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="input-group date" data-provide="datepicker">
                    <DatePicker 
                    selected={endDate}              
                    className="form-control"
                    onChange={ChangeEndDate}

                    >                      
                    </DatePicker>
                      
                    </div>
                  </div>
                  <label className="col-sm-2 col-form-label col-form-label-sm">Hình thức mua vé</label>
                  <div className="col-sm-4">
                    <select className="custom-select" onChange={ChangeTypePay} value={typePay}>
                      <option value="0">Chọn hình thức...</option>
                      <option value="1">Chuyển khoản ngân hàng</option>
                      <option value="2">Thanh toán ví</option>
                      <option value="3">Thanh toán tiền mặt</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">                  
                  <label className="col-sm-2 col-form-label col-form-label-sm">Hình thức mua vé</label>
                  <div className="col-sm-4">
                    <select className="custom-select" onChange={ChangeTypePay} value={typePay}>
                      <option value="0">Chọn hình thức...</option>
                      <option value="1">Chuyển khoản ngân hàng</option>
                      <option value="2">Thanh toán ví</option>
                      <option value="3">Thanh toán tiền mặt</option>
                    </select>
                  </div>
                  <label className="col-sm-2 col-form-label col-form-label-sm">Đối tượng</label>
                  <div className="col-sm-4 align-self-center">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="KhachQuocTe" value="option1"/>
                      <label className="form-check-label" for="KhachQuocTe">Khách quốc tế</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="KhachVN" value="option2"/>
                      <label className="form-check-label" for="KhachVN">Khách Việt Nam</label>
                    </div>
                  </div>
                </div>
                <div className="form-group text-center mt-5 mb-5">
                  <button type="submit" onClick={SubmitFilter} className="btn btn-primary">Thống kê</button>
                </div> 
              </form>

        </div>
    )
}
export default SearchHighChart