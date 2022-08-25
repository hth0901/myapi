using Application.Core;
using Dapper;
using Domain.ResponseEntity;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.TicketOrder
{
    public class TicketsList
    {
        public class Query : IRequest<Result<IEnumerable<TicketItemResponse>>>
        {
            public int pageIndex { get; set; }
            public string keyword { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<TicketItemResponse>>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<TicketItemResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_QUERY";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PPAGEINDEX", request.pageIndex);
                parameters.Add("@PORDERID", request.keyword);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<TicketItemResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    if (result == null)
                    {
                        return Result<IEnumerable<TicketItemResponse>>.Failure("Order not found!!");
                    }

                    return Result<IEnumerable<TicketItemResponse>>.Success(result);
                }
            }
        }
    }
}
