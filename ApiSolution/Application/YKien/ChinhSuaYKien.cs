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

namespace Application.YKien
{
    public class ChinhSuaYKien
    {
        public class Command : IRequest<Result<int>>
        {
            public FeedBack YKien { get; set; }

        }
        public class Handler : IRequestHandler<Command, Result<int>>
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
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                //_context.Activities.Add(request.Activity);
                //var ac = await _context.Activities.FindAsync(request.Activity.Id);
                //if (ac == null) return null;
                //_mapper.Map(request.Activity, ac);

                //ac.Title = request.Activity.Title ?? ac.Title;
                //var result = await _context.SaveChangesAsync() > 0;
                //if (!result)
                //    return Result<Unit>.Failure("Failed to update");

                //return Result<Unit>.Success(Unit.Value);
                string spName = "SP_EDIT_FEEDBACK";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.YKien.ID);
                parameters.Add("@PTITLE", request.YKien.Title);
                parameters.Add("@PFULLNAME", request.YKien.FullName);
                parameters.Add("@PEMAIL", request.YKien.Email);
                parameters.Add("@PCONTENT", request.YKien.Content);
                parameters.Add("@PISREPLY", request.YKien.IsReply);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Edit Place not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
