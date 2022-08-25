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
using Application.Core;

namespace Application.Activities
{
    public class DeleteEvent
    {
        public class Query : IRequest<Result<int>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<int>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Query request, CancellationToken cancellationToken)
            {
                //string spName = $"select * from Activities where Id='{request.Id}'";
                string spName = "SP_DELETE_EVENT";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.QueryFirstAsync<int>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Delete Event not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
