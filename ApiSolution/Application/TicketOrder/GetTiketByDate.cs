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

namespace Application.TicketOrder
{
    public class GetTiketByDate
    {
        public class Query : IRequest<Result<List<TicketPriceByDate>>>
        {
            public string _dateString { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<TicketPriceByDate>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<TicketPriceByDate>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TONGTIEN";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PDATESTRING", request._dateString);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<TicketPriceByDate>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<List<TicketPriceByDate>>.Success(result.ToList());
                }
            }
        }
    }
   
}
