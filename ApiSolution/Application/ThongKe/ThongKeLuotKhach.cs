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
    public class ThongKeLuotKhach
    {
        public class Query : IRequest<Result<List<VisitStatistic>>>
        {
            public string Date { get; set; }
            public string DateTo { get; set; }
            public int Type { get; set; }
            public string Place { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<VisitStatistic>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<VisitStatistic>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKE_LUOTTHAMQUAN_THEONGAY";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoaiKhach", request.Type);
                parameters.Add("@DiaDiem", request.Place);
                parameters.Add("@Ngay", request.Date);
                parameters.Add("@ToiNgay", request.DateTo);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<VisitStatistic>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<List<VisitStatistic>>.Success(result.ToList());
                }
            }
        }
    }
}
