using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Domain.ResponseEntity;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using AutoMapper;
using Application.Core;
using Microsoft.EntityFrameworkCore;
namespace Application.TicketOrder
{
    public class Detail
    {
        public class Query : IRequest<Result<Domain.TicketOrder>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<Domain.TicketOrder>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<Domain.TicketOrder>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.TicketOrder.FindAsync(request.Id);
                if (result == null)
                {
                    return Result<Domain.TicketOrder>.Failure("Không tìm thấy dữ liệu");
                }

                return Result<Domain.TicketOrder>.Success(result);
            }
        }
    }
}
