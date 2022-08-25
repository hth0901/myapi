using API.Models;
using Domain;
using Domain.RequestEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IMailServices
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendEmailAsync(MailRequest mailRequest, EmailConfig mailConfig);
        Task SendWelcomeEmailAsync(WelcomeRequest _request);
        Task SendEmailWithTicketAsync(MailRequest mailRequest);
        Task SendEmailWithTicketQrAsync(MailRequest mailRequest);
        Task SendEmailWithTicketQrAsync(DownloadTicketRequest mailRequest, EmailConfig emailConfig);

        Task SendEmailWithTicketQrAsync(List<string> _request, EmailConfig emailConfig, string toEmail);
        string CheckValid(CreateEmailConfigRequest request);

    }
}
