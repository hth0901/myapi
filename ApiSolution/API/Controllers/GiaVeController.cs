using API.RequestEntity;
using Application.Anh;
using Application.DiaDiem;
using Application.DoiTuong;
using Application.GiaVe;
using Domain;
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
    public class GiaVeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public GiaVeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachGiaVe(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachGiaVe.Query(), ct);

            return HandlerResult(listResult);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddDoiTuong([FromBody] CustomerType _request)
        {
            var result = await Mediator.Send(new ThemDoiTuong.Command { DoiTuong = _request });
            return HandlerResult(result);
        }
        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> EditDoiTuong([FromBody] CustomerType _request)
        {
            var result = await Mediator.Send(new SuaDoiTuong.Command { DoiTuong = _request });
            return HandlerResult(result);
        }
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDoiTuong(int id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new XoaDiaDiem.Command { Id = id });
            return HandlerResult(result);
        }
    }
}
