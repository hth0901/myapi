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

namespace Application.TicketType
{
    public class ThemAnh
    {
        public class Command : IRequest<Result<int>>
        {
            public string url { get; set; }
            public int tickettypeid { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKETTYPE_ADD_IMAGE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PURL", request.url);
                parameters.Add("@PTICKETTYPEID", request.tickettypeid);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.ExecuteScalarAsync<int>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<int>.Success(result);
                }
            }
        }
    }
}
