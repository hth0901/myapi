using API.RequestEntity;
using Application.Anh;
using Application.DiaDiem;
using Application.GiaVe;
using Application.LoaiVe;
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
    public class LoaiVeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public LoaiVeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachVe(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachLoaiVe.Query(), ct);

            return HandlerResult(listResult);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ThemLoaiVe([FromBody] TicketPriceType _entity)
        {
            var result = await Mediator.Send(new ThemLoaiVe.Command { LoaiVe = _entity.Type });           
            foreach (TicketPrice item in _entity.Price.ToList())
            {
                item.TiketTypeID = result.Value.ID;
                item.CreatedByID = 1;
                item.CreatedTime = DateTime.Now;
                var result2 = await Mediator.Send(new ThemGiaVe.Command { GiaVe = item });
            }
            return HandlerResult(result);
        }
        [HttpPut]
        [AllowAnonymous]
        public async Task SuaLoaiVe([FromBody] TicketPriceType _entity)
        {
             
            if (_entity.Type != null) 
            {
                _entity.Type.ID = _entity.ID;
                 var result = await Mediator.Send(new SuaLoaiVe.Command { LoaiVe = _entity.Type });
            }
            if(_entity.Price != null)
            {
                foreach (TicketPrice item in _entity.Price.ToList())
                {
                    item.TiketTypeID = _entity.ID;
                    item.UpdateByID = 1;
                    item.UpdateTime = DateTime.Now;
                   var result = await Mediator.Send(new SuaGiaVe.Command { GiaVe = item });
                }
            }          
        }
        [HttpGet("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ChiTietLoaiVe(int Id)
        {
            var loaive = await Mediator.Send(new ChiTietLoaiVe.Query { Id = Id });
            return HandlerResult(loaive);
        }
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> XoaLoaiVe(int id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new XoaLoaiVe.Command { Id = id });
            return HandlerResult(result);
        }
    }
}
