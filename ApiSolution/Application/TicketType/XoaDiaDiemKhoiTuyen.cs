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
    public class XoaDiaDiemKhoiTuyen
    {
        public class Command : IRequest<Result<int>>
        {
            public int placeid { get; set; }
            public int tickettypeid { get; set; }

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
                        string spName2 = "SP_VETHAMQUAN_CHITIET_DELETE";
                        DynamicParameters mParams = new DynamicParameters();
                        mParams.Add("@PPLACEID", request.placeid);
                        mParams.Add("@PTYPEID", request.tickettypeid);

                        var rowInsert = await connettion.ExecuteAsync(spName2, mParams, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<int>.Success(1);
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
