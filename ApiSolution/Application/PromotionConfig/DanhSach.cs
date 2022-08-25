using Application.Core;
using Dapper;
using Domain.ResponseEntity;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.PromotionConfig
{
    public class DanhSach
    {
        public class Query : IRequest<Result<IEnumerable<PromotionConfigItemResponse>>>
        {
            public int pageIndex { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PromotionConfigItemResponse>>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PromotionConfigItemResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_PROMOTION_QUERY";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PPAGEINDEX", request.pageIndex);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<PromotionConfigItemResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    if (result == null)
                    {
                        return Result<IEnumerable<PromotionConfigItemResponse>>.Failure("Config not found!!");
                    }

                    return Result<IEnumerable<PromotionConfigItemResponse>>.Success(result);
                }
            }
        }
    }
}
