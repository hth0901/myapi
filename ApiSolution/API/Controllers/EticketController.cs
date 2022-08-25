using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.ViewModels;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Domain.ResponseEntity;

namespace VeDienTu.Controllers
{
    [Route("mview/[controller]/[action]")]
    public class EticketController : Controller
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        //[Route("dkm/{orderid}/{cusid}")]

        [Route("{id}")]
        public IActionResult Index(string id)
        {
            TicketDetailViewModel vm = new TicketDetailViewModel();
            //vm.customertypeid = cusid;
            vm.orderid = id;
            return View(vm);
        }

        [Route("{id}")]
        public async Task<IActionResult> Pending(int id)
        {
            var imgUrlResult = await Mediator.Send(new Application.DiaDiem.ImageUrl.Query { id = id });
            PendingViewModel vm = new PendingViewModel();
            vm.imgUrl = $"/upload/{imgUrlResult.Value}";
            return View(vm);
        }

        public IActionResult TicketError()
        {
            return View();
        }

        public async Task<IActionResult> ticketinfo(string orderid, int cusid)
        {
            var ticketDetailResult = await Mediator.Send(new Application.TicketDetail.TicketInfoAfterScan.Query { CustomerTypeId = cusid, OrderId = orderid });
            //TicketDetailViewModel vm = new TicketDetailViewModel();
            //vm.customertypeid = cusid;
            //vm.orderid = orderid;
            TicketDetailAfterScan vm = (TicketDetailAfterScan)ticketDetailResult.Value;
            return View(vm);
        }
    }
}
