using API.RequestEntity;
using Application.QuanTriThongKe;
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
    public class QuanTriThongKeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public QuanTriThongKeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("template")]
        public async Task<IActionResult> DanhSachTemplate()
        {
            var list = await Mediator.Send(new DanhSachTemplate.Query());

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("templateall")]
        public async Task<IActionResult> DanhSachTemplateAdmin()
        {
            var list = await Mediator.Send(new DanhSachTemplateAdmin.Query());

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("chitiettemplate")]
        public async Task<IActionResult> ChiTietTemplate(int id)
        {
            var list = await Mediator.Send(new ChiTietTemplate.Query { ID = id });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("check/{id}/{name}")]
        public async Task<IActionResult> CheckTemplate(int id, string name)
        {
            var list = await Mediator.Send(new CheckTemplate.Query { ID = id, Name = name });

            return HandlerResult(list);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("template")]
        public async Task<IActionResult> ThemTemplate([FromBody] StatisticTemplate _request)
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            _request.CreatedByID = 1;
            _request.CreatedTime = DateTime.Now;
            var list = await Mediator.Send(new ThemTemplate.Command { DoiTuong = _request });

            return HandlerResult(list);
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("template")]
        public async Task<IActionResult> SuaTemplate([FromBody] StatisticTemplate _request)
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            _request.UpdateByID = 1;
            _request.UpdateTime = DateTime.Now;
            var list = await Mediator.Send(new SuaTemplate.Command { DoiTuong = _request });

            return HandlerResult(list);
        }

        [HttpDelete]
        [AllowAnonymous]
        [Route("template/{id}")]
        public async Task<IActionResult> XoaTemplate(int id)
        {
            var list = await Mediator.Send(new XoaTemplate.Command { Id = id });

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("basetemplate")]
        public async Task<IActionResult> DanhSachBaseTemplate()
        {
            var list = await Mediator.Send(new DanhSachBaseTemplate.Query());

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("element")]
        public async Task<IActionResult> DanhSachElement()
        {
            var list = await Mediator.Send(new DanhSachElement.Query());

            return HandlerResult(list);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("template/{TemplateID}")]
        public async Task<IActionResult> ChiTietTemplateRole(int TemplateID)
        {
            var list = await Mediator.Send(new ChiTietTemplateRole.Query { TemplateID = TemplateID });

            return HandlerResult(list);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("pqtr")]
        public async Task<IActionResult> PhanQuyenTemplateRole([FromBody] StatisticTemplateRoleResult _request)
        {
            var result = await Mediator.Send(new PhanQuyenTemplateRole.Command { DoiTuong = _request });
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("tempele/{tid}/{eid}/{rid}")]
        public async Task<IActionResult> ChiTietTemplateElement(int tid, int eid, int rid )
        {
            var list = await Mediator.Send(new ChiTietTemplateElement.Query { TemplateID = tid, ElementID = eid, RoleID = rid });

            return Ok(list);
        }

        [HttpPost]
        [Route("pqte")]
        [AllowAnonymous]
        public async Task<IActionResult> PhanQuyenTemplateElement([FromBody] StatisticTemplateElement _request)
        {
            var result = await Mediator.Send(new PhanQuyenTemplateElement.Command { DoiTuong = _request });
            return HandlerResult(result);
        }
    }
}
