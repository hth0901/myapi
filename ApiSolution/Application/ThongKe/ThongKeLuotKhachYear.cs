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

namespace Application.ThongKe
{
    public class ThongKeLuotKhachYear
    {
        public class Query : IRequest<Result<List<VisitStatisticYear>>>
        {
            public string From { get; set; }
            public string To { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<VisitStatisticYear>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<VisitStatisticYear>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKE_LUOTTHAMQUAN_THEONAM";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TuNam", request.From);
                parameters.Add("@DenNam", request.To);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<VisitStatisticYear>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<List<VisitStatisticYear>>.Success(result.ToList());
                }
            }
        }
    }
}
