using API.RequestEntity;
using Application.Anh;
using Application.FileVideo;
using Application.DiaDiem;
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
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using Domain.RequestEntity;
using Domain.ResponseEntity;
using Application.Core;

namespace API.Controllers
{
    public class PromotionController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public PromotionController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("themmoicauhinh")]
        public async Task<IActionResult> InsertConfig([FromBody] PromotionUpdateRequest _request)
        {
            var result = await Mediator.Send(new Application.PromotionConfig.ThemMoi.Command { Entity = _request });
            return HandlerResult(result);
        }
        [HttpPut]
        [AllowAnonymous]
        [Route("chinhsuacauhinh")]
        public async Task<IActionResult> UpdateConfig([FromBody] PromotionUpdateRequest _request)
        {
            var result = await Mediator.Send(new Application.PromotionConfig.ChinhSua.Command { Entity = _request });
            return HandlerResult(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("thongtin")]
        public async Task<IActionResult> GetInformation()
        {
            var _result = await Mediator.Send(new Application.PromotionConfig.ThongTin.Query());
            //return HandlerResult(_result);
            if (_result.Value != null)
            {
                return HandlerResult(_result);
            }
            return Ok(new object());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("danhsach/{pageIndex}")]
        public async Task<IActionResult> GetList(int pageIndex)
        {
            var _result = await Mediator.Send(new Application.PromotionConfig.DanhSach.Query { pageIndex = pageIndex });

            var lstResult = new PromotionConfigListResponse();
            if (_result.IsSuccess && _result.Value.Count() > 0)
            {
                lstResult.ListData = _result.Value.ToList();
                lstResult.TotalRows = lstResult.ListData[0].TotalRows;
            }

            return HandlerResult(Result<PromotionConfigListResponse>.Success(lstResult));
        }
    }
}
