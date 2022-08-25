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
using Persistence;
using FluentValidation;
using Application.Core;
using Domain.RequestEntity;


namespace Application.TicketOrder
{
    public class Create
    {
        public class Command : IRequest<Result<Domain.TicketOrder>>
        {
            public Domain.TicketOrder Request { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Domain.TicketOrder>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Domain.TicketOrder>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKETORDER_INSERT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTOTALPRICE", request.Request.TotalPrice);
                parameters.Add("@PORDERID", request.Request.OrderTempId);
                parameters.Add("@PPAYSTATUS", request.Request.PayStatus);
                parameters.Add("@PUSERNAME", request.Request.CreatedBy);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    var ticketResult = await connection.QueryFirstOrDefaultAsync<Domain.TicketOrder>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    if (ticketResult == null)
                    {
                        return Result<Domain.TicketOrder>.Failure("Ticket not found!!");
                    }

                    return Result<Domain.TicketOrder>.Success(ticketResult);
                }
            }
        }
    }
}
