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

namespace Application.DiaDiem
{
    public class ImageUrl
    {
        public class Query : IRequest<Result<string>>
        {
            public int id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<string>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<string>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_PLACE_GET_IMAGE_URL";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PPLACEID", request.id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.ExecuteScalarAsync<string>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<string>.Success(result);
                }
            }
        }
    }
}
