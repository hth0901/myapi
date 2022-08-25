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
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class FeedBackController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public FeedBackController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachYKien(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachYKien.Query(), ct);

            return HandlerResult(listResult);
        }
        [HttpPut]
        [AllowAnonymous]     
        public async Task ChinhSuaYKien([FromBody] FeedBack _entity)
        {
            var result = await Mediator.Send(new ChinhSuaYKien.Command { YKien = _entity });           
        }

        [HttpPost("capnhatphanhoi")]
        [AllowAnonymous]
        public async Task<IActionResult> CapNhatPhanHoi([FromBody] FeedbackReplyTemplate _request)
        {
            var result = await Mediator.Send(new Application.FeedbackReplyTemplate.CapNhat.Command { Content = _request.Content, Id = _request.ID });
            return HandlerResult(result);
        }

        [HttpPost("themmoi")]
        [AllowAnonymous]
        public async Task<IActionResult> ThemMoiPhanHoi([FromBody] string content)
        {
            var result = await Mediator.Send(new Application.FeedbackReplyTemplate.ThemMoi.Command { Content = content });
            return HandlerResult(result);
        }

        [HttpDelete("xoa/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> XoaMauPhanHoi(int id)
        {
            var result = await Mediator.Send(new Application.FeedbackReplyTemplate.Xoa.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpPost("kichhoat/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> KickHoatMauPhanHoi(int id)
        {
            var result = await Mediator.Send(new Application.FeedbackReplyTemplate.KichHoat.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpGet("thongtincauhinhphanhoi")]
        [AllowAnonymous]
        public async Task<IActionResult> LayThongTinCauHinh()
        {
            var result = await Mediator.Send(new Application.FeedbackReplyTemplate.ThongTin.Query());
            return HandlerResult(result);
        }

        [HttpGet("danhsachcauhinhphanhoi/{pageIndex}")]
        [AllowAnonymous]
        public async Task<IActionResult> LayDanhSachCauHinh(int pageIndex)
        {
            var result = await Mediator.Send(new Application.FeedbackReplyTemplate.DanhSach.Query { pageIndex = pageIndex });
            var lstResult = new Domain.ResponseEntity.FeedbackConfigListResponse();
            if (result.IsSuccess && result.Value.Count() > 0)
            {
                lstResult.ListData = result.Value.ToList();
                lstResult.TotalRows = lstResult.ListData[0].TotalRows;
            }
            //return HandlerResult(result);
            return HandlerResult(Result<Domain.ResponseEntity.FeedbackConfigListResponse>.Success(lstResult));
        }
    }
}
