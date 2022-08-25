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

namespace Application.PhanQuyen
{
    public class TruyVanPhanQuyenCuaNguoiDung
    {
        public class Query : IRequest<Result<MyUserRoles>>
        {
            public string username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MyUserRoles>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<MyUserRoles>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.MyUserRoles.FirstOrDefaultAsync(e => e.UserName == request.username);

                return Result<MyUserRoles>.Success(result);
            }
        }
    }
}
