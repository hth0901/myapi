using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using FluentValidation;
using Application.Core;
using Domain.RequestEntity;

namespace Application.MailConfig
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<int>>
        {
            public CreateEmailConfigRequest EmailConfig { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_MAILCONFIG_INSERT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PDISPLAYNAME", request.EmailConfig.DisplayName);
                parameters.Add("@PCONTENT", request.EmailConfig.Content);
                parameters.Add("@PSUBJECT", request.EmailConfig.Subject);
                parameters.Add("@PEMAIL", request.EmailConfig.Email);
                parameters.Add("@PPASSWORD", request.EmailConfig.Password);
                parameters.Add("@PHOST", request.EmailConfig.Host);
                parameters.Add("@PPORT", request.EmailConfig.Port);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Thêm mới không thành công");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
