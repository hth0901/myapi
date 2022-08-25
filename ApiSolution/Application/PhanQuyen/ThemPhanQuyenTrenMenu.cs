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
using FluentValidation;
using Application.Core;
using Microsoft.EntityFrameworkCore;

namespace Application.PhanQuyen
{
    public class ThemPhanQuyenTrenMenu
    {
        public class Command : IRequest<Result<int>>
        {
            public Authorize Entity { get; set; }
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
                var query = from p in _context.Authorize
                            where (p.MenuId == request.Entity.MenuId && p.RoleId == request.Entity.RoleId)
                            select p;
                var queryResult = await query.ToListAsync();
                if (queryResult.Count > 0)
                {
                    return Result<int>.Failure("Đã tồn tại!!");
                }
                _context.Authorize.Add(request.Entity);
                var result = await _context.SaveChangesAsync();
                return Result<int>.Success(result);
            }
        }
    }
}
