import React from "react";

const NewsIntro = (props) => {
    return (
        <section className="ftco-section ftco-blog bg-light">
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 text-center heading-section heading-section-white ">
                <h5>Có thể bạn quan tâm</h5>
                </div>
            </div>
            <div className="row blog d-flex">
                <div className="col-md-4 d-flex " data-aos="fade-up">
                <div className="blog-entry align-self-stretch">
                    <div className="img-blog">
                    <a href="#" className="category caption">Điểm vui chơi</a>
                    <a href="dichvu_detail.html" className="img" style={{backgroundImage: "url('images/event-3.jpg')"}}>
                    </a>
                    </div>
                    <div className="text text-blog d-block">
                    <h6 className="heading body-1"><a href="#">Chụp ảnh lưu niệm trang phục cung đình</a></h6>
                    <p className="description body-1">Dịch vụ chụp ảnh nghệ thuật cung đình lưu niệm cùng với các diễn viên và
                        nghệ sĩ với trang phục cung đình đẹp mắt...</p>
                    </div>
                </div>
                </div>
                <div className="col-md-4 d-flex " data-aos="fade-up">
                <div className="blog-entry align-self-stretch">
                    <div className="img-blog">
                    <a href="#" className="category caption">Ẩm thực</a>
                    <a href="dichvu_detail.html" className="img" style={{backgroundImage: "url('images/event-2.jpg')"}}>
                    </a>
                    </div>
                    <div className="text text-blog d-block">
                    <h6 className="heading body-1"><a href="#">Ẩm thực Cung đình</a></h6>
                    <p className="description body-1">Du khách không nên bỏ qua cơ hội thưởng thức những món ăn cung đình
                        trong không gian của những kiến trúc truyền thống...</p>
                    </div>
                </div>
                </div>
                <div className="col-md-4 d-flex " data-aos="fade-up">
                <div className="blog-entry align-self-stretch">
                    <div className="img-blog">
                    <a href="#" className="category caption">Lưu trú</a>
                    <a href="dichvu_detail.html" className="img" style={{backgroundImage: "url('images/event-6.jpg')"}}>
                    </a>
                    </div>
                    <div className="text text-blog d-block">
                    <h6 className="heading body-1"><a href="#">Thưởng thức trà Cung đình</a></h6>
                    <p className="description body-1">Uống trà là một thú chơi thanh đạm và tao nhã của người phương Đông nói
                        chung và người Việt Nam nói riêng...</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default NewsIntro;