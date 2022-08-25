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
    public class PhanQuyenTemplateElement
    {
        public class Command : IRequest<Result<int>>
        {
            public StatisticTemplateElement DoiTuong { get; set; }
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
                string spName = "SP_THONGKETEMPLATEELEMENT_PHANQUYEN";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TemplateID", request.DoiTuong.TemplateID);
                parameters.Add("@ElementID", request.DoiTuong.ElementID);
                parameters.Add("@RoleID", request.DoiTuong.RoleID);
                parameters.Add("@Value", request.DoiTuong.Value);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteScalarAsync<int>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    if (affectRow == 0)
                        return Result<int>.Failure("Error!");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
