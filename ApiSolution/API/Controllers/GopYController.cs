using API.RequestEntity;
using Application.Anh;
using Application.DiaDiem;
using Application.DiaDiemDaiNoi;
using Application.FileVideo;
using Application.GopY;
using Domain;
using Domain.RequestEntity;
using MediatR;
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

namespace API.Controllers
{
    public class GopYController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public GopYController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpPost("send")]
        [AllowAnonymous]
        public async Task<IActionResult> SendFeedback(SendFeedBackRequest _request)
        {
            var result = await Mediator.Send(new Insert.Command { _request = _request });
            if (!result.IsSuccess)
            {
                return HandlerResult(result);
            }

            var responseContent = await Mediator.Send(new Application.FeedbackReplyTemplate.ThongTin.Query());
            if (!responseContent.IsSuccess)
            {
                return Ok("Gửi góp ý thành công.");
            }

            return Ok(responseContent.Value.Content);
        }
    }
}
