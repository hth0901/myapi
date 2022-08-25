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
    public class TicketDelete
    {
        public class Command: IRequest<Result<int>>
        {
            public Guid TicketId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_DELETE";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTICKETID", request.TicketId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.ExecuteAsync(spName, param: parameters, commandType: System.Data.CommandType.StoredProcedure);

                    return Result<int>.Success(result);
                }
            }
        }
    }
}
