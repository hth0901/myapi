import React from 'react'
import { useNavigate } from 'react-router-dom'

import classes from './KdcTestPage.module.css'

const HinhThucGiaoDich = (props) => {
    const navigate = useNavigate()
    return (
        <div className={`${classes['col-9']} ${classes['col-s-9']}`}>
            <h4 className={classes['main-title']}>
                CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG
            </h4>
            <p className={classes['p-content']}>
                Chính sách bảo mật này công bố cách thức mà Trung tâm Bảo tồn Di
                tích Cố đô Huế (Sau đây gọi tắt là “Trung tâm BTDTCĐ” hoặc
                “Chúng tôi”) thu thập, lưu trữ và xử lý thông tin hoặc dữ liệu
                cá nhân (“Thông tin cá nhân”) của các Khách hàng của mình thông
                qua wesite eticket.hueworldheritage.org.vn. Chúng tôi cam kết sẽ
                bảo mật các Thông tin cá nhân của Khách hàng, sẽ nỗ lực hết sức
                và sử dụng các biện pháp thích hợp để các thông tin mà Khách
                hàng cung cấp cho chúng tôi trong quá trình sử dụng website này
                được bảo mật và bảo vệ khỏi sự truy cập trái phép. Tuy nhiên,
                Trung tâm BTDTCĐ không đảm bảo ngăn chặn được tất cả các truy
                cập trái phép. Trong trường hợp truy cập trái phép nằm ngoài khả
                năng kiểm soát của chúng tôi, Trung tâm BTDTCĐ sẽ không chịu
                trách nhiệm dưới bất kỳ hình thức nào đối với bất kỳ khiếu nại,
                tranh chấp hoặc thiệt hại nào phát sinh từ hoặc liên quan đến
                truy cập trái phép đó. Khách hàng được khuyến nghị để nắm rõ
                những quyền lợi của mình khi sử dụng các dịch vụ của Trung tâm
                BTDTCĐ được cung cấp trên website này. Trung tâm BTDTCĐ đưa ra
                các cam kết dưới đây phù hợp với các quy định của pháp luật Việt
                Nam, trong đó bao gồm các cách thức mà chúng tôi sử dụng để bảo
                mật thông tin của Khách hàng.
            </p>

            <h5 className={classes['sub-title']}>
                1. Mục đích và phạm vi thu thập thông tin
            </h5>
            <p className={classes['p-content']}>
                Việc thu thập thông tin cá nhân được thực hiện trên cơ sở khách
                hàng tự khai báo để đăng ký mua vé tham quan tại website
                eticket.hueworldheritage.org.vn tùy từng thời điểm, thông tin
                thu thập sẽ bao gồm nhưng không giới hạn ở:
            </p>
            <p className={classes['p-subcontent']}>
                - Thông tin cá nhân như: họ tên, độ tuổi, số CMND.
            </p>
            <p className={classes['p-subcontent']}>
                - Thông tin liên lạc như: số điện thoại di động, email.
            </p>
            <p className={classes['p-subcontent']}>
                - Các thông tin khác phục vụ cho chương trình khách hàng thân
                thiết (nếu có).
            </p>
            <p className={classes['p-content']}>
                Mục đích thu thập thông tin khách hàng bao gồm:
            </p>
            <p className={classes['p-subcontent']}>
                - Cung cấp các dịch vụ, sản phẩm theo nhu cầu của khách hàng
            </p>
            <p className={classes['p-subcontent']}>
                - Liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ, xác
                lập giao dịch trên website eticket.hueworldheritage.org.vn
            </p>
            <p className={classes['p-subcontent']}>
                - Thực hiện việc quản lý website
                eticket.hueworldheritage.org.vn, gửi thông tin cập nhật về
                website, các chương trình khuyến mại, ưu đãi/tri ân tới khách
                hàng;
            </p>
            <p className={classes['p-subcontent']}>
                - Bảo đảm quyền lợi của khách hàng khi phát hiện các hành động
                giả mạo, phá hoại tài khoản, lừa đảo khách hàng;
            </p>
            <p className={classes['p-subcontent']}>
                - Quản lý, phân tích, đánh giá số liệu để xây dựng chính sách
                bán và chính sách phục vụ Khách hàng phù hợp;
            </p>
            <p className={classes['p-subcontent']}>
                - Tiếp nhận thông tin, góp ý, đề xuất, khiếu nại của Khách hàng
                nhằm cải thiện chất lượng dịch vụ của Trung tâm BTDTCĐ;
            </p>
            <p className={classes['p-subcontent']}>
                - Liên lạc, hỗ trợ, giải quyết với khách hàng trong các trường
                hợp đặc biệt.
            </p>
            <p className={classes['p-content']}>
                Để tránh nghi ngờ, trong quá trình giao dịch thanh toán tại
                website eticket.hueworldheritage.org.vn, Trung tâm BTDTCĐ chỉ
                lưu giữ thông tin chi tiết về đơn hàng đã thanh toán của khách
                hàng, các thông tin về tài khoản ngân hàng của khách hàng sẽ
                không được lưu giữ.
            </p>

            <h5 className={classes['sub-title']}>
                2. Phạm vi sử dụng thông tin
            </h5>
            <p className={classes['p-content']}>
                Trung tâm BTDTCĐ chỉ sử dụng thông tin cá nhân của khách hàng
                cho các mục đích quy định tại Mục 1 hoặc mục đích khác (nếu có)
                với điều kiện đã thông báo và được sự đồng ý của khách hàng.
            </p>
            <p className={classes['p-content']}>
                Trung tâm BTDTCĐ sẽ không sử dụng thông tin cá nhân của khách
                hàng để gửi quảng cáo, giới thiệu dịch vụ và các thông tin có
                tính thương mại khác khi chưa được khách hàng chấp thuận.
            </p>
            <p className={classes['p-content']}>
                Khách hàng hiểu và đồng ý rằng Trung tâm BTDTCĐ có nghĩa vụ phải
                cung cấp thông tin khách hàng theo yêu cầu/quyết định của Cơ
                quan nhà nước có thẩm quyền và/hoặc quy định pháp luật. Trung
                tâm BTDTCĐ sẽ được miễn trừ mọi trách nhiệm liên quan đến bảo
                mật thông tin trong trường hợp này.
            </p>

            <h5 className={classes['sub-title']}>
                3. Thời gian lưu trữ thông tin
            </h5>
            <p className={classes['p-content']}>
                Dữ liệu cá nhân cơ bản của khách hàng đăng ký mua vé trực tuyến
                hoặc đăng ký thành viên sẽ được lưu trữ cho đến khi có yêu cầu
                hủy bỏ hoặc tự thành viên đăng nhập và thực hiện đóng tài khoản.
                Đối với các tài khoản đã đóng chúng tôi vẫn lưu trữ thông tin cá
                nhân và truy cập của khách hàng để phục vụ cho mục đích phòng
                chống gian lận, điều tra, giải đáp thắc mắc ... Các thông tin
                này sẽ được lưu trữ trong hệ thống máy chủ tối đa mười hai (12)
                tháng. Hết thời hạn này, chúng tôi sẽ tiến hành xóa vĩnh viễn
                thông tin cá nhân của khách hàng.
            </p>

            <h5 className={classes['sub-title']}>
                4. Quyền của Khách hàng đối với các Thông tin cá nhân được thu
                thập
            </h5>
            <p className={classes['p-content']}>
                Bất kỳ Khách hàng nào tự nguyện cung cấp Thông tin cá nhân cho
                ĐSVN đều có các quyền như sau:
            </p>
            <p className={classes['p-subcontent']}>
                - Yêu cầu xem lại các thông tin được thu thập;
            </p>
            <p className={classes['p-subcontent']}>
                - Yêu cầu sao chép lại các thông tin được thu thập;
            </p>
            <p className={classes['p-subcontent']}>
                - Yêu cầu chỉnh sửa, bổ sung thông tin được thu thập (trực tiếp
                bằng cách truy cập vào tài khoản của mình trên website của Trung
                tâm BTDTCĐ hoặc thông qua hệ thống hỗ trợ khách hàng của chúng
                tôi);
            </p>
            <p className={classes['p-subcontent']}>
                - Yêu cầu dừng việc thu thập thông tin;
            </p>
            <p className={classes['p-subcontent']}>
                - Yêu cầu xóa các thông tin đã được thu thập.
            </p>
            <p className={classes['p-subcontent']}>
                - Khách hàng có thể thực hiện các quyền trên bằng cách tự truy
                cập vào website hoặc liên hệ với chúng tôi qua email hoặc địa
                chỉ liên lạc được công bố trên website của Trung tâm BTDTCĐ.
            </p>
            <p className={classes['p-subcontent']}>
                - Trường hợp Khách hàng cung cấp cho Trung tâm BTDTCĐ các Thông
                tin cá nhân không chính xác hoặc không đầy đủ để xác nhận được
                nhân thân Khách hàng, chúng tôi không thể bảo vệ được quyền bảo
                mật của Khách hàng theo quy định trên.
            </p>

            <h5 className={classes['sub-title']}>
                5. Trung tâm BTDTCĐ cam kết
            </h5>
            <p className={classes['p-content']}>
                Mọi thông tin cá nhân của khách hàng thu thập được từ website
                eticket.hueworldheritage.org.vn sẽ được lưu giữ an toàn; chỉ có
                khách hàng mới có thể truy cập vào tài khoản cá nhân của mình
                bằng tên đăng nhập và mật khẩu do khách hàng chọn (đối với khách
                hàng có đăng ký tài khoản truy cập website).
            </p>
            <p className={classes['p-content']}>
                Đối với các giao dịch trực tuyến được thực hiện thông qua
                website eticket.hueworldheritage.org.vn, Trung tâm BTDTCĐ không
                lưu trữ thông tin thẻ thanh toán của khách hàng. Thông tin tài
                khoản, thẻ thanh toán của khách hàng sẽ được các đối tác cổng
                thanh toán của Trung tâm BTDTCĐ bảo vệ theo tiêu chuẩn quốc tế.
            </p>
            <p className={classes['p-content']}>
                Khách hàng có nghĩa vụ bảo mật tên đăng ký, mật khẩu và hộp thư
                điện tử của mình. Trung tâm BTDTCĐ sẽ không chịu trách nhiệm
                dưới bất kỳ hình thức nào đối với các thiệt hại, tổn thất (nếu
                có) do khách hàng không tuân thủ quy định bảo mật này.
            </p>
            <p className={classes['p-content']}>
                Khách hàng tuyệt đối không được có các hành vi sử dụng công cụ,
                chương trình để can thiệp trái phép vào hệ thống hay làm thay
                đổi dữ liệu của Trung tâm BTDTCĐ. Trong trường hợp Trung tâm
                BTDTCĐ phát hiện khách hàng có hành vi cố tình giả mạo, gian
                lận, phát tán thông tin cá nhân trái phép … Trung tâm BTDTCĐ có
                quyền chuyển thông tin cá nhân của khách hàng cho các cơ quan có
                thẩm quyền để xử lý theo quy định của pháp luật.
            </p>

            <h5 className={classes['sub-title']}>6. Thông tin của Trung tâm</h5>
            <p className={classes['p-content']}>
                <strong>TRUNG TÂM BẢO TỒN DI TÍCH CỐ ĐÔ HUẾ</strong>
            </p>
            <p className={classes['p-content']}>
                Địa chỉ: Tam Toà, 23 Tống Duy Tân – Thành phố Huế
            </p>
            <p className={classes['p-content']}>
                Điện thoại: +(84).234.3523237 - 3513322 – 3512751
            </p>
            <p className={classes['p-content']}>Email: huedisan@gmail.com</p>

            <h5 className={classes['sub-title']}>
                7. Việc cập nhật và ngôn ngữ của Chính sách bảo mật
            </h5>
            <p className={classes['p-content']}>
                Trung tâm BTDTCĐ sẽ chỉnh sửa Chính sách bảo mật này vào bất kỳ
                thời điểm nào khi cần thiết, bản Chính sách bảo mật cập nhật sẽ
                được công bố trên website của chúng tôi và sẽ được ghi ngày để
                Khách hàng nhận biết được bản mới nhất.
            </p>
            <p className={classes['p-content']}>
                Theo quy định pháp luật, ngôn ngữ được ưu tiên sử dụng và tham
                chiếu là tiếng Việt. Trong trường hợp có sự mâu thuẫn trong cách
                giải thích giữa bản tiếng Việt và các ngôn ngữ khác thì bản
                tiếng Việt sẽ được ưu tiên tham chiếu.
            </p>
            <p className={classes['p-content']}>
                Chính sách bảo mật này được cập nhật đến ngày 31 tháng 01 năm
                2022.
            </p>
        </div>
    )
}

export default HinhThucGiaoDich
