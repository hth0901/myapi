using Domain;
using Dapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.ResponseEntity;

namespace Application.GioHang
{
    public class DanhSachGioHangTheoNguoiDung
    {
        public class Query : IRequest<Result<List<UserCartResponse>>>
        {
            public string username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserCartResponse>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<List<UserCartResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_USERCART_QUERY";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PUSERNAME", request.username);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<UserCartResponse>(new CommandDefinition(spName, parameters: parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<UserCartResponse>>.Success(result.ToList());
                }
            }
        }
    }
}
