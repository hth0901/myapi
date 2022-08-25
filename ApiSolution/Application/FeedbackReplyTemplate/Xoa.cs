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

namespace Application.FeedbackReplyTemplate
{
    public class Xoa
    {
        public class Command : IRequest<Result<int>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                var entity = await _context.FeedbackReplyTemplate.FindAsync(request.Id);

                _context.Remove(entity);
                var result = await _context.SaveChangesAsync();

                return Result<int>.Success(result);
            }
        }
    }
}
