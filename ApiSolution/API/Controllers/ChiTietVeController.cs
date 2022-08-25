using API.RequestEntity;
using Application.Anh;
using Application.DiaDiem;
using Application.DiaDiemDaiNoi;
using Application.TicketDetail;
using Application.TicketOrder;
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
    public class ChiTietVeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ChiTietVeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachChiTietVe(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachChiTietVe2.Query(), ct);

            return HandlerResult(listResult);
        }
        [HttpGet]
        [Route("vebyid/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachChiTietVeTHeoNgay(string id)
        {
            var list = await Mediator.Send(new DanhSachChiTietVeTheoNgay.Query { _dateString = id });
            return HandlerResult(list);
           
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachTongTien(string id)
        {
            var list = await Mediator.Send(new GetTiketByDate.Query { _dateString = id });
            return HandlerResult(list);
        }
    }
}
