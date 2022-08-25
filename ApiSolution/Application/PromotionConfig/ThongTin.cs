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

namespace Application.PromotionConfig
{
    public class ThongTin
    {
        public class Query : IRequest<Result<Domain.PromotionConfig>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<Domain.PromotionConfig>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<Domain.PromotionConfig>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_PROMOTION_GET_CURRENT";

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<Domain.PromotionConfig>(spName, commandType: System.Data.CommandType.StoredProcedure, param: null);

                    //if (result == null)
                    //{
                    //    return Result<Domain.PromotionConfig>.Failure("Config not found!!");
                    //}

                    return Result<Domain.PromotionConfig>.Success(result);
                }
            }
        }
    }
}
