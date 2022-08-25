using API.RequestEntity;
using Application.Anh;
using Application.FileVideo;
using Application.DiaDiem;
using Domain;
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
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using Application.TicketType;
using Domain.RequestEntity;

namespace API.Controllers
{
    public class ImageUploadRequest
    {
        public IFormFile image { get; set; }
    }
    public class TicketTypeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public TicketTypeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("themmoichitiet/{typeid}/{placeid}")]
        public async Task<IActionResult> InsertTicketTypeDetail(int typeid, int placeid)
        {
            var result = await Mediator.Send(new ThemMoiDiaDiemVaoTuyen.Command { placeid = placeid, tickettypeid = typeid });
            return HandlerResult(result);
        }

        [HttpDelete]
        [AllowAnonymous]
        [Route("xoachitiet/{typeid}/{placeid}")]
        public async Task<IActionResult> DeleteTicketTypeDetail(int typeid, int placeid)
        {
            var result = await Mediator.Send(new XoaDiaDiemKhoiTuyen.Command { placeid = placeid, tickettypeid = typeid });
            return HandlerResult(result);
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("chinhsua")]
        public async Task<IActionResult> UpdateTicketType([FromForm] RequestUploadFile _request)
        {
            var username = ((ClaimsIdentity)User.Identity).Name;
            TicketTypeUpdateRequest ticketType = JsonConvert.DeserializeObject<TicketTypeUpdateRequest>(_request.data);
            var result = await Mediator.Send(new ChinhSua.Command { Request = ticketType, username = username });

            if (!result.IsSuccess)
            {
                return HandlerResult(result);
            }

            if (_request.files.Count > 0)
            {
                const string vanbanPath = "upload\\images";
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, vanbanPath);

                string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
                string fileName = _request.files[0].FileName;
                int idx = fileName.LastIndexOf('.');
                string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                var filePath = Path.Combine(target, $"{newFileName}");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await _request.files[0].CopyToAsync(stream);

                    var resultImg = await Mediator.Send(new Application.TicketType.ThemAnh.Command { url = $"images/{newFileName}", tickettypeid = ticketType.Id });
                    //newImage = resultImg.Value;
                }
            }

            return HandlerResult(result);
        }

        //[HttpDelete]
        //[AllowAnonymous]
        //[Route("xoa/{id}")]
        //public async


        [HttpPost]
        [AllowAnonymous]
        [Route("themmoi")]
        public async Task<IActionResult> NewTicketType([FromForm] RequestUploadFile _request)
        {
            TicketTypeInsertRequest ticketType = JsonConvert.DeserializeObject<TicketTypeInsertRequest>(_request.data);
            var username = ((ClaimsIdentity)User.Identity).Name;
            var result = await Mediator.Send(new ThemMoi.Command { Request = ticketType, username = username });

            if (!result.IsSuccess)
            {
                return HandlerResult(result);
            }

            if (_request.files.Count > 0)
            {
                const string vanbanPath = "upload\\images";
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, vanbanPath);

                string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
                string fileName = _request.files[0].FileName;
                int idx = fileName.LastIndexOf('.');
                string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                var filePath = Path.Combine(target, $"{newFileName}");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await _request.files[0].CopyToAsync(stream);

                    var resultImg = await Mediator.Send(new Application.TicketType.ThemAnh.Command { url = $"images/{newFileName}", tickettypeid = result.Value });
                    //newImage = resultImg.Value;
                }
            }
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("chitiet/{id}")]
        public async Task<IActionResult> DetailTicketType(int id)
        {
            var result = await Mediator.Send(new ChiTiet.Query { ID = id });

            return HandlerResult(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("uploadimage")]
        public async Task<IActionResult> UploadImage([Required] IFormFile image)
        {
            const string vanbanPath = "upload\\images";
            string filePath = "";
            var target = Path.Combine(_hostingEnvironment.ContentRootPath, vanbanPath);
            if (image.Length <= 0) return null;
            string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

            string fileName = image.FileName;
            int idx = fileName.LastIndexOf('.');
            string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
            filePath = Path.Combine(target, $"{newFileName}");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return Ok(Path.Combine(vanbanPath, newFileName));
        }
    }
}
