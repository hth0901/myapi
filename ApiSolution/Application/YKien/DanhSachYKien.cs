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

namespace Application.YKien

{
    public class DanhSachYKien
    {
        public class Query : IRequest<Result<List<FeedBack>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<FeedBack>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<FeedBack>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_FEEDBACK_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<FeedBack>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<FeedBack>>.Success(result.ToList());
                }
            }
        }

    }
}
