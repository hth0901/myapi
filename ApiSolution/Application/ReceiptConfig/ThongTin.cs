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

namespace Application.ReceiptConfig
{
    public class ThongTin
    {
        public class Query : IRequest<Result<Domain.ReceiptConfig>> { }

        public class Handler : IRequestHandler<Query, Result<Domain.ReceiptConfig>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<Domain.ReceiptConfig>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.ReceiptConfig.FirstOrDefaultAsync<Domain.ReceiptConfig>();

                if (result == null)
                {
                    return Result<Domain.ReceiptConfig>.Failure("Không lấy được thông tin cấu hình biên lai");
                }
                return Result<Domain.ReceiptConfig>.Success(result);
            }
        }
    }
}
