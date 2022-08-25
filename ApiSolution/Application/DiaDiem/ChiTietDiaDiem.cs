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

namespace Application.DiaDiem
{
    public class ChiTietDiaDiemGiaVe
    {
        public class Query: IRequest<Result<PlaceDetailModel>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PlaceDetailModel>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PlaceDetailModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_DIADIEM_CHITIET_GIAVE";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstAsync<PlaceDetailModel>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<PlaceDetailModel>.Success(result);
                }
            }
        }
    }
    public class ChiTietDiaDiem
    {
        public class Query : IRequest<Result<Place>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Place>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Place>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_DIADIEM_DANHSACH";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstAsync<Place>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<Place>.Success(result);
                }
            }
        }
    }
}
