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

namespace Application.TepKemTheo
{
    public class List
    {
        public class Query : IRequest<Result<List<TepKemTheoEntity>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<TepKemTheoEntity>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<TepKemTheoEntity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "select * from Activities";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Activity>(spName);
                    var result = await connection.QueryAsync<TepKemTheoEntity>(new CommandDefinition(spName, parameters: null, commandType: System.Data.CommandType.Text, cancellationToken: cancellationToken));

                    return Result<List<TepKemTheoEntity>>.Success(result.ToList());
                }
            }
        }
    }
}
