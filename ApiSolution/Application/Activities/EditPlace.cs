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
    public class EditPlace
    {
        public class Command : IRequest<Result<int>>
        {
            public Place place { get; set; }

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
                string spName = "SP_EDIT_PLACE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.place.ID);
                parameters.Add("@PTITLE", request.place.Title);
                parameters.Add("@PCONTENT", request.place.Content);
                parameters.Add("@PCREATEDTIME", request.place.CreatedTime);
                parameters.Add("@PCREATEDID", request.place.CreatedByID);
                parameters.Add("@PUPDATETIME", request.place.UpdateTime);
                parameters.Add("@PUPDATEID", request.place.UpdateByID);
                parameters.Add("@PIMAGEID", request.place.ImageID);
                parameters.Add("@PLATTITUDE", request.place.Lattitude);
                parameters.Add("@PLONGTIDUTE", request.place.Longtidute);
                parameters.Add("@PADRESS", request.place.Address);

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
