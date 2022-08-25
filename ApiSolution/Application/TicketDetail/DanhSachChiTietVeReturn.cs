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
    public class DanhSachChiTietVeReturn
    {
        public class Query : IRequest<Result<List<Domain.ResponseEntity.TicketDetailReturn>>>
        {
            public string OrderId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Domain.ResponseEntity.TicketDetailReturn>>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<TicketDetailReturn>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_DETAIL_QUERY_RETURN";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.OrderId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<TicketDetailReturn>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<TicketDetailReturn>>.Success(result.ToList());
                }
            }
        }
    }
}
