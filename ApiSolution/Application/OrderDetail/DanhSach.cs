using Domain.ResponseEntity;
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
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.OrderDetail
{
    public class DanhSach
    {
        public class Query : IRequest<Result<List<OrderDetailShortResponse>>>
        {
            public string OrderId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<OrderDetailShortResponse>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<OrderDetailShortResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_ORDERDETAIL_QUERY";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.OrderId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<OrderDetailShortResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<List<OrderDetailShortResponse>>.Success(result.ToList());
                }
            }
        }
    }
}
