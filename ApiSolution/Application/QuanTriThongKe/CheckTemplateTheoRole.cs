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
using AutoMapper;
using Application.Core;
using Microsoft.EntityFrameworkCore;

namespace Application.QuanTriThongKe
{
    public class CheckTemplateTheoRole
    {
        public class Query : IRequest<Result<StatisticTemplateRole>>
        {
            public int RoleID { get; set; }
            public int TemplateID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<StatisticTemplateRole>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<StatisticTemplateRole>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATEROLE_CHECK";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TemplateID", request.TemplateID);
                parameters.Add("@RoleID", request.RoleID);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<StatisticTemplateRole>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<StatisticTemplateRole>.Success(result);
                }
            }
        }
    }
}
