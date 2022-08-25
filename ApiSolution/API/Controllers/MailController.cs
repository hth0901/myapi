using API.Models;
using API.Services;
using Domain.RequestEntity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.RequestEntity;
using Application.MailConfig;

namespace API.Controllers
{
    public class MailController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMailServices _mailServices;

        public MailController(IWebHostEnvironment hostingEnvironment, IMailServices mailServices) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _mailServices = mailServices;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("checkvalid")]
        public IActionResult checkvalid([FromBody] Domain.EmailConfig _reques)
        {
            CreateEmailConfigRequest dkm = new CreateEmailConfigRequest
            {
                DisplayName = _reques.DisplayName,
                Subject = _reques.Subject,
                Content = _reques.Content,
                Email = _reques.Email,
                Password = _reques.Password,
                Host = _reques.Host,
                Port = _reques.Port
            };
            string checkValid = _mailServices.CheckValid(dkm);
            return Ok(checkValid);

            //if (!checkValid)
            //{
            //    return BadRequest("Không đăng nhập được mail");
            //}
            //return Ok("dang nhap thanh cong");
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("themmoi")]
        public async Task<IActionResult> ThemMoi([FromBody] CreateEmailConfigRequest _reques)
        {
            string checkValid = _mailServices.CheckValid(_reques);

            if (checkValid != "OK")
            {
                return BadRequest("Không đăng nhập được mail");
            }

            var result = await Mediator.Send(new ThemMoi.Command { EmailConfig = _reques });
            return HandlerResult(result);
        }

        [HttpPost("sendqrurl")]
        public async Task<IActionResult> SendQrUrl([FromBody] SendQrUrlRequest _request)
        {
            string baseUrl = Request.Host.Value;
            try
            {
                var getMailConfig = await Mediator.Send(new Application.MailConfig.ThongTin.Query());
                if (!getMailConfig.IsSuccess)
                {
                    throw new Exception(getMailConfig.Error);
                }

                var ticketOrderResult = await Mediator.Send(new Application.TicketOrder.GetByOrderId.Query { orderid = _request.id });
                if (!ticketOrderResult.IsSuccess)
                {
                    throw new Exception(ticketOrderResult.Error);
                }

                MailRequest mailRequest = new MailRequest();
                mailRequest.ToEmail = _request.email;
                mailRequest.Body = $"Truy cập vào trang https://eticket.hueworldheritage.org.vn/thanh-toan-dat-ve/{ticketOrderResult.Value.ID.ToString()} để tiến hành thanh toán online";
                mailRequest.Subject = "Url thanh toán vé tham quan";

                await _mailServices.SendEmailAsync(mailRequest, getMailConfig.Value);

                return Ok(1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("geturl")]
        [AllowAnonymous]
        public IActionResult geturl()
        {
            string baseUrl = Request.Host.Value;
            return Ok(baseUrl);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromForm] MailRequest _request)
        {
            //try
            //{
            //    await _mailServices.SendEmailAsync(_request);
            //    return Ok();
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}

            try
            {
                var getMailConfig = await Mediator.Send(new Application.MailConfig.ThongTin.Query());
                if (!getMailConfig.IsSuccess)
                {
                    throw new Exception(getMailConfig.Error);
                }
                await _mailServices.SendEmailAsync(_request, getMailConfig.Value);

                return Ok(1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("sendtiket")]
        public async Task<IActionResult> SendEmailTiket([FromForm] MailRequest _request)
        {
            try
            {
                await _mailServices.SendEmailWithTicketAsync(_request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("sendticketqr")]
        public async Task<IActionResult> send([FromForm] MailRequest _request)
        {
            try
            {
                await _mailServices.SendEmailWithTicketQrAsync(_request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getmailconfig")]
        [AllowAnonymous]
        public async Task<IActionResult> getmailconfig()
        {
            var getMailConfig = await Mediator.Send(new Application.MailConfig.ThongTin.Query());

            return HandlerResult(getMailConfig);
        }

        [AllowAnonymous]
        [HttpPost("sendtickettoemail")]
        public async Task<IActionResult> sendTicket([FromForm] SendEmailTicketRequest _request)
        {
            try
            {
                var getMailConfig = await Mediator.Send(new Application.MailConfig.ThongTin.Query());
                if (!getMailConfig.IsSuccess)
                {
                    throw new Exception(getMailConfig.Error);
                }
                await _mailServices.SendEmailWithTicketQrAsync(_request.ticketcontent, getMailConfig.Value, _request.email);
                return Ok(1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //[AllowAnonymous]
        //[HttpPost("sendtickettoemail")]
        //public async Task<IActionResult> sendTicket([FromForm] DownloadTicketRequest _request)
        //{
        //    try
        //    {
        //        var getMailConfig = await Mediator.Send(new Application.MailConfig.ThongTin.Query());
        //        if (!getMailConfig.IsSuccess)
        //        {
        //            throw new Exception(getMailConfig.Error);
        //        }
        //        await _mailServices.SendEmailWithTicketQrAsync(_request, getMailConfig.Value);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
