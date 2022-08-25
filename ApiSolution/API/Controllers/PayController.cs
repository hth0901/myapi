using API.Models;
using API.Services;
using API.Settings;
using Domain;
using Application.Core;
using Application.Order;
using Domain.RequestEntity;
using Domain.ResponseEntity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Dynamic;
using Microsoft.AspNetCore.SignalR;
using VeDienTu.Hubs;
using System.Net.Http;
using System.Net.Http.Json;
using VeDienTu.Ultility;

namespace API.Controllers
{
    public class ResponseCode
    {
        public string RspCode { get; set; }
        public string Message { get; set; }
    }

    public class CommonResponseMessage
    {
        public string RspCode { get; set; }
        public string Message { get; set; }
        public string Url { get; set; }
        public bool IsValid { get; set; }
    }
    public class PayController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IOptions<VNP_Settings> _vnp_settings;
        private readonly IOptions<MyQrSettings> _qrSetting;
        private readonly IHubContext<MessageHub> _messageHub;

        public PayController(IWebHostEnvironment hostingEnvironment, IOptions<VNP_Settings> vnp_settings, IHubContext<MessageHub> messageHub, IOptions<MyQrSettings> qrSetting) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _vnp_settings = vnp_settings;
            _messageHub = messageHub;
            _qrSetting = qrSetting;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult IpnTest()
        {
            ResponseCode res = new ResponseCode
            {
                RspCode = "200",
                Message = "ok"
            };
            Result<ResponseCode> ressult = Result<ResponseCode>.Success(res);
            
            return HandlerResult(ressult);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("createorder")]
        public async Task<IActionResult> CreateQuickOrder([FromBody] OrderRequest _request)
        {
            var name = (ClaimsIdentity)User.Identity;
            var insertResult = await Mediator.Send(new OrderInsert.Command { OrderRequest = _request, username = name.Name });
            //return Ok();
            if (insertResult.IsSuccess)
            {
                return Ok(_request.Order);
            }
            return HandlerResult(insertResult);
        }

