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
using Microsoft.EntityFrameworkCore;

namespace Application.PhanQuyen
{
    public class DanhSachVaiTro
    {
        public class Query : IRequest<Result<List<MyRoles>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<MyRoles>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<MyRoles>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await  _context.MyRoles.ToListAsync<MyRoles>();
                
                

                return Result<List<MyRoles>>.Success(result);
            }
        }
    }
}
