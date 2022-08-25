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
    public class DanhSach
    {
        public class Query : IRequest<Result<List<Domain.ReceiptInfo>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<List<Domain.ReceiptInfo>>> {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<Domain.ReceiptInfo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.ReceiptInfo.Where(e => e.CusCode != "KH0000000001").ToListAsync<Domain.ReceiptInfo>();
                result.Add(new Domain.ReceiptInfo { Id = 0, FullName = "Thêm mới", CusCode = "" });
                return Result<List<Domain.ReceiptInfo>>.Success(result);
            }
        }
    }
}