        [HttpPost("genqrorderpay/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GenQrOrderPay(string id)
        {
            Guid guid = new Guid();
            Guid.TryParse(id, out guid);

            var ticketOrderResult = await Mediator.Send(new Application.TicketOrder.Detail.Query { Id = guid });

            if (!ticketOrderResult.IsSuccess)
            {
                return HandlerResult(ticketOrderResult);
            }

            DateTime expDate = ticketOrderResult.Value.CreatedDate.Value.AddDays(3);
            CreateQrPayRequest _request = new CreateQrPayRequest
            {
                appId = _qrSetting.Value.AppId,
                //merchantName = "TT Bảo tồn di tích Huế",
                merchantName = _qrSetting.Value.MerchantName,
                serviceCode = _qrSetting.Value.ServiceCode,
                countryCode = _qrSetting.Value.CountryCode,
                merchantCode = _qrSetting.Value.MerchantCode,
                terminalId = _qrSetting.Value.TerminalId,
                payType = _qrSetting.Value.PayType,
                productId = "",
                txnId = "",
                billNumber = ticketOrderResult.Value.OrderTempId,
                amount = ticketOrderResult.Value.TotalPrice.ToString(),
                ccy = _qrSetting.Value.Ccy,
                expDate = expDate.ToString("yyMMddHHmm"),
                //expDate = "2212312359",
                desc = "",
                masterMerCode = _qrSetting.Value.MasterMerCode,
                merchantType = _qrSetting.Value.MerchantType,
                tipAndFee = "",
                consumerID = "",
                purpose = _qrSetting.Value.Purpose,
                payloadFormat = null,
                productName = "",
                imageName = "",
                merchantCity = "",
                fixedFee = "",
                merchantCC = "",
                percentageFee = "",
                pinCode = "",
                mobile = "",
                creator = "",
                checksum = ""
            };
            //string strChecksum = $"{_request.appId}|{_request.merchantName}|{_request.serviceCode}|{_request.countryCode}|{_request.masterMerCode}|{_request.merchantType}|{_request.merchantCode}|{_request.terminalId}|{_request.payType}|{_request.productId}|{_request.txnId}|{_request.amount}|{_request.tipAndFee}|{_request.ccy}|{_request.expDate}|vcbkientt@2019";
            string strChecksum = $"{_request.appId}|{_request.merchantName}|{_request.serviceCode}|{_request.countryCode}|{_request.masterMerCode}|{_request.merchantType}|{_request.merchantCode}|{_request.terminalId}|{_request.payType}|{_request.productId}|{_request.txnId}|{_request.amount}|{_request.tipAndFee}|{_request.ccy}|{_request.expDate}|{_qrSetting.Value.MyApp}";

            _request.checksum = NumberHelper.MD5Hash(strChecksum);

            HttpClient client = new HttpClient();
            HttpResponseMessage res = await client.PostAsJsonAsync("http://192.168.200.35/VcbQrCodeLibVer2/api/vcbqrcodelibver2/genqrcode", _request);
            CreateQrPayResponse dkm = await res.Content.ReadFromJsonAsync<CreateQrPayResponse>();

            //CreateQrPayResponse dkm = new CreateQrPayResponse
            //{
            //    code = "00",
            //    message = "Success",
            //    data = "000201010211262900069704360115068000000000005530370454062345675802VN5922TT Bảo tồn di tích Huế6005HANOI6105100006281011020220808080318TTBAOTONDITICH HUE052202301231115920220808020708200779730903AME63041214",
            //    url = "",
            //    checksum = "46260A5115847A2B4EAFA2019FDE500E",
            //    isDelete = "true",
            //    idQrcode = "1401964"
            //};
            return Ok(dkm);
        }

        [HttpPost("genqrpay")]
        [AllowAnonymous]
        public async Task<IActionResult> GenQrPay([FromBody] GenQrPayRequest request)
        {
            DateTime today = DateTime.Now;
            DateTime expDate = today.AddDays(3);
            //CreateQrPayRequest _request = new CreateQrPayRequest
            //{
            //    appId = "TTBTDTHUE",
            //    merchantName = "TT Bao ton di tich Hue",
            //    serviceCode = "02",
            //    countryCode = "VN",
            //    merchantCode = "068000000000005",
            //    terminalId = "20077973",
            //    payType = "03",
            //    productId = "",
            //    txnId = "",
            //    billNumber = request.id,
            //    amount = request.amount,
            //    ccy = "704",
            //    //expDate = expDate.ToString("yyMMddHHmm"),
            //    expDate = "2212312359",
            //    desc = "",
            //    masterMerCode = "970436",
            //    merchantType = "8062",
            //    tipAndFee = "",
            //    consumerID = "",
            //    purpose = "HOANG HIEU THANH TOAN",
            //    payloadFormat = null,
            //    productName = "",
            //    imageName = "",
            //    merchantCity = "",
            //    fixedFee = "",
            //    merchantCC = "",
            //    percentageFee = "",
            //    pinCode = "",
            //    mobile = "",
            //    creator = "",
            //    checksum = ""
            //};

            CreateQrPayRequest _request = new CreateQrPayRequest
            {
                appId = _qrSetting.Value.AppId,
                //merchantName = "TT Bảo tồn di tích Huế",
                merchantName = _qrSetting.Value.MerchantName,
                serviceCode = _qrSetting.Value.ServiceCode,
                countryCode = _qrSetting.Value.CountryCode,
                merchantCode = _qrSetting.Value.MerchantCode,
                terminalId = _qrSetting.Value.TerminalId,
                payType = _qrSetting.Value.PayType,
                productId = "",
                txnId = "",
                billNumber = request.id,
                amount = request.amount,
                ccy = _qrSetting.Value.Ccy,
                expDate = expDate.ToString("yyMMddHHmm"),
                desc = "",
                masterMerCode = _qrSetting.Value.MasterMerCode,
                merchantType = _qrSetting.Value.MerchantType,
                tipAndFee = "",
                consumerID = "",
                purpose = _qrSetting.Value.Purpose,
                payloadFormat = null,
                productName = "",
                imageName = "",
                merchantCity = "",
                fixedFee = "",
                merchantCC = "",
                percentageFee = "",
                pinCode = "",
                mobile = "",
                creator = "",
                checksum = ""
            };

            //string strChecksum = $"{_request.appId}|{_request.merchantName}|{_request.serviceCode}|{_request.countryCode}|{_request.masterMerCode}|{_request.merchantType}|{_request.merchantCode}|{_request.terminalId}|{_request.payType}|{_request.productId}|{_request.txnId}|{_request.amount}|{_request.tipAndFee}|{_request.ccy}|{_request.expDate}|vcbkientt@2019";
            string strChecksum = $"{_request.appId}|{_request.merchantName}|{_request.serviceCode}|{_request.countryCode}|{_request.masterMerCode}|{_request.merchantType}|{_request.merchantCode}|{_request.terminalId}|{_request.payType}|{_request.productId}|{_request.txnId}|{_request.amount}|{_request.tipAndFee}|{_request.ccy}|{_request.expDate}|{_qrSetting.Value.MyApp}";

            _request.checksum = NumberHelper.MD5Hash(strChecksum);

            HttpClient client = new HttpClient();
            HttpResponseMessage res = await client.PostAsJsonAsync("http://192.168.200.35/VcbQrCodeLibVer2/api/vcbqrcodelibver2/genqrcode", _request);
            CreateQrPayResponse dkm = await res.Content.ReadFromJsonAsync<CreateQrPayResponse>();
            return Ok(dkm);
        }

        [HttpPost("genqrpaydemo")]
        [AllowAnonymous]
        public async Task<IActionResult> GenQrPayDemo([FromBody] GenQrPayRequest request)
        {
            DateTime today = DateTime.Now;
            DateTime expDate = today.AddDays(3);
            CreateQrPayRequest _request = new CreateQrPayRequest
            {
                appId = "TTBTDTHUE",
                merchantName = "TT Bảo tồn di tích Huế",
                serviceCode = "02",
                countryCode = "VN",
                merchantCode = "068000000000005",
                terminalId = "20077973",
                payType = "03",
                productId = request.id,
                txnId = request.id,
                billNumber = request.id,
                amount = request.amount,
                ccy = "704",
                expDate = expDate.ToString("yyMMddHHmm"),
                desc = "",
                masterMerCode = "970436",
                merchantType = "8062",
                tipAndFee = "",
                consumerID = "",
                purpose = "HOANG HIEU THANH TOAN",
                payloadFormat = null,
                productName = "",
                imageName = "",
                merchantCity = "",
                fixedFee = "",
                merchantCC = "",
                percentageFee = "",
                pinCode = "",
                mobile = "",
                creator = "",
                checksum = ""
            };

            string strChecksum = $"{_request.appId}|{_request.merchantName}|{_request.serviceCode}|{_request.countryCode}|{_request.masterMerCode}|{_request.merchantType}|{_request.merchantCode}|{_request.terminalId}|{_request.payType}|{_request.productId}|{_request.txnId}|{_request.amount}|{_request.tipAndFee}|{_request.ccy}|{_request.expDate}| vcbkientt@2019";

            _request.checksum = NumberHelper.MD5Hash(strChecksum);

            //HttpClient client = new HttpClient();
            //HttpResponseMessage res = await client.PostAsJsonAsync("http://192.168.200.35/VcbQrCodeLibVer2/api/vcbqrcodelibver2/genqrcode", _request);
            //CreateQrPayResponse dkm = await res.Content.ReadFromJsonAsync<CreateQrPayResponse>();
            CreateQrPayResponse dkm = new CreateQrPayResponse
            {
                code = "00",
                message = "Success",
                data = "000201010211262900069704360115068000000000005530370454062345675802VN5922TT Bảo tồn di tích Huế6005HANOI6105100006281011020220808080318TTBAOTONDITICH HUE052202301231115920220808020708200779730903AME63041214",
                url = "",
                checksum = "46260A5115847A2B4EAFA2019FDE500E",
                isDelete = "true",
                idQrcode = "1401964"
            };
            return Ok(dkm);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("test")]
        public async Task<IActionResult> Test([FromBody] OrderRequest _request)
        {
            var insertResult = await Mediator.Send(new OrderInsert.Command { OrderRequest = _request });
            //return Ok();
            return HandlerResult(insertResult);
        }

        [HttpPost("updatemerchantstatus")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateMerchantStatus([FromBody] UpdateMerchansStatusDemoRequest _request)
        {

            UpdateMerchantStatusRequest _testreques = new UpdateMerchantStatusRequest { checksum = DateTime.Now.ToString("yyyyMMddHHmmss"), txnId = _request.txnId, code = _request.code, message = _request.message };
            var insertResult = await Mediator.Send(new Application.UpdatePaymentStatusLog.ThemMoi.Command { Entity = _testreques });
            dynamic flexible = new ExpandoObject();
            flexible.code = "00";
            flexible.message = "OK";
            flexible.data = new ExpandoObject();
            flexible.data.txnId = "20220808";

            await _messageHub.Clients.All.SendAsync("sendToClient", new shjt { message = _request.txnId });

            //if (insertResult.IsSuccess)
            //{
            //    return Ok(flexible);

            //}
            //else
            //{
            //    flexible.code = "99";
            //    flexible.message = "fail";
            //}
            return Ok(flexible);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ticketdetailreturn/{id}")]
        public async Task<IActionResult> TicketDetailReturn(string id)
        {
            var result = await Mediator.Send(new Application.TicketOrder.TicketDetail.Query { Id = id });
            if (result.IsSuccess || result.Value != null)
            {
                var detailResult = await Mediator.Send(new Application.TicketDetail.DanhSachChiTietVeReturn.Query { OrderId = id });
                result.Value.TicketDetailReturn = detailResult.Value;

            }
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ticket/{id}")]
        public async Task<IActionResult> TicketDetail(string id)
        {
            var result = await Mediator.Send(new Application.TicketOrder.TicketDetail.Query { Id = id });
            if (result.IsSuccess || result.Value != null)
            {
                var detailResult = await Mediator.Send(new Application.TicketDetail.DanhSachChiTietVe.Query { OrderId = id });
                result.Value.TicketPlaceDetails = detailResult.Value;

            }
            return HandlerResult(result);
        }

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("sendemailorder")]
        //public async Task<IActionResult> SendEmailOrder()
        //{

        //}

        [HttpGet]
        [AllowAnonymous]
        [Route("ticketscan/{id}/{cusid}")]
        public async Task<IActionResult> TicketScanDetail(string id, int cusid)
        {
            var result = await Mediator.Send(new Application.TicketOrder.TicketDetail.Query { Id = id });
            if (result.IsSuccess || result.Value == null)
            {
                var detailResult = await Mediator.Send(new Application.TicketDetail.DanhSachChiTietVe.Query { OrderId = id });
                result.Value.TicketPlaceDetails = detailResult.Value;

            }
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ticketdetailbyid/{id}")]
        public async Task<IActionResult> TicketDetailById(string id)
        {
            var result = await Mediator.Send(new Application.TicketOrder.TicketDetailById.Query { Id = id });
            if (result.IsSuccess || result.Value == null)
            {
                var detailResult = await Mediator.Send(new Application.TicketDetail.DanhSachChiTietVe.Query { OrderId = result.Value.ID });
                result.Value.TicketPlaceDetails = detailResult.Value;

            }
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ticketdetail/{id}")]
        public async Task<IActionResult> GetTicketDetail(string id)
        {
            var result = await Mediator.Send(new Application.TicketDetail.DanhSachChiTietVe.Query { OrderId = id });
            //var result = await Mediator.Send(new Application.TicketDetail.ListTicketDetail.Query { TicketId = id });

            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ticketdetail_v2/{id}")]
        public async Task<IActionResult> GetTicketDetail_v2(string id)
        {
            //var result = await Mediator.Send(new Application.TicketDetail.DanhSachChiTietVe.Query{ OrderId=id});
            var result = await Mediator.Send(new Application.TicketDetail.ListTicketDetail.Query { TicketId = id });

            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ticketid/{id}")]
        public async Task<IActionResult> GetTicketId(string id)
        {
            var result = await Mediator.Send(new Application.TicketDetail.TicketId.Query { OrderId = id });

            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("query/{id}")]
        public async Task<IActionResult> OrderDetail(string id)
        {
            var result = await Mediator.Send(new Application.Order.OrderDetail.Query { Id = id });
            return HandlerResult(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("buyticket")]
        public async Task<IActionResult> BuyTicket([FromBody] TicketOrder ticketOrder)
        {
            var name = (ClaimsIdentity)User.Identity;
            ticketOrder.CreatedBy = name.Name;
            var ticketResult = await Mediator.Send(new Application.TicketOrder.Create.Command { Request = ticketOrder });

            if (ticketResult.IsSuccess && ticketResult.Value != null)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "00", Message = "Confirm Success" }));
            }

            ResponseCode res = new ResponseCode
            {
                RspCode = "9999",
                Message = "Unknow error"
            };
            Result<ResponseCode> ressult = Result<ResponseCode>.Success(res);
            return HandlerResult(ressult);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("ipn")]
        public async Task<IActionResult> vnpay_ipn()
        {
            string vnp_HashSecret = _vnp_settings.Value.vnp_HashSecret;

            VnPayLibrary vnPay = new VnPayLibrary();

            string vnp_TmnCode = HttpContext.Request.Query["vnp_TmnCode"].ToString();                           //Mã website của merchant trên hệ thống của VNPAY
            vnPay.AddResponseData("vnp_TmnCode", vnp_TmnCode);
            string vnp_Amount = HttpContext.Request.Query["vnp_Amount"].ToString();                             //Số tiền thanh toán. VNPAY phản hồi số tiền nhân thêm 100 lần.
            vnPay.AddResponseData("vnp_Amount", vnp_Amount);
            int totalAmount = 0;
            int.TryParse(vnp_Amount, out totalAmount);
            totalAmount = totalAmount / 100;
            string vnp_BankCode = HttpContext.Request.Query["vnp_BankCode"].ToString();                         //Mã Ngân hàng thanh toán. Ví dụ: NCB
            vnPay.AddResponseData("vnp_BankCode", vnp_BankCode);
            string vnp_BankTranNo = HttpContext.Request.Query["vnp_BankTranNo"].ToString();                     //Mã giao dịch tại Ngân hàng. Ví dụ: NCB20170829152730
            vnPay.AddResponseData("vnp_BankTranNo", vnp_BankTranNo);
            string vnp_CardType = HttpContext.Request.Query["vnp_CardType"].ToString();                         //Loại tài khoản/thẻ khách hàng sử dụng:ATM,QRCODE
            vnPay.AddResponseData("vnp_CardType", vnp_CardType);
            string vnp_PayDate = HttpContext.Request.Query["vnp_PayDate"].ToString();                           //Thời gian thanh toán. Định dạng: yyyyMMddHHmmss
            vnPay.AddResponseData("vnp_PayDate", vnp_PayDate);
            string vnp_OrderInfo = HttpContext.Request.Query["vnp_OrderInfo"].ToString();                       //Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**
            vnPay.AddResponseData("vnp_OrderInfo", vnp_OrderInfo);
            string vnp_TransactionNo = HttpContext.Request.Query["vnp_TransactionNo"].ToString();               //Mã giao dịch ghi nhận tại hệ thống VNPAY. Ví dụ: 20170829153052
            vnPay.AddResponseData("vnp_TransactionNo", vnp_TransactionNo);
            string vnp_ResponseCode = HttpContext.Request.Query["vnp_ResponseCode"].ToString();                 //Mã phản hồi kết quả thanh toán. Quy định mã trả lời 00 ứng với kết quả Thành công cho tất cả các API. 
            vnPay.AddResponseData("vnp_ResponseCode", vnp_ResponseCode);
            string vnp_TransactionStatus = HttpContext.Request.Query["vnp_TransactionStatus"].ToString();       //Mã phản hồi kết quả thanh toán. Tình trạng của giao dịch tại Cổng thanh toán VNPAY // 00 là thành công
            vnPay.AddResponseData("vnp_TransactionStatus", vnp_TransactionStatus);
            string vnp_TxnRef = HttpContext.Request.Query["vnp_TxnRef"].ToString();                             //Giống mã gửi sang VNPAY khi gửi yêu cầu thanh toán. Ví dụ: 23554
            vnPay.AddResponseData("vnp_TxnRef", vnp_TxnRef);
            string vnp_SecureHashType = HttpContext.Request.Query["vnp_SecureHashType"].ToString();             //Loại mã băm sử dụng: SHA256, HmacSHA512
            vnPay.AddResponseData("vnp_SecureHashType", vnp_SecureHashType);
            string vnp_SecureHash = HttpContext.Request.Query["vnp_SecureHash"].ToString();                     //Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ VNPAY về Website TMĐT.
            vnPay.AddResponseData("vnp_SecureHash", vnp_SecureHash);
            //Cần kiểm tra đúng checksum khi bắt đầu xử lý yêu cầu(trước khi thực hiện các yêu cầu khác)

            bool checkSignature = vnPay.ValidateSignature(vnp_SecureHash, vnp_HashSecret);
            if (!checkSignature)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "97", Message = "Invalid signature" }));
            }

            var order = await Mediator.Send(new Application.Order.OrderDetail.Query { Id = vnp_TxnRef });
            if (order.Value == null)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode= "01", Message= "Order not found" }));
            }

            if (order.Value.TotalPrice != totalAmount)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "04", Message = "invalid amount" }));
            }

            if (order.Value.PayStatus != OrderStatus.Pending)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "02", Message = "Order already confirmed" }));
            }

            if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
            {
                //Thanh toan thanh cong
                order.Value.PayStatus = Domain.OrderStatus.Payed;
            }
            else
            {
                //Thanh toan khong thanh cong. Ma loi: vnp_ResponseCode
                //  displayMsg.InnerText = "Có lỗi xảy ra trong quá trình xử lý.Mã lỗi: " + vnp_ResponseCode;
                order.Value.PayStatus = Domain.OrderStatus.Error;
            }

            TicketOrder ticketOrder = new TicketOrder
            {
                TotalPrice = order.Value.TotalPrice,
                OrderTempId = order.Value.ID,
                PayStatus = (int)order.Value.PayStatus
            };

            try
            {
                var ticketResult = await Mediator.Send(new Application.TicketOrder.Create.Command { Request = ticketOrder });

                if (ticketResult.IsSuccess && ticketResult.Value != null)
                {
                    return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "00", Message = "Confirm Success" }));
                }

            }
            catch (Exception ex)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "99", Message = "Unknow error" }));
            }


            ResponseCode res = new ResponseCode
            {
                RspCode = "9999",
                Message = "Unknow error"
            };
            Result<ResponseCode> ressult = Result<ResponseCode>.Success(res);

            return HandlerResult(ressult);
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("ipncheat")]
        public async Task<IActionResult> vnpay_ipn_cheat()
        {
            string vnp_HashSecret = _vnp_settings.Value.vnp_HashSecret;

            VnPayLibrary vnPay = new VnPayLibrary();

            string vnp_TmnCode = HttpContext.Request.Query["vnp_TmnCode"].ToString();                           //Mã website của merchant trên hệ thống của VNPAY
            vnPay.AddResponseData("vnp_TmnCode", vnp_TmnCode);
            string vnp_Amount = HttpContext.Request.Query["vnp_Amount"].ToString();                             //Số tiền thanh toán. VNPAY phản hồi số tiền nhân thêm 100 lần.
            vnPay.AddResponseData("vnp_Amount", vnp_Amount);
            int totalAmount = 0;
            int.TryParse(vnp_Amount, out totalAmount);
            string vnp_BankCode = HttpContext.Request.Query["vnp_BankCode"].ToString();                         //Mã Ngân hàng thanh toán. Ví dụ: NCB
            vnPay.AddResponseData("vnp_BankCode", vnp_BankCode);
            string vnp_BankTranNo = HttpContext.Request.Query["vnp_BankTranNo"].ToString();                     //Mã giao dịch tại Ngân hàng. Ví dụ: NCB20170829152730
            vnPay.AddResponseData("vnp_BankTranNo", vnp_BankTranNo);
            string vnp_CardType = HttpContext.Request.Query["vnp_CardType"].ToString();                         //Loại tài khoản/thẻ khách hàng sử dụng:ATM,QRCODE
            vnPay.AddResponseData("vnp_CardType", vnp_CardType);
            string vnp_PayDate = HttpContext.Request.Query["vnp_PayDate"].ToString();                           //Thời gian thanh toán. Định dạng: yyyyMMddHHmmss
            vnPay.AddResponseData("vnp_PayDate", vnp_PayDate);
            string vnp_OrderInfo = HttpContext.Request.Query["vnp_OrderInfo"].ToString();                       //Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**
            vnPay.AddResponseData("vnp_OrderInfo", vnp_OrderInfo);
            string vnp_TransactionNo = HttpContext.Request.Query["vnp_TransactionNo"].ToString();               //Mã giao dịch ghi nhận tại hệ thống VNPAY. Ví dụ: 20170829153052
            vnPay.AddResponseData("vnp_TransactionNo", vnp_TransactionNo);
            string vnp_ResponseCode = HttpContext.Request.Query["vnp_ResponseCode"].ToString();                 //Mã phản hồi kết quả thanh toán. Quy định mã trả lời 00 ứng với kết quả Thành công cho tất cả các API. 
            vnPay.AddResponseData("vnp_ResponseCode", vnp_ResponseCode);
            string vnp_TransactionStatus = HttpContext.Request.Query["vnp_TransactionStatus"].ToString();       //Mã phản hồi kết quả thanh toán. Tình trạng của giao dịch tại Cổng thanh toán VNPAY // 00 là thành công
            vnPay.AddResponseData("vnp_TransactionStatus", vnp_TransactionStatus);
            string vnp_TxnRef = HttpContext.Request.Query["vnp_TxnRef"].ToString();                             //Giống mã gửi sang VNPAY khi gửi yêu cầu thanh toán. Ví dụ: 23554
            vnPay.AddResponseData("vnp_TxnRef", vnp_TxnRef);
            string vnp_SecureHashType = HttpContext.Request.Query["vnp_SecureHashType"].ToString();             //Loại mã băm sử dụng: SHA256, HmacSHA512
            vnPay.AddResponseData("vnp_SecureHashType", vnp_SecureHashType);
            string vnp_SecureHash = HttpContext.Request.Query["vnp_SecureHash"].ToString();                     //Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ VNPAY về Website TMĐT.
            vnPay.AddResponseData("vnp_SecureHash", vnp_SecureHash);
            //Cần kiểm tra đúng checksum khi bắt đầu xử lý yêu cầu(trước khi thực hiện các yêu cầu khác)

            bool checkSignature = vnPay.ValidateSignature(vnp_SecureHash, vnp_HashSecret);
            if (!checkSignature)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "97", Message = "Invalid signature" }));
            }

            var order = await Mediator.Send(new Application.Order.OrderDetail.Query { Id = vnp_TxnRef });
            if (order.Value == null)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "01", Message = "Order not found" }));
            }

            if (order.Value.TotalPrice != (totalAmount/100))
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "04", Message = "invalid amount" }));
            }

            if (order.Value.PayStatus != OrderStatus.Pending)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "02", Message = "Order already confirmed" }));
            }

            if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
            {
                //Thanh toan thanh cong
                order.Value.PayStatus = Domain.OrderStatus.Payed;
            }
            else
            {
                //Thanh toan khong thanh cong. Ma loi: vnp_ResponseCode
                //  displayMsg.InnerText = "Có lỗi xảy ra trong quá trình xử lý.Mã lỗi: " + vnp_ResponseCode;
                order.Value.PayStatus = Domain.OrderStatus.Error;
            }

            TicketOrder ticketOrder = new TicketOrder
            {
                TotalPrice = order.Value.TotalPrice,
                OrderTempId = order.Value.ID,
                PayStatus = (int)order.Value.PayStatus
            };

            var ticketResult = await Mediator.Send(new Application.TicketOrder.Create.Command { Request = ticketOrder });

            if (ticketResult.IsSuccess && ticketResult.Value != null)
            {
                return HandlerResult(Result<ResponseCode>.Success(new ResponseCode { RspCode = "00", Message = "Confirm Success" }));
            }

            ResponseCode res = new ResponseCode
            {
                RspCode = "9999",
                Message = "unknowError"
            };
            Result<ResponseCode> ressult = Result<ResponseCode>.Success(res);

            return HandlerResult(ressult);
        }
    }

    public class shjt
    {
        public string message { get; set; }
    }
    public class MessagePost
    {
        public virtual string Message { get; set; }
    }
}
