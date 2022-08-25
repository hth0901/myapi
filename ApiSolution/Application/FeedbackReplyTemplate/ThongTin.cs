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

namespace Application.FeedbackReplyTemplate
{
    public class ThongTin
    {
        public class Query : IRequest<Result<Domain.FeedbackReplyTemplate>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<Domain.FeedbackReplyTemplate>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<Domain.FeedbackReplyTemplate>> Handle(Query request, CancellationToken cancellationToken)
            {
                //var result = await _context.FeedbackReplyTemplate.FirstOrDefaultAsync<Domain.FeedbackReplyTemplate>();

                //if (result == null)
                //{
                //    return Result<Domain.FeedbackReplyTemplate>.Failure("Không lấy được thông tin cấu hình");
                //}
                //return Result<Domain.FeedbackReplyTemplate>.Success(result);

                string spName = "SP_FEEDBACK_REPLY_TEMPLATE_GET_CURRENT";

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<Domain.FeedbackReplyTemplate>(spName, commandType: System.Data.CommandType.StoredProcedure, param: null);

                    if (result == null)
                    {
                        return Result<Domain.FeedbackReplyTemplate>.Failure("Config not found!!");
                    }

                    return Result<Domain.FeedbackReplyTemplate>.Success(result);
                }
            }
        }
    }
}
