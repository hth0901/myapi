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
using Application.PhanQuyen;
using Application.DichVu;

namespace API.Controllers
{
    public class DichVuController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public DichVuController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("danhsachdichvu")]
        public async Task<IActionResult> DanhSachDichVu(CancellationToken ct)
        {
            var lstResult = await Mediator.Send(new DanhSachDichVu.Query(), ct);
            return HandlerResult(lstResult);
        }

        [HttpGet("chitietdichvu/{id}")]
        public async Task<IActionResult> ChiTietDichVu(int  id, CancellationToken ct)
        {
            var result = await Mediator.Send(new ChiTietDichVu.Query { Id = id }, ct);
            return HandlerResult(result);
        }
    }
}
