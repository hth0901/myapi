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

namespace Application.Activities
{
    public class AddPlace
    {
        public class Command : IRequest<Result<int>>
        {
            public Place addPlace { get; set; }
        }

        

        public class CommandValidator : AbstractValidator<Place>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().WithMessage("title không được rỗng");
                RuleFor(x => x.Content).NotEmpty().WithMessage("cái dell chi rứa, không được rỗng");
            }
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
                //_context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;
                string spName = "SP_ADD_PLACE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTITLE", request.addPlace.Title);
                parameters.Add("@PCONTENT", request.addPlace.Content);
                parameters.Add("@PCREATEDTIME", request.addPlace.CreatedTime);
                parameters.Add("@PCREATEDID", request.addPlace.CreatedByID);
                parameters.Add("@PUPDATETIME", request.addPlace.UpdateTime);
                parameters.Add("@PUPDATEID", request.addPlace.UpdateByID);
                parameters.Add("@PIMAGEID", request.addPlace.ImageID);
                parameters.Add("@PLATTITUDE", request.addPlace.Lattitude);
                parameters.Add("@PLONGTIDUTE", request.addPlace.Longtidute);
                parameters.Add("@PADRESS", request.addPlace.Address);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Create Activity not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
