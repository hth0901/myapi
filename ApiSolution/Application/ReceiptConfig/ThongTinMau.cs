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
    public class ThongTinMau
    {
        public class Query : IRequest<Result<Domain.ReceiptTemplateConfig>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<Domain.ReceiptTemplateConfig>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<ReceiptTemplateConfig>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.ReceiptTemplateConfig.FindAsync(1);
                if (result != null)
                {
                    return Result<Domain.ReceiptTemplateConfig>.Success(result);
                }

                return Result<Domain.ReceiptTemplateConfig>.Failure("Không tìm thấy");
            }
        }
    }
}
