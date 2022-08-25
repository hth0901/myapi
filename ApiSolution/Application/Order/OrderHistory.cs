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
using Domain.ResponseEntity;

namespace Application.Order
{
    public class OrderHistory
    {
        public class Query : IRequest<Result<List<OrderHistoryResponse>>>
        {
            public string uname { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<OrderHistoryResponse>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<List<OrderHistoryResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_GET_ORDER_HISTORY";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PUNAME", request.uname);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<OrderHistoryResponse>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<OrderHistoryResponse>>.Success(result.ToList());
                }
            }
        }
    }
}
