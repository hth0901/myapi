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

namespace Application.TicketType
{
    public class ChinhSua
    {
        public class Command : IRequest<Result<int>>
        {
            public TicketTypeUpdateRequest Request { get; set; }
            public string username { get; set; }
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
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        string spname = "SP_VETHAMQUAN_UPDATE";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PID", request.Request.Id);
                        parameters.Add("@PNAME", request.Request.Name);
                        parameters.Add("@PCONTENT", request.Request.Content);
                        parameters.Add("@PDATETOEXPIRED", request.Request.DateToExpired);
                        var rowUpdated = await connettion.ExecuteAsync(spname, parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (rowUpdated < 0)
                        {
                            throw new Exception("Chỉnh sửa không thành công");
                        }
                        return Result<int>.Success(rowUpdated);
                    }
                    catch (Exception ex)
                    {
                        return Result<int>.Failure(ex.Message);
                    }
                }
            }
        }
    }
}
