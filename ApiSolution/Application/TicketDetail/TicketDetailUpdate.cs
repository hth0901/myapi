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
using Newtonsoft.Json;

namespace Application.TicketDetail
{
    public class TicketDetailUpdate
    {
        public class Command : IRequest<Result<Domain.TicketDetail>>
        {
            public int id { get; set; }
            public string values { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Domain.TicketDetail>>
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
            public async Task<Result<Domain.TicketDetail>> Handle(Command request, CancellationToken cancellationToken)
            {
                var item = _context.TicketDetail.FirstOrDefault(o => o.ID == request.id);
                JsonConvert.PopulateObject(request.values, item);

                var result = await _context.SaveChangesAsync();
                if (result <= 0)
                {
                    return Result<Domain.TicketDetail>.Failure("update failed!!");
                }
                return Result<Domain.TicketDetail>.Success(item);
            }
        }
    }
}
