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
using Persistence;
using FluentValidation;
using Application.Core;
using Domain.RequestEntity;
namespace Application.FeedbackReplyTemplate
{
    public class KichHoat
    {
        public class Command : IRequest<Result<int>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_FEEDBACK_REPLY_TEMPLATE_ACTIVE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    //var result = affectRow > 0;
                    //if (!result)
                    //    return Result<int>.Failure("Cập nhật không thành công");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
