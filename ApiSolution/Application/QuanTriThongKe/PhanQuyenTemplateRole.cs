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
    public class PhanQuyenTemplateRole
    {
        public class Command : IRequest<Result<int>>
        {
            public StatisticTemplateRoleResult DoiTuong { get; set; }
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
                string spName = "SP_THONGKETEMPLATEROLE_PHANQUYEN";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TemplateID", request.DoiTuong.TemplateID);
                parameters.Add("@ListRole", request.DoiTuong.RoleID);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    if (request.DoiTuong.RoleID != null && request.DoiTuong.RoleID != "")
                    {
                        int[] ids = request.DoiTuong.RoleID.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
                        int check = ids.Count();
                        var affectRow = await connection.ExecuteScalarAsync<int>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                        var result = affectRow == check;
                        if (!result)
                            return Result<int>.Failure("Error!");
                        return Result<int>.Success(affectRow);
                    }
                    else
                    {
                        string sp = "SP_THONGKETEMPLATEROLE_DELETEMULTIPLE";
                        DynamicParameters para = new DynamicParameters();
                        para.Add("@TemplateID", request.DoiTuong.TemplateID);
                        var affectRow = await connection.ExecuteAsync(sp, para, commandType: System.Data.CommandType.StoredProcedure);
                        return Result<int>.Success(affectRow);
                    }
                }
            }
        }
    }
}
