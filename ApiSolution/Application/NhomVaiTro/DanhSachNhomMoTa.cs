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

namespace Application.NhomVaiTro
{
    public class DanhSachNhomMoTa
    {
        public class Query: IRequest<Result<List<HC_NhomVaiTro>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<HC_NhomVaiTro>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<HC_NhomVaiTro>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "select * from HC_NhomVaiTro";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<HC_NhomVaiTro>(new CommandDefinition(spName, commandType: System.Data.CommandType.Text));
                    return Result<List<HC_NhomVaiTro>>.Success(result.ToList());
                }
            }
        }
    }
}
