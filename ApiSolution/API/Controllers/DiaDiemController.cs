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

namespace API.Controllers
{
    public class DiaDiemController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public DiaDiemController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        //[Authorize]
        public async Task<IActionResult> DanhSachDiaDiem(CancellationToken ct)
        {
            var username = ((ClaimsIdentity)User.Identity).Name;
            var listResult = await Mediator.Send(new DanhSachDiaDiem.Query(), ct);

            return HandlerResult(listResult);
        }

        [HttpGet]
        [Route("danhsachgiavediadiem")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachGiaVeDiaDiem(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachDiaDiemGiaVe.Query(), ct);

            return HandlerResult(listResult);
        }

        [HttpGet]
        [Route("danhsachgiavediadiemchitiet")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachGiaVeDiaDiemChiTiet(CancellationToken ct)
        {
            var listResult = await Mediator.Send(new DanhSachDiaDiemGiaVeChiTiet.Query(), ct);

            return HandlerResult(listResult);
        }

        [HttpGet("{Id}")]
        [AllowAnonymous]
        public async Task<IActionResult> ChiTietDiaDiem(int Id)
        {
            var diadiem = await Mediator.Send(new ChiTietDiaDiem.Query { Id = Id });
            return HandlerResult(diadiem);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AddEvent([FromForm] RequestUploadFile _request)
        {
            //Thêm place trước 
            Place _entity = JsonConvert.DeserializeObject<Place>(_request.data);

            _entity.CreatedByID = 1;
            _entity.UpdateByID = 1;
            //_entity.ImageID = newImage.Id;
            //_entity.VideoID = newVideo.Id;
            //_entity.Lattitude = 0.126789;
            //_entity.Longtidute = 0.123456;
            _entity.CreatedTime = DateTime.Today;
            _entity.UpdateTime = DateTime.Today;
            var result = await Mediator.Send(new ThemDiaDiem.Command { addPlace = _entity });
            
            //Thêm ảnh và video
            const string vanbanPath = "upload\\images";
            const string videoPath = "upload\\videos";
            //Image newImage = new Image();
            //Video newVideo = new Video();
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
                            IsAvatar = "0",
                            PlaceID = result.Value.ID
                        };
                        if (file== _request.files[0])
                        {
                            e.IsAvatar = "1";
                        }

                        var resultImg = await Mediator.Send(new ThemAnh.Command { image = e });
                        //newImage = resultImg.Value;
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
                            Url = "videos/"+newFileName,
                            PlaceID = result.Value.ID
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
        public async Task<IActionResult> EditEvent([FromForm] RequestUploadFile _request)
        {
            //Chỉnh sửa thông tin địa diểm trước
            Place _entity = JsonConvert.DeserializeObject<Place>(_request.data);
            _entity.UpdateByID = 1;           
            _entity.UpdateTime = DateTime.Today;
            var result = await Mediator.Send(new SuaDiaDiem.Command { place = _entity });

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
                            PlaceID= _entity.ID,
                            IsAvatar = "0"
                        };
                        if(file== _request.files[0])
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
                            PlaceID = _entity.ID
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
        public async Task<IActionResult> DeleteEvent(int id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new XoaDiaDiem.Command { Id = id });
            return HandlerResult(result);
        }
    }
}
