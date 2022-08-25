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

namespace Application.ReceiptInfo
{
    public class ThongTinMacDinh
    {
        public class Query : IRequest<Result<Domain.ReceiptInfo>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<Domain.ReceiptInfo>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<Domain.ReceiptInfo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.ReceiptInfo.FindAsync(1);
                if (result != null)
                {
                    return Result<Domain.ReceiptInfo>.Success(result);
                }

                return Result<Domain.ReceiptInfo>.Failure("Không tìm thấy");
            }
        }
    }
}
