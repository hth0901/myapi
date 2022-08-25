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
    public class SuaTemplate
    {
        public class Command : IRequest<Result<int>>
        {
            public StatisticTemplate DoiTuong { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKETEMPLATE_UPDATE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ID", request.DoiTuong.ID);
                parameters.Add("@Name", request.DoiTuong.Name);
                parameters.Add("@IS_TrinhDien", request.DoiTuong.IS_TrinhDien);
                parameters.Add("@UpdateByID", request.DoiTuong.UpdateByID);
                parameters.Add("@UpdateTime", request.DoiTuong.UpdateTime);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Edit not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
