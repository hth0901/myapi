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

namespace Application.DiaDiemDaiNoi
{
    public class ThemDaiNoi
    {
        public class Command : IRequest<Result<DaiNoi>>
        {
            public DaiNoi dainoi { get; set; }
        }



        public class CommandValidator : AbstractValidator<DaiNoi>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().WithMessage("tiêu đề không được rỗng");
                RuleFor(x => x.Content).NotEmpty().WithMessage("nội dung, không được rỗng");
                RuleFor(x => x.Longitude).NotEmpty().WithMessage("kinh độ không được rỗng");
                RuleFor(x => x.Latitude).NotEmpty().WithMessage("Vĩ độ không được rỗng");


            }
        }

        public class Handler : IRequestHandler<Command, Result<DaiNoi>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<DaiNoi>> Handle(Command request, CancellationToken cancellationToken)
            {
                //_context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;
                string spName = "SP_ADD_DAINOI";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTITLE", request.dainoi.Title);
                parameters.Add("@PTITLEN", request.dainoi.TitleEn);
                parameters.Add("@PCONTENT", request.dainoi.Content);
                parameters.Add("@PCONTENTEN", request.dainoi.ContentEn);
                parameters.Add("@PSUBTITLE", request.dainoi.SubTitle);
                parameters.Add("@PSUBTITLEEN", request.dainoi.SubTitleEn);
                parameters.Add("@PCREATEDTIME", request.dainoi.CreatedTime);
                parameters.Add("@PCREATEDID", request.dainoi.CreatedByID);
                parameters.Add("@PIMAGEID", request.dainoi.ImageID);
                parameters.Add("@PLATTITUDE", request.dainoi.Latitude);
                parameters.Add("@PLONGTIDUTE", request.dainoi.Longitude);
                parameters.Add("@PACTIVE", request.dainoi.Active);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                   
                    connection.Open();
                    var result = await connection.QueryFirstAsync<DaiNoi>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    return Result<DaiNoi>.Success(result);
                }
            }
        }
    }
}
