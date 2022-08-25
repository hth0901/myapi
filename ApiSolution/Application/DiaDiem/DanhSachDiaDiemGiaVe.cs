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

namespace Application.DiaDiem
{
    public class DanhSachDiaDiemGiaVe
    {
        public class Query : IRequest<Result<List<PlacePrice>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PlacePrice>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<PlacePrice>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_DIADIEM_GIAVE_DANHSACH";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<PlacePrice>(new CommandDefinition(spName, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<PlacePrice>>.Success(result.ToList());
                }
            }
        }
    }
}
