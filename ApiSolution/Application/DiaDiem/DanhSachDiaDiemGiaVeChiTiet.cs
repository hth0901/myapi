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
using Domain.ResponseEntity;

namespace Application.DiaDiem
{
    public class DanhSachDiaDiemGiaVeChiTiet
    {
        public class Query : IRequest<Result<List<DiaDiemGiaVeChiTiet>>> { }

        public class Handler : IRequestHandler<Query, Result<List<DiaDiemGiaVeChiTiet>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<DiaDiemGiaVeChiTiet>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_PLACE_PRICE_QUERY";
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<DiaDiemGiaVeChiTiet>(new CommandDefinition(spName, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<DiaDiemGiaVeChiTiet>>.Success(result.ToList());
                }
            }
        }
    }
}
