using Application.Anh;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ImageController :BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ImageController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("danhsachimagetheodiadiem/{placeId}")]
        public async Task<IActionResult> DanhSachImageTheoDiaDiem(int placeId, CancellationToken ct)
        {
            var lstResult = await Mediator.Send(new DanhSachImageTheoDiaDiem.Query { placeId = placeId });

            return HandlerResult(lstResult);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("danhsachimagetheosukien/{eventId}")]
        public async Task<IActionResult> DanhSachImageTheoSuKien(int eventId, CancellationToken ct)
        {
            var lstResult = await Mediator.Send(new DanhSachImageTheoSuKien.Query { eventId = eventId });

            return HandlerResult(lstResult);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("danhsachimagetheodainoi/{dainoiId}")]
        public async Task<IActionResult> DanhSachImageTheoDaiNoi(int dainoiId, CancellationToken ct)
        {
            var lstResult = await Mediator.Send(new DanhSachImageTheoDaiNoi.Query { dainoiId = dainoiId });

            return HandlerResult(lstResult);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachAnh(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachAnh.Query(), ct);

            return HandlerResult(listResult);
        }
        [HttpGet("{Id}")]
        [AllowAnonymous]      
        public async Task<IActionResult> ImagesByID(int Id)
        {
            var image = await Mediator.Send(new XemChiTietAnh.Query { Id = Id });
            return HandlerResult(image);
        }
    }
}
