import React from 'react'
import { useNavigate } from 'react-router-dom'

import classes from './KdcTestPage.module.css'

const DieuKhoanGiaoDich = (props) => {
    const navigate = useNavigate()

    return (
        <div className={`${classes['col-9']} ${classes['col-s-9']}`}>
            <h4 className={classes['main-title']}>ĐIỀU KHOẢN GIAO DỊCH</h4>
            <h5 className={classes['sub-title']}>1. Phạm vi áp dụng</h5>
            <p className={classes['p-content']}>
                Điều kiện dưới đây áp dụng riêng cho chức năng mua vé trực tuyến
                tại Website để tham quan các điểm di tích Huế do Trung tâm
                BTDTCĐ quản lý. Khi sử dụng chức năng để mua vé, Quý khách mặc
                nhiên đã chấp thuận và tuân thủ tất cả các chỉ dẫn, điều khoản,
                điều kiện và lưu ý đăng tải trên Website, bao gồm nhưng không
                giới hạn bởi Điều kiện sử dụng nêu ở đây. Nếu Quý khách không có
                ý định mua vé trực tuyến hay không đồng ý với bất kỳ điều khoản
                hay điều kiện nào nêu trong Điều kiện sử dụng, xin hãy dừng sử
                dụng chức năng này.
            </p>

            <h5 className={classes['sub-title']}>
                2. Điều kiện sử dụng tính năng mua vé trực Tuyến
            </h5>
            <p className={classes['p-content']}>
                Quý khách phải nhập đầy đủ và đúng các thông tin chúng tôi yêu
                cầu trong quá trình đặt mua vé. Chúng tôi không chịu bất kỳ
                trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt
                hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.
            </p>

            <h5 className={classes['sub-title']}>
                3. Quy định về đặt vé trực tuyến
            </h5>
            <p className={classes['p-content']}>
                Tính năng đặt vé trực tuyến hiện áp dụng cho tất cả các khách
                tham quan của Trung tâm BTDTCĐ
            </p>
            <p className={classes['p-content']}>
                Khi tiến hành các bước thanh toán, cần đọc kĩ các thông tin trên
                địa điểm tham quan, số lượng người và đối tượng tham quan trước
                khi hoàn tất việc xác nhận tất cả các thông tin về vé.
            </p>
            <p className={classes['p-content']}>
                Quý khách thanh toán giao dịch đặt vé theo quy định tại Chính
                Sách Thanh Toán đăng tải trên Trung tâm BTDTCĐ trước khi nhận mã
                đặt vé của giao dịch đó. Khi quý khách nhấn (click) vào ô “Thanh
                toán” để tiến hành thanh toán Đặt chỗ có nghĩa là đã xác nhận rà
                soát thông tin Đặt chỗ; và đồng ý là Điều Khoản Và Điều Kiện sẽ
                được áp dụng cho giao dịch mua vé trong giao dịch đó
            </p>
            <p className={classes['p-content']}>
                Email xác nhận đặt vé sau khi hoàn thành việc thanh toán vé trực
                tuyến, quý khách sẽ nhận được thư xác nhận thông tin chi tiết vé
                đã thanh toán thông qua địa chỉ thư điện tử (email) mà quý khách
                đã cung cấp. Email xác nhận thông tin đặt vé có thể đi vào hộp
                thư rác (spam mail) của bạn, vì vậy hãy kiểm tra chúng trước khi
                liên lạc với Trung tâm BTDTCĐ
            </p>
            <p className={classes['p-content']}>
                Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng
                cáo từ website. Sau đó, nếu không muốn tiếp tục nhận mail, quý
                khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng
                trong mọi email quảng cáo
            </p>

            <h5 className={classes['sub-title']}>4. Giá vé</h5>
            <p className={classes['p-content']}>
                Giá vé được niêm yết tại website là giá bán cuối cùng đã bao gồm
                thuế Giá trị gia tăng (VAT). Giá vé có thể thay đổi tùy thời
                điểm và chương trình khuyến mãi kèm theo và sẽ được hiển thị rõ
                tại trang Đặt vé khi quý khách tiến hành đặt hàng.
            </p>
            <p className={classes['p-content']}>
                Giá vé khi đặt vé trực tuyến trên website Trung tâm BTDTCĐ là
                giá vé người lớn và trẻ em. Các loại vé cho các đối tượng khác
                vui lòng mua trực tiếp tại quầy vé tại các điểm tham quan.
            </p>
            <p className={classes['p-content']}>
                Khán giả khi đến tham quan vui lòng mang theo giấy tờ tùy thân
                hoặc hình ảnh của giấy tờ tùy thân có ảnh nhận diện và ngày
                tháng năm sinh để đảm bảo việc tuân thủ theo quy định.
            </p>

            <h5 className={classes['sub-title']}>
                5. Giá trị giao dịch và hình thức thanh toán
            </h5>
            <p className={classes['p-content']}>
                Trung tâm BTDTCĐ cung cấp các hình thức thanh toán: thẻ Thanh
                toán Nội địa, một số loại ví điện tử hoặc thanh toán tại quầy vé
            </p>
            <p className={classes['p-content']}>
                Trừ một số trường hợp có ghi chú riêng, thông thường quý khách
                có thể lựa chọn một trong các hình thức thanh toán trên khi tiến
                hành đặt vé.
            </p>
            <p className={classes['p-content']}>
                Để đảm bảo an toàn thanh toán, Khách hàng lưu ý
            </p>
            <p className={classes['p-subcontent']}>
                <strong>1.</strong> Chỉ thực hiện thanh toán trực tuyến tại cửa
                sổ liên kết từ website Trung tâm BTDTCĐ chuyển đến
            </p>
            <p className={classes['p-subcontent']}>
                <strong>2.</strong> Sử dụng và bảo quản thẻ (thẻ tín dụng, thẻ
                ATM, thẻ mua hàng…) và thông tin tài khoản/thông tin thẻ cẩn
                thận;
            </p>
            <p className={classes['p-subcontent']}>
                <strong>3.</strong> Ngay khi phát hiện giao dịch phát sinh bất
                thường nào tại website Trung tâm BTDTCĐ, Khách hàng cần liên hệ
                ngay với bộ phận chăm sóc Khách hàng của Trung tâm BTDTCĐ để
                được xử lý kịp thời
            </p>
            <p className={classes['p-subcontent']}>
                <strong>4.</strong> Kiểm tra tài khoản ngân hàng của mình thường
                xuyên để đảm bảo tất cả giao dịch qua thẻ đều nằm trong tầm kiểm
                soát.
            </p>

            <h5 className={classes['sub-title']}>
                6. Giao kết giao dịch tại Trung tâm Bảo tồn di tích Cố đô Huế
            </h5>
            <p className={classes['p-content']}>
                Khách hàng khi mua vé trực tuyến tại website Trung tâm BTDTCĐ
                phải thực hiện các thao tác theo trình tự sau:
            </p>
            <p className={classes['p-subcontent']}>
                <strong>Bước 1:</strong> Khách hàng lựa chọn địa điểm tham quan.
            </p>
            <p className={classes['p-subcontent']}>
                <strong>Bước 2:</strong> Khách hàng lựa chọn số lượng người tham
                quan.
            </p>
            <p className={classes['p-subcontent']}>
                <strong>Bước 3:</strong> Thanh toán bằng các hình thức thanh
                toán online qua tài khoản ngân hàng.
            </p>
            <p className={classes['p-subcontent']}>
                <strong>Bước 4:</strong> Khách hàng nhận mã đặt chỗ sau khi
                thanh toán hoặc qua email.
            </p>
            <p className={classes['p-subcontent']}>
                <strong>Bước 5:</strong> Khách hàng cung cấp mã đặt vé và các
                thông tin cá nhân dùng đặt vé để vào Cổng tham quan. Nếu khách
                hàng không cung cấp được thông tin cá nhân và mã đặt vé, Trung
                tâm Bảo tồn di tích Cố đô Huế có quyền từ chối tham quan.
            </p>

            <h5 className={classes['sub-title']}>
                7. Thay đổi, hủy bỏ giao dịch đặt vé tại Trung tâm Bảo tồn di
                tích Cố đô Huế
            </h5>
            <p className={classes['p-content']}>
                Hiện tại Trung tâm BTDTCĐ chưa hỗ trợ dịch vụ hủy hoặc thay đổi
                thông tin vé đã thanh toán thành công trên website
            </p>
            <p className={classes['p-content']}>
                Hệ thống Đặt vé Online của Trung tâm BTDTCĐ có liên kết với rất
                nhiều đối tác khác, bao gồm Cổng thanh toán VNPay, các ngân hàng
                nội địa. Việc thanh toán thành công hay không phụ thuộc rất
                nhiều vào kết nối mạng của quý khách, việc truyền dẫn, nhận và
                trả tín hiệu của các tổ chức đối tác trên. Trung tâm BTDTCĐ chỉ
                thực hiện hoàn tiền trong trường hợp khi giao dịch, tài khoản
                của quý khách đã bị trừ tiền nhưng hệ thống của chúng tôi không
                ghi nhận việc đặt vé đó, và quý khách không nhận được xác nhận
                đặt vé thành công. Khi đó, quý khách vui lòng liên hệ hotline
                0234.3523237 (từ 8:00 đến 20:00 tất cả các ngày trong tuần) hoặc
                bạn có thể liên hệ với chúng tôi qua địa chỉ email
                huedisan@gmail.com để được hỗ trợ.
            </p>
            <p className={classes['p-content']}>
                Sau khi đã xác nhận các thông tin của khách hàng cung cấp về
                giao dịch không thành công, tùy theo từng loại tài khoản khách
                hàng sử dụng mà việc hoàn tiền sẽ có thời gian khác nhau:
            </p>
            <p className={classes['p-subcontent']}>
                <strong>1.</strong> Thẻ ATM ( Nội địa): hoàn tiền trong 07-15
                ngày (không tính cuối tuần và ngày lễ)
            </p>
            <p className={classes['p-subcontent']}>
                <strong>2.</strong> Riêng các giao dịch thanh toán bằng tiền
                trong ví điện tử: sẽ được hoàn trực tiếp vào số dư ví trong vòng
                05-10 ngày (không tính cuối tuần và ngày lễ). Còn các trường hợp
                thanh toán bằng ví nhưng thông qua liên kết thẻ sẽ tương tự 2
                trường hợp thẻ nội địa và quốc tế như trên.
            </p>
            <p className={classes['p-subcontent']}>
                <strong>3.</strong> Thời gian hoàn tiền không tính các ngày thứ
                7, Chủ nhật và lễ Tết
            </p>
            <p className={classes['p-subcontent']}>
                <strong>4.</strong> Trước khi thanh toán vé trực tuyến, chúng
                tôi khuyên quý khách nên xác nhận lại Địa điểm, Số lượng người
                tham quan, đối tượng muốn tham quan.
            </p>

            <h5 className={classes['sub-title']}>
                8. Thương hiệu và bản quyền
            </h5>
            <p className={classes['p-content']}>
                Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội
                dung thông tin và tất cả các thiết kế, văn bản, đồ họa, phần
                mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch phần mềm, mã
                nguồn và phần mềm cơ bản đều là tài sản của Trung tâm BTDTCĐ.
                Toàn bộ nội dung của trang web được bảo vệ theo pháp luật sở hữu
                trí tuệ của Việt Nam và các công ước, điều ước quốc tế mà Việt
                Nam tham gia hoặc là thành viên.
            </p>

            <h5 className={classes['sub-title']}>
                9. Luật áp dụng và giải quyết tranh chấp
            </h5>
            <p className={classes['p-content']}>
                Các điều kiện, điều khoản và nội dung của trang web này được
                điều chỉnh và giải thích theo luật pháp Việt Nam. Các tranh chấp
                phát sinh từ hoặc liên quan đến (các) giao dịch thực hiện tại
                trang web này sẽ được ưu tiên giải quyết thông qua thương lượng,
                hòa giải. Trường hợp các bên không tự giải quyết, tranh chấp sẽ
                được đưa ra xét xử tại Tòa án cấp có thẩm quyền của Việt Nam.
            </p>

            <h5 className={classes['sub-title']}>10. Quy định về bảo mật</h5>
            <p className={classes['p-content']}>
                Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử
                dụng các biện pháp tốt nhất bảo vệ thông tin và việc thanh toán
                của quý khách. Thông tin của quý khách trong quá trình thanh
                toán sẽ được mã hóa để đảm bảo an toàn. Sau khi quý khách hoàn
                thành quá trình đặt hàng, quý khách sẽ thoát khỏi chế độ an
                toàn.
            </p>
            <p className={classes['p-content']}>
                Quý khách không được sử dụng bất kỳ chương trình, công cụ hay
                hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi
                cấu trúc dữ liệu. Trang web cũng nghiêm cấm việc phát tán,
                truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá
                hoại hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay tổ chức
                vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước
                pháp luật nếu cần thiết. Mọi thông tin giao dịch sẽ được bảo mật
                trừ trường hợp buộc phải cung cấp theo yêu cầu của tòa án, (các)
                cơ quan có thẩm quyền hoặc theo quy định của pháp luật.
            </p>

            <h5 className={classes['sub-title']}>
                11. Giải quyết hậu quả do lỗi nhập sai thông tin thương mại tại
                Trung tâm Bảo tồn di tích Cố đô Huế
            </h5>
            <p className={classes['p-content']}>
                Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác
                khi tham gia giao dịch tại Trung tâm Bảo tồn di tích Cố đô Huế.
                Trong trường hợp khách hàng nhập sai thông tin tại đặt vé, Trung
                tâm Bảo tồn di tích Cố đô Huế có quyền từ chối thực hiện giao
                dịch. Ngoài ra, trong mọi trường hợp, khách hàng đều có quyền
                đơn phương chấm dứt giao dịch nếu đã thực hiện bằng cách thông
                báo cho Trung tâm Bảo tồn di tích Cố đô Huế qua đường dây nóng
                0234.3523237.
            </p>

            <h5 className={classes['sub-title']}>
                12. Quy định chấm dứt thỏa thuận
            </h5>
            <p className={classes['p-content']}>
                Trong trường hợp có bất kỳ thiệt hại nào phát sinh do việc vi
                phạm Quy Định sử dụng trang web, chúng tôi có quyền đình chỉ
                hoặc khóa tài khoản của quý khách vĩnh viễn. Nếu quý khách không
                hài lòng với trang web hoặc bất kỳ điều khoản, điều kiện, quy
                tắc, chính sách, hướng dẫn, hoặc cách thức vận hành của Trung
                tâm Bảo tồn di tích Cố đô Huế thì biện pháp khắc phục duy nhất
                là ngưng sử dụng dịch vụ của chúng tôi.
            </p>
            <p className={classes['p-content']}>
                Xin quý khách lưu ý chỉ mua hàng khi chấp nhận và hiểu rõ những
                quy định trên. Nếu cần hỗ trợ thêm thông tin, quý khách vui lòng
                tham khảo tại eticket.hueworldheritage.org.vn
            </p>
        </div>
    )
}

export default DieuKhoanGiaoDich
