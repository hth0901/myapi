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

namespace Application.Anh
{
     public class ThemAnh
    {
        public class Command : IRequest<Result<Image>>
        {
            public Image image { get; set; }
        }



        public class CommandValidator : AbstractValidator<Image>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Url).NotEmpty().WithMessage("title không được rỗng");
            }
        }

        public class Handler : IRequestHandler<Command, Result<Image>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<Image>> Handle(Command request, CancellationToken cancellationToken)
            {
             
                string spName = "SP_ADD_IMG";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PURL", request.image.Url);               
                parameters.Add("@PCREATEDTIME", request.image.CreatedTime);
                parameters.Add("@PCREATEDBYID", request.image.CreatedByID);
                parameters.Add("@PISAVATAR", request.image.IsAvatar);
                parameters.Add("@PPLACEID", request.image.PlaceID);
                parameters.Add("@PEVENTID", request.image.EventID);
                parameters.Add("@PDAINOIID", request.image.DaiNoiID);




                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<Image>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<Image>.Success(result);
                }
            }
        }
    }
}
