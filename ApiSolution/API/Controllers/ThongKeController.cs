using API.RequestEntity;
using Application.QuanTriThongKe;
using Application.ThongKe;
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

namespace API.Controllers
{
    public class ThongKeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ThongKeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("doanhthu/{date}/{dateTo}/{tickettype}/{custype}")]
        public async Task<IActionResult> ThongKeDoanhThu(string date, string dateTo, string tickettype, string custype)
        {
            var list = await Mediator.Send(new ThongKeDoanhThu.Query { Date = date, DateTo = dateTo, TicketType = tickettype, CustomerType = custype });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("doanhthudiem/{date}/{dateTo}/{type}")]
        public async Task<IActionResult> ThongKeDoanhThuPoint(string date, string dateTo, int type)
        {
            var list = await Mediator.Send(new ThongKeDoanhThuPoint.Query { Date = date, DateTo = dateTo, Type = type });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("doanhthudiadiem/{date}/{dateTo}/{place}")]
        public async Task<IActionResult> ThongKeDoanhThuTheoDiaDiem(string date, string dateTo, string place)
        {
            var list = await Mediator.Send(new ThongKeDoanhThuPlace.Query { Date = date, DateTo = dateTo, Place = place });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("luotkhach/{date}/{dateTo}/{type}/{place}")]
        public async Task<IActionResult> ThongKeLuotKhach(string date, string dateTo, int type, string place)
        {
            var list = await Mediator.Send(new ThongKeLuotKhach.Query { Date = date, DateTo = dateTo, Type = type, Place = place });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("luotkhachnam/{from}/{to}")]
        public async Task<IActionResult> ThongKeLuotKhachYear(string from, string to)
        {
            var list = await Mediator.Send(new ThongKeLuotKhachYear.Query { From = from, To = to });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("vehuy/{date}/{dateTo}/{tickettype}/{custype}")]
        public async Task<IActionResult> ThongKeVeHuy(string date, string dateTo, string tickettype, string custype)
        {
            var list = await Mediator.Send(new ThongKeVeHuy.Query { Date = date, DateTo = dateTo, TicketType = tickettype, CustomerType = custype });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("showbyrole/{id}")]
        public async Task<IActionResult> ShowThongKeTheoRole(int id)
        {
            var list = await Mediator.Send(new GetTemplateTheoRole.Query { RoleID = id });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("checkbyrole/{tid}/{rid}")]
        public async Task<IActionResult> CheckThongKeTheoRole(int tid, int rid)
        {
            var list = await Mediator.Send(new CheckTemplateTheoRole.Query { TemplateID = tid, RoleID = rid });

            return Ok(list);
        }
    }
}
