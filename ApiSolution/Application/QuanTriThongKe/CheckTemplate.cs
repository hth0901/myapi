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
    public class CheckTemplate
    {
        public class Query : IRequest<Result<bool>>
        {
            public int ID { get; set; }
            public string Name { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<bool>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<bool>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATE_CHECK";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", request.ID);
                parameters.Add("@Name", request.Name);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<StatisticTemplate>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    bool check = true;
                    if (result != null) 
                    {
                        check = false;
                    }
                    return Result<bool>.Success(check);
                }
            }
        }
    }
}
