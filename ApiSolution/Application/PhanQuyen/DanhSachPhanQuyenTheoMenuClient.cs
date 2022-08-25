using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Domain.ResponseEntity;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using AutoMapper;
using Application.Core;
using Microsoft.EntityFrameworkCore;

namespace Application.PhanQuyen
{
    public class DanhSachPhanQuyenTheoMenuClient
    {
        public class Query : IRequest<Result<List<int>>>{
            public string path { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<int>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<List<int>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_GET_NAV_CLIENT_AUTH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PPATH", request.path);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<int>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<int>>.Success(result.ToList());
                }
            }
        }
    }
}
