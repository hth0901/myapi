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

namespace Application.GiaVe
{
    public class DanhSachGiaVe
    {
        public class Query : IRequest<Result<List<TicketPrice>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<TicketPrice>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<TicketPrice>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_PRICE_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<TicketPrice>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<TicketPrice>>.Success(result.ToList());
                }
            }
        }

    }
}
