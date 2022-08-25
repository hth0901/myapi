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
    public class ChiTietTemplateRole
    {
        public class Query : IRequest<Result<StatisticTemplateRoleResult>>
        {
            public int TemplateID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<StatisticTemplateRoleResult>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<StatisticTemplateRoleResult>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATEROLE_GET";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TemplateID", request.TemplateID);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var list = await connection.QueryAsync<StatisticTemplateRole>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    List<int> vs = new List<int>();
                    foreach (var l in list)
                    {
                        vs.Add(l.RoleID);
                    }
                    var role = string.Join(",", vs);
                    StatisticTemplateRoleResult result = new StatisticTemplateRoleResult
                    { 
                        RoleID = role,
                        TemplateID = request.TemplateID,
                    };
                    return Result<StatisticTemplateRoleResult>.Success(result);
                }
            }
        }
    }
}
