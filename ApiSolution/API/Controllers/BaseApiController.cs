
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Application.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using Domain;
using Application.TepKemTheo;
using MediatR;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        private IWebHostEnvironment _hostingEnvironment;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        public BaseApiController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        protected void SaveFileUpload(List<IFormFile> files, int idObj, string subDirectory)
        {
            var target = Path.Combine(_hostingEnvironment.ContentRootPath, subDirectory);
            Directory.CreateDirectory(target);

            files.ForEach(async file =>
            {
                if (file.Length <= 0) return;
                string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                string fileName = file.FileName;
                int idx = fileName.LastIndexOf('.');
                string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                var filePath = Path.Combine(target, $"{newFileName}");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);

                    TepKemTheoEntity e = new TepKemTheoEntity
                    {
                        DoiTuongSoHuu = idObj,
                        TenTep = file.FileName,
                        NoiLuuTru = $"{subDirectory}\\{newFileName}"
                    };
                    var reqult = await Mediator.Send(new Create.Command { Tep = e });
                }
            });
        }

        protected ActionResult HandlerResult<T>(Result<T> result)
        {
            var val = result.Value;
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();

            return BadRequest(result.Error);
        }
    }
}
