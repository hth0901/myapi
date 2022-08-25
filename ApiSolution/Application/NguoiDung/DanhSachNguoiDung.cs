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
using Persistence;

namespace Application.NguoiDung
{
    public class DanhSachNguoiDung
    {
        public class Query : IRequest<Result<List<AppUserViewModel>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<AppUserViewModel>>>
        {
            private readonly IConfiguration _configuration;
            private readonly DataContext _context;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _configuration = configuration;
                _context = context;
            }
            public async Task<Result<List<AppUserViewModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_NGUOIDUNG_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<AppUserViewModel>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<AppUserViewModel>>.Success(result.ToList());
                }
            }
        }

    }
}
