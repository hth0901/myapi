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
    public class DanhSachTemplateAdmin
    {
        public class Query : IRequest<Result<List<StatisticTemplate>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<StatisticTemplate>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<StatisticTemplate>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATE_GETSALL";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<StatisticTemplate>(new CommandDefinition(spName, parameters: null, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<StatisticTemplate>>.Success(result.ToList());
                }
            }
        }
    }
}
