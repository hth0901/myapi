using API.Models;
using API.PdfUltility;
using API.RequestEntity;
using Application.Activities;
using DinkToPdf;
using DinkToPdf.Contracts;
using Domain;
using MediatR;
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

namespace API.Controllers
{
    public class PdfDemoController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IConverter _converter;

        public PdfDemoController(IWebHostEnvironment hostingEnvironment, IConverter converter) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _converter = converter;
        }

        [HttpGet]
        public IActionResult CreatePdfDemo(string name, string email)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
                //Out = @"D:\PDFCreator\Employee_Report.pdf"
                //Out = Path.Combine(Directory.GetCurrentDirectory(), "Employee_Report.pdf")
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = TemplateGenerator.GetHTMLString(name, email),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            var dkm = _converter.Convert(pdf);
            //return Ok("Successfully created PDF document.");
            return new FileContentResult(dkm, "application/pdf");
            //return File(dkm, "application/pdf");
        }

        [HttpPost]
        public IActionResult PostPdfDemo([FromForm] MailRequest _request)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
            };
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                //HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
                HtmlContent = TemplateGenerator.HtmlTicket(_request.QrString),
                WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") },
                HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
            var dkm = _converter.Convert(pdf);
            //return Ok("Successfully created PDF document.");
            return new FileContentResult(dkm, "application/pdf");
            //return File(dkm, "application/pdf");
        }
    }
}
