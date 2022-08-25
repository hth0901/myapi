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

namespace Application.MailConfig
{
    public class ThongTin
    {
        public class Query : IRequest<Result<Domain.EmailConfig>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<Domain.EmailConfig>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<EmailConfig>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.EmailConfig.FirstOrDefaultAsync<Domain.EmailConfig>();
                if (result == null)
                {
                    return Result<Domain.EmailConfig>.Failure("Không lấy được thông tin email");
                }
                return Result<Domain.EmailConfig>.Success(result);
            }
        }
    }
}
