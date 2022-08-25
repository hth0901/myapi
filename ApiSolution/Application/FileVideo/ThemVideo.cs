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

namespace Application.FileVideo
{
    public class ThemVideo
    {
        public class Command : IRequest<Result<Video>>
        {
            public Video video { get; set; }
        }



        public class CommandValidator : AbstractValidator<Video>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Url).NotEmpty().WithMessage("title không được rỗng");
            }
        }

        public class Handler : IRequestHandler<Command, Result<Video>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<Video>> Handle(Command request, CancellationToken cancellationToken)
            {

                string spName = "SP_ADD_VIDEO";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PURL", request.video.Url);
                parameters.Add("@PCREATEDTIME", request.video.CreatedTime);
                parameters.Add("@PCREATEDBYID", request.video.CreatedByID);
                parameters.Add("@PPLACEID", request.video.PlaceID);
                parameters.Add("@PEVENTID", request.video.EventID);
                parameters.Add("@PDAINOIID", request.video.DaiNoiID);





                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<Video>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<Video>.Success(result);
                }
            }
        }
    }
}
