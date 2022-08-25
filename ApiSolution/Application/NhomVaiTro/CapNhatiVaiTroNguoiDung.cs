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

namespace Application.NhomVaiTro
{
    public class CapNhatiVaiTroNguoiDung
    {
        public class Command : IRequest<Result<int>>
        {
            public int roleid { get; set; }
            public string username { get; set; }
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
                var current = await _context.MyUserRoles.FirstOrDefaultAsync(e => e.UserName == request.username);
                if (current != null)
                {
                    current.RoleId = request.roleid;
                    var affectRow = await _context.SaveChangesAsync();

                    return Result<int>.Success(affectRow);

                }
                else
                {
                    MyUserRoles mRole = new MyUserRoles { RoleId = request.roleid, UserName = request.username };
                    _context.MyUserRoles.Add(mRole);
                    int aRow = await _context.SaveChangesAsync();
                    return Result<int>.Success(aRow);
                }
            }
        }
    }
}
