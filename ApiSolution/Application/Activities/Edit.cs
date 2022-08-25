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

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //_context.Activities.Add(request.Activity);
                var ac = await _context.Activities.FindAsync(request.Activity.Id);
                if (ac == null) return null;
                _mapper.Map(request.Activity, ac);

                //ac.Title = request.Activity.Title ?? ac.Title;
                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                    return Result<Unit>.Failure("Failed to update");

                return Result<Unit>.Success(Unit.Value);
                //string spName = "SP_ACTIVITY_INSERT";
                //DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@PTITLE", request.Activity.Title);
                //parameters.Add("@PCONTENT", request.Activity.Content);

                //using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                //{
                //    connection.Open();
                //    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                //    return affectRow;
                //}
            }
        }
    }
}
