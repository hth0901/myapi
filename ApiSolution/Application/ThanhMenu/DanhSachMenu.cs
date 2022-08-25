using Domain;
using Dapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;

namespace Application.ThanhMenu
{
    public class DanhSachMenu
    {
        public class Query : IRequest<Result<List<Menu>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Menu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Menu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_MENU_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Menu>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Menu>>.Success(result.ToList());
                }
            }
        }

    }
}
