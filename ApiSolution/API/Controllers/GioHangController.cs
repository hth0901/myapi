using API.RequestEntity;
using Application.Anh;
using Application.Core;
using Application.DiaDiem;
using Application.GiaVe;
using Application.LoaiVe;
using Application.YKien;
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
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class GioHangController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public GioHangController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("themmoigiohang")]
        [Authorize]
        public async Task<IActionResult> ThemMoiGioHang([FromBody] Domain.RequestEntity.CreateCartRequest _request)
        {
            var name = (ClaimsIdentity)User.Identity;
            var insertResult = await Mediator.Send(new Application.GioHang.ThemMoi.Command { CartRequest = _request, username = name.Name });

            if (insertResult.IsSuccess)
            {
                return Ok(insertResult.Value);
            }

            return HandlerResult(insertResult);
        }

        [HttpDelete("xoagiohang/{id}")]
        public async Task<IActionResult> XoaGioHang(int id)
        {
            var result = await Mediator.Send(new Application.GioHang.Xoa.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpGet("danhsachgiohang")]
        public async Task<IActionResult> DanhSachGioHang()
        {
            var name = (ClaimsIdentity)User.Identity;
            var result = await Mediator.Send(new Application.GioHang.DanhSachGioHangTheoNguoiDung.Query { username = name.Name });
            return HandlerResult(result);
        }

        [HttpGet("danhsachgiohangchitiet")]
        public async Task<IActionResult> DanhSachGioHangChiTiet()
        {
            var name = (ClaimsIdentity)User.Identity;
            var result = await Mediator.Send(new Application.GioHang.DanhSachGioHangChiTiet.Query { username = name.Name });
            return HandlerResult(result);
        }
        [HttpPost("capnhatsoluong")]
        public async Task<IActionResult> CapNhatSoLuong([FromBody] Domain.RequestEntity.TurningCartDetailRequest _request)
        {
            var result = await Mediator.Send(new Application.GioHang.CapNhatSoLuong.Command { TurningCartDetailRequest = _request });
            return HandlerResult(result);
        }
    }
}
