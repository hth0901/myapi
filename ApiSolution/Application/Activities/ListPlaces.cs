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

namespace Application.Activities
{
    public class ListPlaces
    {
        public class Query : IRequest<Result<List<Place>>>
        {

        }
         public class Handler : IRequestHandler<Query, Result<List<Place>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Place>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "select * from Place";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Activity>(spName);
                    var result = await connection.QueryAsync<Place>(new CommandDefinition(spName, parameters: null, commandType: System.Data.CommandType.Text, cancellationToken: cancellationToken));

                    return Result<List<Place>>.Success(result.ToList());
                }
            }
        }
    }
}
