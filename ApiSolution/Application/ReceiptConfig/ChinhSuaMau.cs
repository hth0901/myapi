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
using AutoMapper;
using Application.Core;

namespace Application.ReceiptConfig
{
    public class ChinhSuaMau
    {
        public class Command : IRequest<Result<int>>
        {
            public Domain.ReceiptTemplateConfig UpdateInfo { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IConfiguration configuration, IMapper mapper)
            {
                _context = context;
                _configuration = configuration;
                _mapper = mapper;
            }

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ac = await _context.ReceiptTemplateConfig.FindAsync(request.UpdateInfo.Id);
                if (ac == null) return null;

                _mapper.Map(request.UpdateInfo, ac);
                var arrowAffect = await _context.SaveChangesAsync();
                if (arrowAffect <= 0)
                    return Result<int>.Failure("Cập nhật không thành công");
                return Result<int>.Success(arrowAffect);
            }
        }
    }
}
