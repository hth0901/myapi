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

namespace Application.LoaiVe
{
    public class DanhSachLoaiVe
    {
        public class Query : IRequest<Result<List<Domain.TicketType>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Domain.TicketType>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Domain.TicketType>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_LOAIVE_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Domain.TicketType>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Domain.TicketType>>.Success(result.ToList());
                }
            }
        }
    }
}
