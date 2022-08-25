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
    public class DanhSachElement
    {
        public class Query : IRequest<Result<List<StatisticElement>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<StatisticElement>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<StatisticElement>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKEELEMENT_GETS";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<StatisticElement>(new CommandDefinition(spName, parameters: null, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<StatisticElement>>.Success(result.ToList());
                }
            }
        }
    }
}
