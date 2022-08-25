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

namespace Application.NhomVaiTro
{
    public class ThemMoiVaiTroNguoiDung
    {
        public class Command :IRequest<Result<int>>
        {
            public MyUserRoles Entity { get; set; }
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
                _context.MyUserRoles.Add(request.Entity);
                int rowAffect = await _context.SaveChangesAsync();
                if (rowAffect <= 0)
                {
                    return Result<int>.Failure("Create Fail");
                }
                return Result<int>.Success(rowAffect);
            }
        }
    }
}
