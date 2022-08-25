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

namespace Application.DiaDiemDaiNoi
{
    public class SuaDaiNoi
    {
        public class Command : IRequest<Result<int>>
        {
            public DaiNoi dainoi { get; set; }
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
                string spName = "SP_EDIT_DAINOI";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.dainoi.ID);
                parameters.Add("@PTITLE", request.dainoi.Title);
                parameters.Add("@PTITLEEN", request.dainoi.TitleEn);
                parameters.Add("@PCONTENT", request.dainoi.Content);
                parameters.Add("@PCONTENTEN", request.dainoi.ContentEn);
                parameters.Add("@PSUBTITLE", request.dainoi.SubTitle);
                parameters.Add("@PSUBTITLEEN", request.dainoi.SubTitleEn);            
                parameters.Add("@PUPDATETIME", request.dainoi.UpdateTime);
                parameters.Add("@PUPDATEID", request.dainoi.UpdateByID);
                parameters.Add("@PIMAGEID", request.dainoi.ImageID);
                parameters.Add("@PLATTITUDE", request.dainoi.Latitude);
                parameters.Add("@PLONGTIDUTE", request.dainoi.Longitude);
                parameters.Add("@PACTIVE", request.dainoi.Active);


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
