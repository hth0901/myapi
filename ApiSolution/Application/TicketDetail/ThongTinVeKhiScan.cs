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
    public class ThongTinVeKhiScan
    {
        public class Query : IRequest<Result<ThongTinVeScanResponse>>
        {
            public string OrderId { get; set; }
            public int PlaceId { get; set; }
            public int CustomerTypeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ThongTinVeScanResponse>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<ThongTinVeScanResponse>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_DETAIL_QUERY_SCAN";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.OrderId);
                parameters.Add("@PPLACEID", request.PlaceId);
                parameters.Add("@PCUSTOMERTYPE", request.CustomerTypeId);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryFirstOrDefaultAsync<ThongTinVeScanResponse>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<ThongTinVeScanResponse>.Success(result);
                }
            }
        }
    }
}
