import React, { useEffect } from "react";
import { Fragment } from "react";
import AOS from "aos";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/common/MainFooter";
import DoanhThuNgay from "../components/thongke/DoanhThuNgay";



const ThongKeDoanhThuNgay = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);
  return (
    <Fragment>
      {/* <HomeSlider /> */}
      {/* <TestSlider /> */}
      <MainHeader />
      <div className="container">
      <div className="row" style={{marginTop:"100px"}}>
        <MainHeader/>
        <div className="col col-md-12">
        <DoanhThuNgay/>
        </div>
      </div>
      </div>
      <MainFooter />

    </Fragment>
  );
};

export default ThongKeDoanhThuNgay;
