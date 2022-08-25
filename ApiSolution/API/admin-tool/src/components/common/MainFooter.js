import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MainFooter = (props) => {
  return (
    <Fragment>
      <footer className="ftco-footer ftco-bg-dark ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 mb-md-0">
                <h2 className="ftco-heading-2">
                  <img src="images/logo.svg" alt="" />
                </h2>
                {/* <ul className="ftco-footer-social list-unstyled text-center">
                  <li className="ftco-animate">
                    <a href="javascript:void(0)">
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="javascript:void(0)">
                      <span className="icon-twitter"></span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="javascript:void(0)">
                      <span className="icon-instagram"></span>
                    </a>
                  </li>
                  <li className="ftco-animate">
                    <a href="javascript:void(0)">
                      <span className="icon-youtube"></span>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 mb-md-0 ml-md-5">
                <h2 className="ftco-heading-2">Liên kết</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="http://khamphahue.com.vn/" target='_blank' className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Khám phá Huế
                    </a>
                  </li>
                  <li>
                    <a href="http://visithue.vn/" target='_blank' className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Visit Huế
                    </a>
                  </li>
                  {/* <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Dịch vụ
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Mua vé
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 mb-md-0">
                <h2 className="ftco-heading-2">Về chúng tôi</h2>
                <ul className="list-unstyled">
                  <li>
                    <Link to={{pathname: 'http://hueworldheritage.org.vn/TTBTDTCDH.aspx?l=vn&TieuDeID=55&KenhID=107'}} target={'_blank'} className="body-1 d-flex"><i className="material-icons-outlined">chevron_right</i>{" "}Về chúng tôi</Link>
                  </li>
                  <li>
                    <Link to={{pathname: 'http://hueworldheritage.org.vn/TTBTDTCDH.aspx?TieuDeID=52&l=vn'}} target={'_blank'} className="body-1 d-flex"><i className="material-icons-outlined">chevron_right</i>{" "}Thông tin tham quan</Link>
                  </li>
                  <li>
                    <Link to={{pathname: 'http://hueworldheritage.org.vn/TTBTDTCDH.aspx?KenhID=92&TieuDeID=52&LoaiTieuDe=1&LoaiKenh=1&l=vn'}} target={'_blank'} className="body-1 d-flex"><i className="material-icons-outlined">chevron_right</i>{" "}Chương trình khuyến mãi</Link>
                  </li>
                  <li>
                    <Link to={{pathname: 'http://hueworldheritage.org.vn/TTBTDTCDH.aspx?TieuDeID=52&KenhID=119&ChuDeID=0&TinTucID=368&l=vn'}} target='_blank' className="body-1 d-flex"><i className="material-icons-outlined">chevron_right</i>{" "}Nội quy tham quan</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 mb-md-0">
                <h2 className="ftco-heading-2">Điều khoản sử dụng</h2>
                <ul className="list-unstyled">
                  <li>
                    {/* <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Điều khoản sử dụng
                    </a> */}
                    <Link to={'/dieu-khoan'} className="body-1 d-flex"><i className="material-icons-outlined">chevron_right</i>{" "}Điều khoản sử dụng</Link>
                  </li>
                  {/* <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Chính sách hoàn vé
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* <div className="col-md">
              <div className="ftco-footer-widget mb-4 mb-md-0">
                <h2 className="ftco-heading-2">Bạn cần biết</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Mua đặc sản Huế
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Phương tiện đi lại
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Bản đồ các điểm đến
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Giao thông ở Huế
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="body-1 d-flex">
                      <i className="material-icons-outlined">chevron_right</i>{" "}
                      Số điện thoại cần biết
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default MainFooter;
