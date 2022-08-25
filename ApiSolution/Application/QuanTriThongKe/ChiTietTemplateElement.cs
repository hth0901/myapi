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
    public class ChiTietTemplateElement
    {
        public class Query : IRequest<Result<StatisticTemplateElement>>
        {
            public int TemplateID { get; set; }
            public int ElementID { get; set; }
            public int RoleID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<StatisticTemplateElement>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<StatisticTemplateElement>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATEELEMENT_GET";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TemplateID", request.TemplateID);
                parameters.Add("@ElementID", request.ElementID);
                parameters.Add("@RoleId", request.RoleID);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<StatisticTemplateElement>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<StatisticTemplateElement>.Success(result);
                }
            }
        }
    }
}
