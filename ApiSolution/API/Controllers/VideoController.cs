using Application.FileVideo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class VideoController :BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public VideoController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> VideoByID(int Id)
        {
            var video = await Mediator.Send(new XemChiTietVideo.Query { Id = Id });
            return HandlerResult(video);
        }
    }
}
