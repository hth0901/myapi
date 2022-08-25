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
    public class ThongKeDoanhThuPoint
    {
        public class Query : IRequest<Result<List<ReceiptStatisticPoint>>>
        {
            public string Date { get; set; }
            public string DateTo { get; set; }
            public int Type { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<ReceiptStatisticPoint>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<ReceiptStatisticPoint>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKE_DOANHTHUMOTDIEM";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Date", request.Date);
                parameters.Add("@DateTo", request.DateTo);
                parameters.Add("@Type", request.Type);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<ReceiptStatisticPoint>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<List<ReceiptStatisticPoint>>.Success(result.ToList());
                }
            }
        }
    }
}
