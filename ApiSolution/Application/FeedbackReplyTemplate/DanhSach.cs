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
using Microsoft.EntityFrameworkCore;
using Domain.ResponseEntity;

namespace Application.FeedbackReplyTemplate
{
    public class DanhSach
    {
        public class Query : IRequest<Result<IEnumerable<FeedbackConfigItemResponse>>>
        {
            public int pageIndex { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<FeedbackConfigItemResponse>>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<FeedbackConfigItemResponse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_FEEDBACK_CONFIG_QUERY";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PPAGEINDEX", request.pageIndex);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<FeedbackConfigItemResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    if (result == null)
                    {
                        return Result<IEnumerable<FeedbackConfigItemResponse>>.Failure("Config not found!!");
                    }

                    return Result<IEnumerable<FeedbackConfigItemResponse>>.Success(result);
                }
            }
        }
    }
}
