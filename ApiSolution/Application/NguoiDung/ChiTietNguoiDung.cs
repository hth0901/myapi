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
using System.Security.Cryptography;

namespace Application.NguoiDung
{
    public class ChiTietNguoiDung
    {
        public class Query : IRequest<Result<Employee>>
        {
            public string _nguoidung { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Employee>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Employee>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_GET_NGUOIDUNG";
                //string hash = BitConverter.ToString(MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(request._nguoidung.PassWord))).Replace("-", "");
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PUSERNAME", request._nguoidung);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<Employee>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);                   
                    return Result<Employee>.Success(result);
                }
            }
        }
    }
}
