using API.RequestEntity;
using Application.NguoiDung;
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
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class EmployeeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public EmployeeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachNguoiDung(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachNguoiDung.Query(), ct);

            return HandlerResult(listResult);
        }
       
        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> EditNguoiDung([FromBody] Employee _request)
        {
            var result = await Mediator.Send(new SuaNguoiDung.Command { _Nguoidung = _request });
            return HandlerResult(result);
        }
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteNguoiDung(string id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new XoaNguoiDung.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("getuser")]
        public async Task<IActionResult> ChiTietNguoiDung(Employee _request)
        {
            var result = await Mediator.Send(new ChiTietNguoiDung.Query { _nguoidung = _request.UserName });
            return HandlerResult(result);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddNguoiDung([FromBody] Employee _request)
        {
            var result = await Mediator.Send(new ThemNguoiDung.Command { _nguoiDung = _request });
            return HandlerResult(result);
        }

    }
}
