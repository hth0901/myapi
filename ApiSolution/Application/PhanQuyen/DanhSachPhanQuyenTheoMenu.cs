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
    public class DanhSachPhanQuyenTheoMenu
    {
        public class Query : IRequest<Result<List<MenuAutho>>>
        {
            public int MenuId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<MenuAutho>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<MenuAutho>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var myJoin = from autho in _context.Authorize
                             join rol in _context.MyRoles
                             on autho.RoleId equals rol.ID
                             where autho.MenuId == request.MenuId
                             select new MenuAutho
                             {
                                 Id = autho.ID,
                                 RoleId = rol.ID,
                                 Name = rol.RoleName,
                                 IsAutho = autho.IsAuthorize,
                                 MenuId = autho.MenuId
                             };
                var result = await myJoin.ToListAsync<MenuAutho>();
                return Result<List<MenuAutho>>.Success(result);
            }
        }
    }
}
