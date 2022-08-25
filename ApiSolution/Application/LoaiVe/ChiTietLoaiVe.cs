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

namespace Application.LoaiVe
{
    public class ChiTietLoaiVe
    {
        public class Query : IRequest<Result<Domain.TicketType>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Domain.TicketType>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Domain.TicketType>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_GET_TICKETTYPEBYID";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstAsync<Domain.TicketType>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<Domain.TicketType>.Success(result);
                }
            }
        }
    }
}
