using API.RequestEntity;
using Application.Anh;
using Application.DiaDiem;
using Application.DiaDiemDaiNoi;
using Application.FileVideo;
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
    public class DaiNoiController : BaseApiController

    {

        private readonly IWebHostEnvironment _hostingEnvironment;
        public DaiNoiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [AllowAnonymous]
        [HttpGet]
        //[AllowAnonymous]
        public async Task<IActionResult> DanhSachDaiNoi(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachDaiNoi.Query(), ct);

            return HandlerResult(listResult);
        }

        //[HttpGet]
        //[Route("danhsachgiavediadiem")]
        //[AllowAnonymous]
        //public async Task<IActionResult> DanhSachGiaVeDiaDiem(CancellationToken ct)
        //{
        //    var listResult = await Mediator.Send(new DanhSachDiaDiemGiaVe.Query(), ct);

        //    return HandlerResult(listResult);
        //}
        [Authorize]
        [HttpGet("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ChiTietDaiNoi(int Id)
        {
            var diadiem = await Mediator.Send(new ChiTietDaiNoi.Query { Id = Id });
            return HandlerResult(diadiem);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddDaiNoi([FromForm] RequestUploadFile _request)
        {
            //add đại nội trước
            DaiNoi _entity = JsonConvert.DeserializeObject<DaiNoi>(_request.data);
            _entity.CreatedByID = 1;
            //_entity.Lattitude = 0.126789;
            //_entity.Longtidute = 0.123456;
            _entity.CreatedTime = DateTime.Today;
            var result = await Mediator.Send(new ThemDaiNoi.Command { dainoi = _entity });

            const string vanbanPath = "upload\\images";
            const string videoPath = "upload\\videos";
            if (_request.files.Count > 0)
            {
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, vanbanPath);

                foreach (var file in _request.files)
                {
                    if (file.Length <= 0) return null;
                    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                    string fileName = file.FileName;
                    int idx = fileName.LastIndexOf('.');
                    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                    var filePath = Path.Combine(target, $"{newFileName}");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);

                        Image e = new Image
                        {
                            CreatedByID = 1,
                            CreatedTime = DateTime.Now,
                            Url = "images/"+newFileName,
                            DaiNoiID = result.Value.ID,
                            IsAvatar = "0"
                            
                        };
                        if (file == _request.files[0])
                        {
                            e.IsAvatar = "1";
                        }

                        var resultImg = await Mediator.Send(new ThemAnh.Command { image = e });
                    }
                }
            }
            if (_request.videos.Count > 0)
            {
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, videoPath);

                foreach (var file in _request.videos)
                {
                    if (file.Length <= 0) return null;
                    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                    string fileName = file.FileName;
                    int idx = fileName.LastIndexOf('.');
                    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                    var filePath = Path.Combine(target, $"{newFileName}");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);

                        Video e = new Video
                        {
                            CreatedByID = 1,
                            CreatedTime = DateTime.Now,
                            Url = "videos/" + newFileName,
                            DaiNoiID = result.Value.ID
                        };
                        var resultVideo = await Mediator.Send(new ThemVideo.Command { video = e });
                        //newVideo = resultVideo.Value;
                    }
                }

            }
            return HandlerResult(result);
        }
        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> EditDaiNoi([FromForm] RequestUploadFile _request)
        {
            DaiNoi _entity = JsonConvert.DeserializeObject<DaiNoi>(_request.data);
            _entity.UpdateByID = 1;
            //_entity.Latitude = 0.126789;
            //_entity.Longitude = 0.123456;
            _entity.UpdateTime = DateTime.Today;
            var result = await Mediator.Send(new SuaDaiNoi.Command { dainoi = _entity });
            const string vanbanPath = "upload\\images";
            const string videoPath = "upload\\videos";
            if (_request.files.Count > 0)
            {
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, vanbanPath);

                foreach (var file in _request.files)
                {
                    if (file.Length <= 0) return null;
                    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                    string fileName = file.FileName;
                    int idx = fileName.LastIndexOf('.');
                    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                    var filePath = Path.Combine(target, $"{newFileName}");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);

                        Image e = new Image
                        {
                            CreatedByID = 1,
                            CreatedTime = DateTime.Now,
                            Url = "images/" + newFileName,
                            DaiNoiID = _entity.ID,
                            IsAvatar = "0"
                        };
                        if (file == _request.files[0])
                        {
                            e.IsAvatar = "1";
                        }

                        var resultImg = await Mediator.Send(new ThemAnh.Command { image = e });
                    }
                }
            }
            if (_request.videos.Count > 0)
            {
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, videoPath);

                foreach (var file in _request.videos)
                {
                    if (file.Length <= 0) return null;
                    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                    string fileName = file.FileName;
                    int idx = fileName.LastIndexOf('.');
                    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                    var filePath = Path.Combine(target, $"{newFileName}");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);

                        Video e = new Video
                        {
                            CreatedByID = 1,
                            CreatedTime = DateTime.Now,
                            Url = "videos/" + newFileName,
                            DaiNoiID = _entity.ID
                        };
                        var resultVideo = await Mediator.Send(new ThemVideo.Command { video = e });
                        //newVideo = resultVideo.Value;
                    }
                }

            }

            return HandlerResult(result);
        }
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteDaiNoi(int id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new XoaDaiNoi.Command { Id = id });
            return HandlerResult(result);
        }
    }
}
