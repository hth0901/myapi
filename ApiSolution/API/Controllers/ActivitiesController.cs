using API.RequestEntity;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using VeDienTu.Ultility;
using bienlaidientu;
using bienlaiBusinessService;
using bienlaiPortalService;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ActivitiesController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        // ACTIVITY BASIC
        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> GetActivities(CancellationToken ct)
        {
            //return await Mediator.Send(new List.Query(), ct);
            
            var lst = await Mediator.Send(new List.Query(), ct);
            return HandlerResult(lst);
        }
        //[Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(Guid id)
        {
            //return await Mediator.Send(new Details.Query { Id = id });
            var result = await Mediator.Send(new Details.Query { Id = id });

            //if (result.IsSuccess && result.Value != null)
            //    return Ok(result.Value);
            //if (result.IsSuccess && result.Value == null)
            //    return NotFound();

            //return BadRequest(result.Error);
            return HandlerResult(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            //return Ok(await Mediator.Send(new Delete.Command { Id = id }));
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            var result = await Mediator.Send(new Edit.Command { Activity = activity });

            return HandlerResult(result);
        }       
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Activity _entity)
        {
            //return Ok(await Mediator.Send(new Create.Command { Activity = _entity }));
            var result = await Mediator.Send(new Create.Command { Activity = _entity });
            return HandlerResult(result);
        }

        [HttpGet("testnhom")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDanhSachNhom()
        {
            //return Ok(await Mediator.Send(new Create.Command { Activity = _entity }));
            var result = await Mediator.Send(new Application.NhomVaiTro.DanhSachNhomMoTa.Query());
            return HandlerResult(result);
        }

        [HttpGet("testnumber/{number}")]
        [AllowAnonymous]
        public async Task<IActionResult> NumberToText(int number)
        {
            var result = NumberHelper.NumberToText(number);
            var myXml = XmlHelper.ImportAndPublishInv();
            PublishServiceSoapClient portalService = new PublishServiceSoapClient(PublishServiceSoapClient.EndpointConfiguration.PublishServiceSoap);
            try
            {
                var mResult = await portalService.ImportAndPublishInvAsync("ditichhueadmin", "Einv@oi@vn#pt20", myXml.InnerXml, "tichhop", "123456aA@", "", "", 0);
            }
            catch (Exception ex)
            {
                string mMessage = ex.Message;
            }
            return Ok(result);
        }

        [HttpGet("xoabienlai/{mabienlai}")]
        [AllowAnonymous]
        public async Task<IActionResult> XoaBienLai(string mabienlai)
        {
            var myXml = XmlHelper.ImportAndPublishInv();
            string result = string.Empty;
            BusinessServiceSoapClient mService = new BusinessServiceSoapClient(BusinessServiceSoapClient.EndpointConfiguration.BusinessServiceSoap);
            try
            {
                var mResult = await mService.cancelInvAsync("ditichhueadmin", "Einv@oi@vn#pt20", mabienlai, "tichhop", "123456aA@");
                result = "ok";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return Ok(result);
        }

        [HttpGet("taibienlai/{mabienlai}")]
        [AllowAnonymous]
        public async Task<IActionResult> DownLoadBienLai(string mabienlai)
        {
            var myXml = XmlHelper.ImportAndPublishInv();
            string result = string.Empty;
            PortalServiceSoapClient mService = new PortalServiceSoapClient(PortalServiceSoapClient.EndpointConfiguration.PortalServiceSoap);
            
            try
            {
                var mResult = await mService.downloadInvPDFFkeyNoPayAsync(mabienlai, "tichhop", "123456aA@");
                string fileBase64 = mResult.Body.downloadInvPDFFkeyNoPayResult;
                byte[] pdfFile = Convert.FromBase64String(fileBase64);
                //result = "ok";
                return new FileContentResult(pdfFile, "application/pdf");
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return Ok(result);
        }


        //[HttpGet]
        //[Route("eventByID/{id}")]
        //public async Task<IActionResult> GetEventByID(int id)
        //{           
        //    var result = await Mediator.Send(new EventByID.Query { Id = id });
        //    return HandlerResult(result);
        //}             
        //[HttpPost]
        //[Route("addEvent")]
        //public async Task<IActionResult> AddEvent([FromBody] Event _entity)
        //{
        //    _entity.CreatedByID = 1;
        //    _entity.UpdateByID = 1;
        //    _entity.ImageID = 1;
        //    _entity.TicketTypeID = 1;
        //    _entity.Lattitude = 0.126789;
        //    _entity.Longtidute = 0.123456;
        //    _entity.CreatedTime = DateTime.Today;
        //    _entity.UpdateTime = DateTime.Today;
        //    var result = await Mediator.Send(new AddEvent.Command { addEvent = _entity });
        //    return HandlerResult(result);
        //}
        //[HttpPut]
        //[Route("editEvent")]
        //public async Task<IActionResult> EditEvent(Event _event)
        //{           
        //    var result = await Mediator.Send(new EditEvent.Command { _event = _event });

        //    return HandlerResult(result);
        //}

        ////ACTIVITIES WITH PLACE
        //[HttpGet]
        //[Route("listPlaces")]
        //public async Task<IActionResult> GetListPlaces()
        //{
        //    var lst = await Mediator.Send(new ListPlaces.Query());
        //    return HandlerResult(lst);
        //}
        //[HttpPost]
        //[Route("addPlace")]
        //public async Task<IActionResult> AddPlace([FromBody] Place _entity)
        //{
        //    _entity.CreatedByID = 1;
        //    _entity.UpdateByID = 1;
        //    _entity.ImageID = 1;
        //    //_entity.TicketTypeID = 1;
        //    _entity.Lattitude = 0.6789f;
        //    _entity.Longtidute = 0.123456f;
        //    _entity.CreatedTime = DateTime.Today;
        //    _entity.UpdateTime = DateTime.Today;
        //    var result = await Mediator.Send(new AddPlace.Command { addPlace = _entity });
        //    return HandlerResult(result);
        //}
        //[HttpGet]
        //[Route("placeByID/{id}")]
        //public async Task<IActionResult> GetPlaceByID(int id)
        //{
        //    var result = await Mediator.Send(new PlaceByID.Query { Id = id });
        //    return HandlerResult(result);
        //}
        //[HttpPut]
        //[Route("editPlace")]
        //public async Task<IActionResult> EditPlace(Place _place)
        //{
        //    var result = await Mediator.Send(new EditPlace.Command { place = _place });

        //    return HandlerResult(result);
        //}
        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok("hihihaha");
        }

        [HttpPost]
        [Route("uploadfile")]
        public IActionResult UploadFile([FromForm] RequestUploadFile _request)
        {
            
            const string vanbanPath = "upload\\kdc";
            if (_request.files.Count > 0)
            {               
                var target = Path.Combine(_hostingEnvironment.ContentRootPath, vanbanPath);
                //_request.files.ForEach(async file =>
                //{
                //    if (file.Length <= 0) return;
                //    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                //    string fileName = file.FileName;
                //    int idx = fileName.LastIndexOf('.');
                //    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                //    var filePath = Path.Combine(target, $"{newFileName}");

                _request.files.ForEach(async file =>
                {
                    if (file.Length <= 0) return;
                    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

                    string fileName = file.FileName;
                    int idx = fileName.LastIndexOf('.');
                    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                    var filePath = Path.Combine(target, $"{newFileName}");

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);

                        TepKemTheoEntity e = new TepKemTheoEntity
                        {
                            DoiTuongSoHuu = 1,
                            TenTep = file.FileName,
                            NoiLuuTru = $"{vanbanPath}\\{newFileName}"
                        };
                        await Mediator.Send(new Application.TepKemTheo.Create.Command { Tep = e });
                    }
                });
            }
            //return HandlerResult(_request.files.Count);
            return Ok(new
            {
                _request.files.Count
            });
        }
    }
}
