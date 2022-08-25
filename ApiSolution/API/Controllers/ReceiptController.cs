using Domain;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
//
using API.RequestEntity;
using Application.NguoiDung;
//using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.IO;
using System.Threading;
using System.Security.Cryptography;
using System.Text;
using MediatR;
using RestSharp;
using Application.ReceiptInfo;
using Domain.RequestEntity;
using bienlaidientu;
using VeDienTu.Ultility;
using bienlaiPortalService;

namespace API.Controllers
{
    public class ReceiptController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public ReceiptController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new DanhSach.Query());
            return HandlerResult(result);
        }

        [HttpGet("getconfig")]
        public async Task<IActionResult> GetConfig()
        {
            var result = await Mediator.Send(new Application.ReceiptConfig.ThongTin.Query());
            return HandlerResult(result);
        }

        [HttpGet("getdefault")]
        public async Task<IActionResult> GetDefault()
        {
            var result = await Mediator.Send(new Application.ReceiptInfo.ThongTinMacDinh.Query());
            return HandlerResult(result);
        }

        [HttpGet("gettemplatedefault")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTemplateDefault()
        {
            var result = await Mediator.Send(new Application.ReceiptConfig.ThongTinMau.Query());
            return HandlerResult(result);
        }

        [HttpPost("updatetemplatedefault")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateTemplateConfig([FromBody] ReceiptTemplateConfig _request)
        {
            var result = await Mediator.Send(new Application.ReceiptConfig.ChinhSuaMau.Command { UpdateInfo = _request });
            return HandlerResult(result);
        }

        [HttpPost("updateconfig")]
        public async Task<IActionResult> UpdateConfig([FromBody] CreateReceiptConfigRequest _request)
        {
            var result = await Mediator.Send(new Application.ReceiptConfig.ThemMoi.Command { ReceiptConfig = _request });
            return HandlerResult(result);
        }

        [HttpPut("updatedefault")]
        public async Task<IActionResult> UpdateDefault([FromBody] ReceiptInfo _request)
        {
            var updateResult = await Mediator.Send(new Application.ReceiptInfo.CapNhatThongTinMacDinh.Command { UpdateInfo = _request });
            if (!updateResult.IsSuccess)
                return HandlerResult(updateResult);

            var mConfig = await Mediator.Send(new Application.ReceiptConfig.ThongTin.Query());

            if (!mConfig.IsSuccess)
            {
                return HandlerResult(mConfig);
            }

            PublishServiceSoapClient portalService = new PublishServiceSoapClient(PublishServiceSoapClient.EndpointConfiguration.PublishServiceSoap);

            portalService.Endpoint.Address = new System.ServiceModel.EndpointAddress(mConfig.Value.PublishServiceUrl);

            try
            {

                var xmlBody = XmlHelper.UpdateCusBody(_request.FullName, _request.CusCode, _request.TaxNumber, _request.Address, _request.Email, _request.PhoneNumber, "0");

                var resultService = await portalService.UpdateCusAsync(xmlBody.InnerXml, mConfig.Value.TaiKhoanDichVu, mConfig.Value.MatKhauDichVu, 0);
                if (resultService.Body.UpdateCusResult <= 0)
                {
                    throw new Exception("Tạo khách hàng không thành công");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return HandlerResult(updateResult);
        }

        [HttpPost("createreceipt")]
        public async Task<IActionResult> CreateReceipt([FromBody] OrderRequestInfo _request)
        {
            var mConfig = await Mediator.Send(new Application.ReceiptConfig.ThongTin.Query());

            if (!mConfig.IsSuccess)
            {
                return HandlerResult(mConfig);
            }

            PublishServiceSoapClient portalService = new PublishServiceSoapClient(PublishServiceSoapClient.EndpointConfiguration.PublishServiceSoap);

            portalService.Endpoint.Address = new System.ServiceModel.EndpointAddress(mConfig.Value.PublishServiceUrl);

            if (string.IsNullOrEmpty(_request.CusCode))
            {
                CreateReceiptInfoRequest createRequest = new CreateReceiptInfoRequest
                {
                    Fullname = _request.FullName,
                    Email = _request.Email,
                    PhoneNumber = _request.PhoneNumber,
                    TaxNumber = _request.TaxCode,
                    Address = _request.Address

                };
                var createResult = await Mediator.Send(new ThemMoi.Command { ReceiptInfo = createRequest });
                if (!createResult.IsSuccess)
                {
                    return HandlerResult(createResult);
                }

                _request.CusCode = createResult.Value;

                try
                {

                    var xmlBody = XmlHelper.UpdateCusBody(_request.FullName, _request.CusCode, _request.TaxCode, _request.Address, _request.Email, _request.PhoneNumber, "0");

                    var resultService = await portalService.UpdateCusAsync(xmlBody.InnerXml, mConfig.Value.TaiKhoanDichVu, mConfig.Value.MatKhauDichVu, 0);
                    if (resultService.Body.UpdateCusResult <= 0)
                    {
                        throw new Exception("Tạo khách hàng không thành công");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            

            try
            {                

                var lstOrderDetailResult = await Mediator.Send(new Application.OrderDetail.DanhSach.Query { OrderId = _request.ID });

                var createReceiptBody = XmlHelper.CreateImportAndPublishInv(_request.ID, _request.CusCode, _request.Address, _request.FullName, ((int)_request.TotalPrice), lstOrderDetailResult.Value);


                var createReceiptResult = await portalService.ImportAndPublishInvAsync(mConfig.Value.TaiKhoanPhatHanh, mConfig.Value.MatKhauPhatHanh, createReceiptBody.InnerXml, mConfig.Value.TaiKhoanDichVu, mConfig.Value.MatKhauDichVu, "", "", 0);

                if (!createReceiptResult.Body.ImportAndPublishInvResult.StartsWith("OK"))
                {
                    throw new Exception("Không tạo được biên lai");
                }
                
                return Ok(1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("download/{fid}")]
        [AllowAnonymous]
        public async Task<IActionResult> Download(string fid)
        {
            PortalServiceSoapClient mService = new PortalServiceSoapClient(PortalServiceSoapClient.EndpointConfiguration.PortalServiceSoap);

            var mConfig = await Mediator.Send(new Application.ReceiptConfig.ThongTin.Query());

            if (!mConfig.IsSuccess)
            {
                return HandlerResult(mConfig);
            }

            mService.Endpoint.Address = new System.ServiceModel.EndpointAddress(mConfig.Value.PortalServiceUrl);

            try
            {
                var mResult = await mService.downloadInvPDFFkeyNoPayAsync(fid, mConfig.Value.TaiKhoanDichVu, mConfig.Value.MatKhauDichVu);
                string fileBase64 = mResult.Body.downloadInvPDFFkeyNoPayResult;
                byte[] pdfFile = Convert.FromBase64String(fileBase64);
                //result = "ok";
                return new FileContentResult(pdfFile, "application/pdf");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpPost("createcustomertoservice")]
        public async Task<IActionResult> CreateCustomerToService([FromBody] CreateReceiptInfoRequest _request)
        {
            //var createResult = await Mediator.Send(new ThemMoi.Command { ReceiptInfo = _request });
            //if (!createResult.IsSuccess)
            //{
            //    return HandlerResult(createResult);
            //}
            var mConfig = await Mediator.Send(new Application.ReceiptConfig.ThongTin.Query());

            if (!mConfig.IsSuccess)
            {
                return HandlerResult(mConfig);
            }

            PublishServiceSoapClient portalService = new PublishServiceSoapClient(PublishServiceSoapClient.EndpointConfiguration.PublishServiceSoap);
            portalService.Endpoint.Address = new System.ServiceModel.EndpointAddress(mConfig.Value.PublishServiceUrl);

            var xmlBody = XmlHelper.UpdateCusBody(_request.Fullname, _request.CusCode, _request.TaxNumber, _request.Address, _request.Email, _request.PhoneNumber, _request.CusType);

            try
            {
                var resultService = await portalService.UpdateCusAsync(xmlBody.InnerXml, mConfig.Value.TaiKhoanDichVu, mConfig.Value.MatKhauDichVu, 0);

                if (resultService.Body.UpdateCusResult <= 0)
                {
                    throw new Exception("Tạo khách hàng không thành công");
                }

                return Ok(resultService.Body.UpdateCusResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("createcustomer")]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateReceiptInfoRequest _request)
        {
            var createResult = await Mediator.Send(new ThemMoi.Command { ReceiptInfo = _request });
            if (!createResult.IsSuccess)
            {
                return HandlerResult(createResult);
            }

            var mConfig = await Mediator.Send(new Application.ReceiptConfig.ThongTin.Query());

            if (!mConfig.IsSuccess)
            {
                return HandlerResult(mConfig);
            }

            PublishServiceSoapClient portalService = new PublishServiceSoapClient(PublishServiceSoapClient.EndpointConfiguration.PublishServiceSoap);
            portalService.Endpoint.Address = new System.ServiceModel.EndpointAddress(mConfig.Value.PortalServiceUrl);

            var xmlBody = XmlHelper.UpdateCusBody(_request.Fullname, createResult.Value, _request.TaxNumber, _request.Address, _request.Email, _request.PhoneNumber, _request.CusType);

            try
            {
                var resultService = await portalService.UpdateCusAsync(xmlBody.InnerXml, mConfig.Value.TaiKhoanDichVu, mConfig.Value.MatKhauDichVu, 0);

                if (resultService.Body.UpdateCusResult <= 0)
                {
                    throw new Exception("Tạo khách hàng không thành công");
                }

                return HandlerResult(createResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
