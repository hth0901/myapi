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

namespace Application.GioHang
{
    public class CapNhatSoLuong
    {
        public class Command : IRequest<Result<int>>
        {
            public TurningCartDetailRequest TurningCartDetailRequest { get; set; }
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
                    string spName = "SP_USERCART_DETAIL_TURNING";
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@PCOUNT", request.TurningCartDetailRequest.count);
                    parameters.Add("@PID", request.TurningCartDetailRequest.id);

                    var affectRow = await connettion.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
