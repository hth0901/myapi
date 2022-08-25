using API.RequestEntity;
using Application.Anh;
using Application.DiaDiem;
using Application.DiaDiemDaiNoi;
using Application.PhanQuyen;
using Application.ThanhMenu;
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
    public class MenuController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public MenuController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [Route("getnavigation/{username}")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachMenuTheoUser(CancellationToken ct, string username)
        {
            var lstResult = await Mediator.Send(new DanhSachMenuTheoUser.Query { Username = username }, ct);

            return HandlerResult(lstResult);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachMenu(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachMenu.Query(), ct);

            return HandlerResult(listResult);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddMenu([FromBody] Menu _request)
        {
            var result = await Mediator.Send(new ThemMenu.Command { _menu = _request });
            return HandlerResult(result);
        }
        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> EditDoiTuong([FromBody] Menu _request)
        {
            var result = await Mediator.Send(new ChinhSuaMenu.Command { _menu = _request });
            return HandlerResult(result);
        }
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> XoaMenu(int id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new XoaMenu.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("getclientautho/{path}")]
        public async Task<IActionResult> GetClientAutho(string path)
        {
            string realpath = System.Web.HttpUtility.UrlDecode(path);
            var result = await Mediator.Send(new DanhSachPhanQuyenTheoMenuClient.Query { path = realpath });
            return HandlerResult(result);
        }
    }
}
