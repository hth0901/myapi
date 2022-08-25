using API.Models;
using API.Settings;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;
using MailKit;
using System.IO;
using MailKit.Net.Smtp;
using DinkToPdf;
using API.PdfUltility;
using DinkToPdf.Contracts;
using Domain.RequestEntity;
using Domain;
using Newtonsoft.Json;

namespace API.Services
{
    public class MailServices : IMailServices
    {
        private readonly IOptions<MailSettings> _mailSettings;
        private readonly IConverter _converter;

        public MailServices(IOptions<MailSettings> mailSettings, IConverter converter)
        {
            _mailSettings = mailSettings;
            _converter = converter;
        }
        public string CheckValid(CreateEmailConfigRequest request)
        {
            try
            {
                var email = new MimeMessage();
                email.Sender = MailboxAddress.Parse(request.Email);
                using var smtp = new SmtpClient();
                
                smtp.Connect(request.Host, request.Port, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate(request.Email, request.Password);
                var result = smtp.IsAuthenticated;
                smtp.Disconnect(true);

                return "OK";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            //throw new NotImplementedException();
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;

            var builder = new BodyBuilder();
            if (mailRequest.Attchments != null)
            {
                byte[] fileBytes;
                foreach (var file in mailRequest.Attchments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, contentType: ContentType.Parse(file.ContentType));
                    }
                }
            }

            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Value.Host, _mailSettings.Value.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Value.Mail, _mailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailAsync(MailRequest mailRequest, EmailConfig mailConfig)
        {
            //throw new NotImplementedException();
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(mailConfig.Email);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;

            var builder = new BodyBuilder();
            if (mailRequest.Attchments != null)
            {
                byte[] fileBytes;
                foreach (var file in mailRequest.Attchments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, contentType: ContentType.Parse(file.ContentType));
                    }
                }
            }

            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(mailConfig.Host, mailConfig.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(mailConfig.Email, mailConfig.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailWithTicketAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;

            var builder = new BodyBuilder();

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
                HtmlContent = TemplateGenerator.GetHTMLString(mailRequest.ToName, mailRequest.ToEmail),
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
            builder.Attachments.Add("hihihehe.pdf", dkm);

            //if (mailRequest.Attchments != null)
            //{
            //    byte[] fileBytes;
            //    foreach (var file in mailRequest.Attchments)
            //    {
            //        if (file.Length > 0)
            //        {
            //            using (var ms = new MemoryStream())
            //            {
            //                file.CopyTo(ms);
            //                fileBytes = ms.ToArray();
            //            }
            //            builder.Attachments.Add(file.FileName, fileBytes, contentType: ContentType.Parse(file.ContentType));
            //        }
            //    }
            //}

            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Value.Host, _mailSettings.Value.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Value.Mail, _mailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailWithTicketQrAsync(DownloadTicketRequest mailRequest, EmailConfig emailConfig)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailConfig.Email);
            //email.Sender = MailboxAddress.Parse(_mailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.toEmail));
            email.Subject = mailRequest.mailSubject;

            var builder = new BodyBuilder();

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
                //HtmlContent = TemplateGenerator.HtmlString(mailRequest.QrString),
                HtmlContent = TemplateGenerator.GenTicketHtmlString(mailRequest),
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
            builder.Attachments.Add("vedientu.pdf", dkm);

            builder.HtmlBody = mailRequest.mailBody;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(emailConfig.Host, emailConfig.Port, MailKit.Security.SecureSocketOptions.StartTls);
            //smtp.Connect(_mailSettings.Value.Host, _mailSettings.Value.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(emailConfig.Email, emailConfig.Password);
            //smtp.Authenticate(_mailSettings.Value.Mail, _mailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailWithTicketQrAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;

            var builder = new BodyBuilder();

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
                HtmlContent = TemplateGenerator.HtmlString(mailRequest.QrString),
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
            builder.Attachments.Add("hihihehe.pdf", dkm);

            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Value.Host, _mailSettings.Value.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Value.Mail, _mailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailWithTicketQrAsync(List<string> _request, EmailConfig emailConfig, string toEmail)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { }
            };
            foreach (string item in _request)
            {
                DownloadTicketRequest _ticket = JsonConvert.DeserializeObject<DownloadTicketRequest>(item);

                var objectSettings = new ObjectSettings
                {
                    PagesCount = true,
                    HtmlContent = TemplateGenerator.GenTicketHtmlStringToSendMail(_ticket),
                    //WebSettings = { DefaultEncoding = "utf-8", UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "css", "style.css") },
                };

                pdf.Objects.Add(objectSettings);
            }
            var dkm = _converter.Convert(pdf);

            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailConfig.Email);
            //email.Sender = MailboxAddress.Parse(_mailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = emailConfig.Subject;

            var builder = new BodyBuilder();
            builder.Attachments.Add("vedientu.pdf", dkm);

            builder.HtmlBody = emailConfig.Content;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(emailConfig.Host, emailConfig.Port, MailKit.Security.SecureSocketOptions.StartTls);
            //smtp.Connect(_mailSettings.Value.Host, _mailSettings.Value.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(emailConfig.Email, emailConfig.Password);
            //smtp.Authenticate(_mailSettings.Value.Mail, _mailSettings.Value.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendWelcomeEmailAsync(WelcomeRequest _request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\MailTemplate\\WelcomeTemplate.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[username]", _request.UserName).Replace("[email]", _request.ToEmail);

            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Value.Mail);
            email.To.Add(MailboxAddress.Parse(_request.ToEmail));
            email.Subject = $"Welcome {_request.UserName}";
            var builder = new BodyBuilder();
            builder.HtmlBody = MailText;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Value.Host, _mailSettings.Value.Port, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Value.Mail, _mailSettings.Value.Password);

            await smtp.SendAsync(email);

            smtp.Disconnect(true);
        }
    }
}
