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
    public class DanhSachBaseTemplate
    {
        public class Query : IRequest<Result<List<BaseStatisticTemplate>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<BaseStatisticTemplate>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<BaseStatisticTemplate>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATE_GETSBASE";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<BaseStatisticTemplate>(new CommandDefinition(spName, parameters: null, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<BaseStatisticTemplate>>.Success(result.ToList());
                }
            }
        }
    }
}
