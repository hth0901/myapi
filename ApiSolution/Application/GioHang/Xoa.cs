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
using Application.Core;

namespace Application.GioHang
{
    public class Xoa
    {
        public class Command : IRequest<Result<int>>
        {
            public int Id { get; set; }
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
                string spName = "SP_USERCART_DELETE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PCARTID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
