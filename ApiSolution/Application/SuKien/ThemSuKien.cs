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

namespace Application.SuKien
{
     public class ThemSuKien
    {
        public class Command : IRequest<Result<Event>>
        {
            public Event addEvent { get; set; }
        }



        public class CommandValidator : AbstractValidator<Event>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().WithMessage("title không được rỗng");
                RuleFor(x => x.Content).NotEmpty().WithMessage("cái dell chi rứa, không được rỗng");
            }
        }

        public class Handler : IRequestHandler<Command, Result<Event>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<Event>> Handle(Command request, CancellationToken cancellationToken)
            {
                //_context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;
                string spName = "SP_ADD_EVENT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTITLE", request.addEvent.Title);
                parameters.Add("@PCONTENT", request.addEvent.Content);
                parameters.Add("@PCREATEDTIME", request.addEvent.CreatedTime);
                parameters.Add("@PCREATEDID", request.addEvent.CreatedByID);
                //parameters.Add("@PUPDATETIME", request.addEvent.UpdateTime);
                //parameters.Add("@PUPDATEID", request.addEvent.UpdateByID);
                //parameters.Add("@PIMAGEID", request.addEvent.ImageID);
                parameters.Add("@PLATTITUDE", request.addEvent.Lattitude);
                parameters.Add("@PLONGTIDUTE", request.addEvent.Longtidute);
                parameters.Add("@PADDRESS", request.addEvent.Address);
                parameters.Add("@POPENDATE", request.addEvent.Open_date);
                parameters.Add("@PNOTE", request.addEvent.Note);
                parameters.Add("@PEVENTTIME", request.addEvent.EventTime);
                parameters.Add("@PISDAILY", request.addEvent.IsDaily);
                parameters.Add("@PACTIVE", request.addEvent.Active);




                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstAsync<Event>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    return Result<Event>.Success(result);
                }
            }
        }
    }
}
