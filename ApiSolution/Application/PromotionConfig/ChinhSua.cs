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
using Domain.ResponseEntity;
using Domain.RequestEntity;

namespace Application.PromotionConfig
{
    public class ChinhSua
    {
        public class Command : IRequest<Result<CommonResponse>>
        {
            public PromotionUpdateRequest Entity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<CommonResponse>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<CommonResponse>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_PROMOTION_CONFIG_UPDATE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Entity.ID);
                parameters.Add("@PNAME", request.Entity.Name);
                parameters.Add("@PRATE", request.Entity.Rate);
                parameters.Add("@PFromDate", request.Entity.FromDate);
                parameters.Add("@PExtendDate", request.Entity.ExtendDate);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<CommonResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<CommonResponse>.Success(result);
                }
            }
        }
    }
}
