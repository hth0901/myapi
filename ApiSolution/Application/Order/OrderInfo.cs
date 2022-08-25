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


namespace Application.Order
{
    public class OrderInfo
    {
        public class Query : IRequest<Result<OrderTemp>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<OrderTemp>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<OrderTemp>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_GET_ORDER_INFO";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<OrderTemp>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    if (result == null)
                    {
                        return Result<OrderTemp>.Failure("Order not found!!");
                    }

                    return Result<OrderTemp>.Success(result);
                }
            }
        }
    }
}
