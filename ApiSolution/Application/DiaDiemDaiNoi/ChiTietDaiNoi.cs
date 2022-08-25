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

namespace Application.DiaDiemDaiNoi
{
    public class ChiTietDaiNoi
    {
        public class Query : IRequest<Result<DaiNoi>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<DaiNoi>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<DaiNoi>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_GET_DAINOIBYID";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<DaiNoi>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);
                    if(result == null)
                    {
                        return Result<DaiNoi>.Failure("Không tìm thấy dữ liệu");
                    }
                    result.ListImage = new List<string>();
                    var lstImage = await connection.QueryAsync<Image>(new CommandDefinition("SP_DAINOI_DANHSACH_IMAGE", parameters: null, commandType: System.Data.CommandType.StoredProcedure));

                    foreach(Image img in lstImage)
                    {
                        if (img.DaiNoiID == result.ID)
                        {
                            result.ListImage.Add(img.Url);
                        }
                    }

                    return Result<DaiNoi>.Success(result);
                }
            }
        }
    }
}
