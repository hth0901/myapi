import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './KdcTestPage.module.css'

const KdcTestPage = (props) => {
    return (
        <div className="container">
            <div className={classes.header}>
                <h1>Chania</h1>
            </div>

            <div className={classes.row}>
                <div
                    className={`${classes['col-3']} ${classes['col-s-3']} ${classes['menu']}`}
                >
                    <ul>
                        <li>
                            <NavLink
                                className={(navData) => {
                                    return navData.isActive ? `active` : ''
                                }}
                                to="/dieu-khoan/dieu-khoan-chung"
                            >
                                Điều khoản chung
                            </NavLink>
                        </li>
                        <li>The City</li>
                        <li>The Island</li>
                        <li>The Food</li>
                    </ul>
                </div>

                <div className={`${classes['col-9']} ${classes['col-s-9']}`}>
                    <h4 className={classes['main-title']}>ĐIỀU KHOẢN CHUNG</h4>
                    <h5 className={classes['sub-title']}>
                        1. Trách nhiệm của người sử dụng:
                    </h5>
                    <p className={classes['p-content']}>
                        Khi truy cập vào trang web này, bạn đồng ý chấp nhận mọi
                        rủi ro. Trung tâm Bảo tồn Di tích Cố đô Huế (sau đây gọi
                        tắt là “Trung tâm BTDTCĐ” hoặc “Chúng tôi”) và các bên
                        đối tác khác không chịu trách nhiệm về bất kỳ tổn thất
                        nào do những hậu quả trực tiếp, tình cờ hay gián tiếp;
                        những thất thoát, chi phí (bao gồm chi phí pháp lý, chi
                        phí tư vấn hoặc các khoản chi tiêu khác) có thể phát
                        sinh trực tiếp hoặc gián tiếp do việc truy cập trang web
                        hoặc khi tải dữ liệu về máy; những tổn hại gặp phải do
                        virus, hành động phá hoại trực tiếp hay gián tiếp của hệ
                        thống máy tính khác, đường dây điện thoại, phần cứng,
                        phần mềm, lỗi chương trình, hoặc bất kì các lỗi nào
                        khác; đường truyền dẫn của máy tính hoặc nối kết mạng bị
                        chậm…
                    </p>
                    <h5 className={classes['sub-title']}>
                        2. Về nội dung trên trang web
                    </h5>
                    <p className={classes['p-content']}>
                        Tất cả những thông tin ở đây được cung cấp cho bạn một
                        cách trung thực như bản thân sự việc. Trung tâm BTDTCĐ
                        và các bên liên quan không bảo đảm, hay có bất kỳ tuyên
                        bố nào liên quan đến tính chính xác, tin cậy của việc sử
                        dụng hay kết quả của việc sử dụng nội dung trên trang
                        web này. Nội dung trên website được cung cấp vì lợi ích
                        của cộng đồng và có tính phi thương mại. Các cá nhân và
                        tổ chức không được phép sử dụng nội dung trên website
                        này với mục đích thương mại mà không có sự ưng thuận của
                        Trung tâm BTDTCĐ bằng văn bản. Mặc dù Trung tâm BTDTCĐ
                        luôn cố gắng cập nhật thường xuyên các nội dung tại
                        trang web, nhưng chúng tôi không bảo đảm rằng các thông
                        tin đó là mới nhất, chính xác hay đầy đủ. Tất cả các nội
                        dung website có thể được thay đổi bất kỳ lúc nào.
                    </p>
                    <h5 className={classes['sub-title']}>3. Về bản quyền</h5>
                    <p className={classes['p-content']}>
                        Trung tâm BTDTCĐ là chủ bản quyền của trang web này.
                        Việc chỉnh sửa trang, nội dung, và sắp xếp thuộc về thẩm
                        quyền của Trung tâm BTDTCĐ. Sự chỉnh sửa, thay đổi, phân
                        phối hoặc tái sử dụng những nội dung trong trang này vì
                        bất kì mục đích nào khác được xem như vi phạm quyền lợi
                        hợp pháp của Trung tâm BTDTCĐ.
                    </p>
                    <h5 className={classes['sub-title']}>
                        4. Về việc sử dụng thông tin
                    </h5>
                    <p className={classes['p-content']}>
                        Chúng tôi sẽ không sử dụng thông tin cá nhân của bạn
                        trên website này nếu không được phép. Nếu bạn đồng ý
                        cung cấp thông tin cá nhân, bạn sẽ được bảo vệ. Thông
                        tin của bạn sẽ được sử dụng với mục đích, liên lạc với
                        bạn để thông báo các thông tin cập nhật của Trung tâm
                        BTDTCĐ như chương trình, sự kiện, khuyến mại qua email
                        hoặc bưu điện. Thông tin cá nhân của bạn sẽ không được
                        gửi cho bất kỳ ai sử dụng ngoài trang web Trung tâm
                        BTDTCĐ, ngoại trừ những mở rộng cần thiết để bạn có thể
                        tham gia vào trang web (những nhà cung cấp dịch vụ, đối
                        tác, các công ty quảng cáo) và yêu cầu cung cấp bởi luật
                        pháp. Nếu chúng tôi chia sẻ thông tin cá nhân của bạn
                        cho các nhà cung cấp dịch vụ, công ty quảng cáo, các
                        công ty đối tác liên quan, thì chúng tôi cũng yêu cầu họ
                        bảo vệ thông tin cá nhân của bạn như cách chúng tôi thực
                        hiện.
                    </p>
                    <h5 className={classes['sub-title']}>
                        5. Vể việc tải dữ liệu
                    </h5>
                    <p className={classes['p-content']}>
                        Nếu bạn tải về máy những dữ liệu từ trang này, thì các
                        dữ liệu tải về sẽ thuộc bản quyền của Trung tâm BTDTCĐ
                        và cho phép bạn sử dụng. Bạn không được sở hữu những dữ
                        liệu đã tải và Trung tâm BTDTCĐ không nhượng quyền cho
                        bạn. Bạn cũng không được phép bán, phân phối lại, tuyên
                        bố quyền sở hữu…
                    </p>
                    <h5 className={classes['sub-title']}>
                        6. Thay đổi nội dung
                    </h5>
                    <p className={classes['p-content']}>
                        Trung tâm BTDTCĐ giữ quyền thay đổi, chỉnh sửa và loại
                        bỏ những thông tin hợp pháp vào bất kỳ thời điểm nào vì
                        bất kỳ lý do nào.
                    </p>
                    <h5 className={classes['sub-title']}>
                        7. Liên kết với các trang khác
                    </h5>
                    <p className={classes['p-content']}>
                        Mặc dù trang web này có thể được liên kết với những
                        trang khác, Trung tâm BTDTCĐ không trực tiếp hoặc gián
                        tiếp tán thành, tổ chức, tài trợ, đứng sau hoặc sát nhập
                        với những trang đó, trừ phi điều này được nêu ra rõ
                        ràng. Khi truy cập vào trang web, bạn phải hiểu và chấp
                        nhận rằng Trung tâm BTDTCĐ không thể kiểm soát tất cả
                        những trang liên kết với trang Trung tâm BTDTCĐ và cũng
                        không chịu trách nhiệm cho nội dung của những trang liên
                        kết.
                    </p>
                    <h5 className={classes['sub-title']}>
                        8. Đưa thông tin lên trang web
                    </h5>
                    <p className={classes['p-content']}>
                        Bạn không được đưa lên, hoặc chuyển tải lên trang web
                        tất cả những hình ảnh, từ ngữ khiêu dâm, thô tục, xúc
                        phạm, phỉ báng, bôi nhọ, đe dọa, những thông tin không
                        hợp pháp hoặc những thông tin có thể đưa đến việc vi
                        phạm pháp luật, trách nhiệm pháp lý. Trung tâm BTDTCĐ và
                        tất cả các bên có liên quan đến việc xây dựng và quản lý
                        trang web không chịu trách nhiệm hoặc có nghĩa vụ pháp
                        lý đối với những phát sinh từ nội dung do bạn tải lên
                        trang web.
                    </p>
                    <h5 className={classes['sub-title']}>9. Luật áp dụng</h5>
                    <p className={classes['p-content']}>
                        Mọi hoạt động phát sinh từ trang web có thể sẽ được phân
                        tích và đánh giá theo luật pháp Việt Nam và toà án tỉnh
                        Thừa Thiên Huế. Và bạn phải đồng ý tuân theo các điều
                        khoản riêng của các toà án này.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default KdcTestPage
