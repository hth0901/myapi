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

namespace Application.TicketDetail
{
    public class TicketInfoAfterScan
    {
        public class Query : IRequest<Result<TicketDetailAfterScan>>
        {
            public string OrderId { get; set; }
            public int CustomerTypeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TicketDetailAfterScan>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<TicketDetailAfterScan>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_DETAIL_QUERY_V3";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.OrderId);
                parameters.Add("@PCUSTOMERTYPEID", request.CustomerTypeId);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryFirstOrDefaultAsync<TicketDetailAfterScan>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<TicketDetailAfterScan>.Success(result);
                }
            }
        }
    }
}
