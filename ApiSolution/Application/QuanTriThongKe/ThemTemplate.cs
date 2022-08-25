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
using Persistence;
using Application.Core;

namespace Application.QuanTriThongKe
{
    public class ThemTemplate
    {
        public class Command : IRequest<Result<StatisticTemplate>>
        {
            public StatisticTemplate DoiTuong { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<StatisticTemplate>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<StatisticTemplate>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATE_ADD";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Name", request.DoiTuong.Name);
                parameters.Add("@IStatisticElementID", request.DoiTuong.IStatisticElementID);
                parameters.Add("@IS_TrinhDien", request.DoiTuong.IS_TrinhDien);
                parameters.Add("@CreatedByID", request.DoiTuong.CreatedByID);
                parameters.Add("@CreatedTime", request.DoiTuong.CreatedTime);
                parameters.Add("@BaseTemplate", request.DoiTuong.BaseTemplate);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<StatisticTemplate>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    return Result<StatisticTemplate>.Success(result);
                }
            }
        }
    }
}
