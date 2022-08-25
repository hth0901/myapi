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

namespace Application.DoiTuong
{
    public class DanhSachDoiTuong
    {
        public class Query : IRequest<Result<List<CustomerType>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<CustomerType>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<CustomerType>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_DOITUONG_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<CustomerType>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<CustomerType>>.Success(result.ToList());
                }
            }
        }

    }
}
