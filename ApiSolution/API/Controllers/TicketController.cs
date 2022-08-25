using API.Models;
using API.PdfUltility;
using API.RequestEntity;
using Application.Anh;
using Application.Core;
using Application.DiaDiem;
using Application.Order;
using Application.TicketDetail;
using Application.TicketOrder;
using DinkToPdf;
using DinkToPdf.Contracts;
using Domain;
using Domain.RequestEntity;
using Domain.ResponseEntity;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using System.Security.Claims;

namespace API.Controllers
{
    public class TicketController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IConverter _converter;

        public TicketController(IWebHostEnvironment hostingEnvironment, IConverter converter) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _converter = converter;
        }

        [HttpDelete]
        [AllowAnonymous]
        [Route("xoave/{tkId}")]
        public async Task<IActionResult> DeleteTicket(Guid tkId)
        {
            var _result = await Mediator.Send(new TicketDelete.Command { TicketId = tkId });
            return HandlerResult(_result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("danhsachve/{pageIndex}")]
        public async Task<IActionResult> GetListTicket(int pageIndex, string keyword = "")
        {
            var _result = await Mediator.Send(new TicketsList.Query { pageIndex = pageIndex, keyword = keyword });
            var lstResult = new TicketListResponse();
            lstResult.TotalRows = 0;
            if (_result.Value.Count() > 0)
            {
                lstResult.ListData = _result.Value.ToList();
                lstResult.TotalRows = lstResult.ListData[0].TotalRows;
            }
            //return HandlerResult(_result);
            return HandlerResult(Result<TicketListResponse>.Success(lstResult));
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("checkin")]
        public async Task<IActionResult> CheckInTicket([FromBody] CheckInTicketRequest _request)
        {
            var checkInResult = await Mediator.Send(new TicketCheckIn.Command { OrderId = _request.OrderId, TicketId = _request.TicketId, PlaceId = _request.PlaceId, Quantity = _request.Quantity, CustomerType = _request.CustomerType });

            return HandlerResult(checkInResult);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("getticketscaninfo/{orderid}/{placeid}/{cusid}")]
        public async Task<IActionResult> GetTicketInfoWhenScanSuccess(string orderid, int placeid, int cusid)
        {
            var mResult = await Mediator.Send(new ThongTinVeKhiScan.Query { OrderId = orderid, CustomerTypeId = cusid, PlaceId = placeid });
            return HandlerResult(mResult);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("scanbyweb")]
        public async Task<IActionResult> ScanQrCodeByWeb([FromBody] ScanQrRequest _request)
        {
            string textScan = _request.qrString;
            int placeId = _request.placeId;

            if (string.IsNullOrEmpty(textScan))
            {
                return HandlerResult(Result<CommonResponseMessage>.Failure("Please provide information!!"));
            }

            textScan = textScan.Replace("<", "");
            textScan = textScan.Replace(">", "");

            string[] subs = textScan.Split('|');

            int cusType = 0;
            int.TryParse(subs[2], out cusType);

            var countResult = await Mediator.Send(new CheckOrderExist.Query { OrderId = subs[1], TicketId = subs[0], PlaceId = placeId, CustomerType = cusType });
            //if (countResult.Value == null)
            //{
            //    return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "Không tồn tại đơn hàng", IsValid = false }));
            //}
            //if (countResult.Value.PayStatus == 0)
            //{
            //    return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "Đơn hàng chưa được thanh toán", IsValid = false }));
            //}
            //if (countResult.Value.PayStatus == 1)
            //{
            //    return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "success", IsValid = true, Url = $"eticket.hueworldheritage.org.vn/ticket-detail/{subs[1]}" }));

            //}

            //return HandlerResult(Result<CommonResponseMessage>.Failure("Proccess Error"));
            if (countResult.Value == null)
            {
                return HandlerResult(Result<CommonResponseMessage>.Failure("Proccess Error"));

            }

            int errCode = countResult.Value.ErrorCode;
            if (errCode == 0)
            {
                return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "success", IsValid = true, Url = $"eticket.hueworldheritage.org.vn/ticket-detail/{subs[1]}" }));
            }
            else
            {
                return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = countResult.Value.Message, IsValid = false }));
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("scan")]
        public async Task<IActionResult> ScanQRCodeByMachine([FromBody] ScanQrRequest _request)
        {
            //Dictionary<string, string> requestHeaders = new Dictionary<string, string>();
            //foreach (var header in Request.Headers)
            //{
            //    requestHeaders.Add(header.Key, header.Value);
            //}
            //string textScan = string.Empty;
            //string strPlaceId = string.Empty;
            //int placeId = 0;

            //requestHeaders.TryGetValue("textscan", out textScan);
            //requestHeaders.TryGetValue("placeid", out strPlaceId);
            //int.TryParse(strPlaceId, out placeId);
            string textScan = _request.qrString;
            int placeId = _request.placeId;

            if (string.IsNullOrEmpty(textScan))
            {
                return HandlerResult(Result<CommonResponseMessage>.Failure("Please provide information!!"));
            }

            textScan = textScan.Replace("<", "");
            textScan = textScan.Replace(">", "");

            string[] subs = textScan.Split('|');

            if (subs.Length != 4)
            {

            }

            int cusType = 0;
            int.TryParse(subs[2], out cusType);

            var countResult = await Mediator.Send(new ScanByMachine.Query { OrderId = subs[1], TicketId = subs[0], PlaceId = placeId, CustomerType = cusType });
            //if (countResult.Value == null)
            //{
            //    return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "Không tồn tại đơn hàng", IsValid = false }));
            //}
            //if (countResult.Value.PayStatus == 0)
            //{
            //    return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "Đơn hàng chưa được thanh toán", IsValid = false }));
            //}
            //if (countResult.Value.PayStatus == 1)
            //{
            //    return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "success", IsValid = true, Url = $"eticket.hueworldheritage.org.vn/ticket-detail/{subs[1]}" }));

            //}

            if (countResult.Value == null)
            {
                return HandlerResult(Result<CommonResponseMessage>.Failure("Proccess Error"));
                //return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "", IsValid = false, Url = $"eticket.hueworldheritage.org.vn/ticket-invalid" }));
            }

            int errCode = countResult.Value.ErrorCode;
            if (errCode == 0)
            {
                //return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "success", IsValid = true, Url = $"eticket.hueworldheritage.org.vn/ticket-detail/{subs[1]}/{cusType}" }));
                return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = "success", IsValid = true, Url = $"https://eticket.hueworldheritage.org.vn/mview/eticket/ticketinfo?orderid={subs[1]}&cusid={cusType}" }));
            }
            else
            {
                return HandlerResult(Result<CommonResponseMessage>.Success(new CommonResponseMessage { Message = countResult.Value.Message, IsValid = false, Url = $"https://eticket.hueworldheritage.org.vn/mview/eticket/ticketerror" }));
            }

            //return Ok(requestHeaders);
        }



        [HttpGet("getcode")]
        [AllowAnonymous]
        public IActionResult GetQRCode()
        {
            QRCodeGenerator QrGenerator = new QRCodeGenerator();
            QRCodeData QrCodeInfo = QrGenerator.CreateQrCode($"<hoanghieu>|<hth0901@gmail.com>", QRCodeGenerator.ECCLevel.Q);

            QRCode QrCode = new QRCode(QrCodeInfo);
            Bitmap QrBitmap = QrCode.GetGraphic(60);
            byte[] BitmapArray = QrBitmap.BitmapToByteArray();
            string QrUri = string.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapArray));

            return Ok(QrUri);
        }

        [HttpPost("printnew")]
        [AllowAnonymous]
        public async Task<IActionResult> PrintTicket([FromForm] List<string> _request)
        {
            using var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync();

            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });

            string templateContent = string.Empty;

            foreach (string item in _request)
            {
                DownloadTicketRequest _ticket = JsonConvert.DeserializeObject<DownloadTicketRequest>(item);

                string htmlContent = TemplateGenerator.GenTicketHtmlPrintString_New(_ticket);
                templateContent += htmlContent;
            }

            await using var page = await browser.NewPageAsync();
            await page.EmulateMediaTypeAsync(MediaType.Screen);
            await page.SetContentAsync(templateContent);

            var dkm = await page.PdfDataAsync(new PdfOptions
            {
                Height = "120mm",
                Width = "80mm",
                PrintBackground = true
            });

            //return File(pdfContent, "application/pdf");
            return new FileContentResult(dkm, "application/pdf");
        }

        [HttpPost("print")]
        [AllowAnonymous]
        public IActionResult DownloadTicketToPrint([FromForm] List<string> _request)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = new PechkinPaperSize("80mm", "180mm"),
                //PaperSize = PaperKind.A6,
                Margins = new MarginSettings { Top = 0, Left = 0, Right = 1, Bottom = 1 },
                DocumentTitle = "Etiket",
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = {  }
            };

            foreach(string item in _request)
            {
                DownloadTicketRequest _ticket = JsonConvert.DeserializeObject<DownloadTicketRequest>(item);
                var objectSettings = new ObjectSettings
                {
                    PagesCount = true,
                    //HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
                    HtmlContent = TemplateGenerator.GenTicketHtmlPrintString_New(_ticket),
                    WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                    //HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                    //FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
                };
                pdf.Objects.Add(objectSettings);
            }
            var dkm = _converter.Convert(pdf);
            //return Ok("Successfully created PDF document.");
            //return new FileContentResult(dkm, "application/pdf");
            return File(dkm, "application/pdf");
        }

        [HttpPost("download")]
        [AllowAnonymous]
        public IActionResult DownloadTicket([FromForm] List<string> _request)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { }
            };
            foreach(string item in _request)
            {
                DownloadTicketRequest _ticket = JsonConvert.DeserializeObject<DownloadTicketRequest>(item);

                var objectSettings = new ObjectSettings
                {
                    PagesCount = true,
                    //HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
                    //HtmlContent = TemplateGenerator.GenTicketHtmlPrintString_New(_ticket),
                    HtmlContent = TemplateGenerator.GenTicketHtmlStringToDownLoad(_ticket),
                    //WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "css", "style.css") },
                    //HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                    //FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
                };

                pdf.Objects.Add(objectSettings);
            }

            /*
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = {}
            };

            foreach (DownloadTicketRequest request in _request)
            {
                var objectSettings = new ObjectSettings
                {
                    PagesCount = true,
                    //HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
                    HtmlContent = TemplateGenerator.GenTicketHtmlString(request),
                    WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                    //HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                    //FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
                };

                pdf.Objects.Add(objectSettings);
            }
            */

            /*
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                //HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
                HtmlContent = TemplateGenerator.GenTicketHtmlString(_request),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                //HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                //FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };

            var objectSettings2 = new ObjectSettings
            {
                PagesCount = true,
                //HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
                HtmlContent = TemplateGenerator.GenTicketHtmlString(_request),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                //HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                //FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings, objectSettings2 }
            };
            */
            var dkm = _converter.Convert(pdf);
            //return Ok("Successfully created PDF document.");
            return new FileContentResult(dkm, "application/pdf");
            //return File(dkm, "application/pdf");
            //return Ok();
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("updatedetail")]
        public async Task<IActionResult> updateTicketDetail([FromForm] UpdateTicketDetailRequest _request)
        {
            var result = await Mediator.Send(new TicketDetailUpdate.Command { id = _request.key, values = _request.values });
            if (!result.IsSuccess)
            {
                return BadRequest();
            }

            return Ok(result.Value);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("updateticketdetails")]
        public async Task<IActionResult> UpdateListTicketDetail([FromBody] EditTicketDetailRequest _request)
        {
            var username = ((ClaimsIdentity)User.Identity).Name;
            var updateResult = await Mediator.Send(new UpdateListTicketDetail.Command { UpdateRequest = _request, username = username });
            return HandlerResult(updateResult);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("orderinfo/{id}")]
        public async Task<IActionResult> GetOrderInfo(string id)
        {
            var result = await Mediator.Send(new OrderInfo.Query { Id = id });
            return HandlerResult(result);
        }

        [HttpGet]
        [Authorize]
        [Route("orderhistory")]
        public async Task<IActionResult> GetOrderHistory()
        {
            var username = ((ClaimsIdentity)User.Identity).Name;
            var result = await Mediator.Send(new Application.Order.OrderHistory.Query { uname = username });
            return HandlerResult(result);
        }
    }
}
