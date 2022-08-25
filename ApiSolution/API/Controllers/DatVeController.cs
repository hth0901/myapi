using API.RequestEntity;
using Application.Anh;
using Application.DatVe;
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
using System.Linq;

namespace API.Controllers
{
    public class DatVeController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public DatVeController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost]
        [AllowAnonymous]
        public  async Task<IActionResult> ThemChiTietVe([FromBody] ListCartDetail list)
        {
            var listPrice = await  Mediator.Send(new DanhSachGiaVe.Query());
            List<TicketPrice> _listPrice = new List<TicketPrice>();
            _listPrice = listPrice.Value;
            var ListTicketType = await Mediator.Send(new DanhSachLoaiVe.Query());
            CartDetail newCartDetail = new CartDetail();
            newCartDetail.ID = list.ID;
            newCartDetail.TicketTypeID = list.PlaceID;
            newCartDetail.CartID = 1; //Cái này quá ảo
            newCartDetail.CreatedTime = DateTime.Now;
            newCartDetail.UpdateTime = DateTime.Now;
            if (list.Adult > 0)
            {           
                newCartDetail.CustomerTypeID = 2;
                newCartDetail.Count = list.Adult;
                TicketPrice price = _listPrice.SingleOrDefault(i => i.CustomerTypeID == 2 && i.TiketTypeID == list.PlaceID);
                newCartDetail.TicketPriceID = price.Price;
                var result1 = await Mediator.Send(new DatVeDon.Command { addCartDetail = newCartDetail });
            }
            if (list.Child >0)
            {
                newCartDetail.CustomerTypeID = 2;
                newCartDetail.Count = list.Child;
                TicketPrice price = _listPrice.SingleOrDefault(i => i.CustomerTypeID == 1 && i.TiketTypeID == list.PlaceID);
                newCartDetail.TicketPriceID = price.Price;
                var result2 = await Mediator.Send(new DatVeDon.Command { addCartDetail = newCartDetail });
            }
            //return Ok(await Mediator.Send(new Create.Command { Activity = _entity }));
            
            return null ;
        }
    }
}
