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

namespace Application.LoaiVe
{
    public class ThemLoaiVe
    {
        public class Command : IRequest<Result<Domain.TicketType>>
        {
            public Domain.TicketType LoaiVe { get; set; }
        }
        public class CommandValidator : AbstractValidator<Domain.TicketType>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty().WithMessage("Tên loại vé không được rỗng");
                RuleFor(x => x.Is_VeTuyen).NotEmpty().WithMessage(" Là vé tuyến phải không, không được rỗng");
            }
        }
        public class Handler : IRequestHandler<Command, Result<Domain.TicketType>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<Domain.TicketType>> Handle(Command request, CancellationToken cancellationToken)
            {
                //_context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;
                string spName = "SP_ADD_LOAIVE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PNAME", request.LoaiVe.Name);
                parameters.Add("@PCONTENT", request.LoaiVe.Content);
                parameters.Add("@PCREATEDBYID", 1);
                parameters.Add("@PCREATEDTIME", DateTime.Now);
                //parameters.Add("@PVETUYEN", request.LoaiVe.Is_VeTuyen);
                //parameters.Add("@PLISTPLACE", request.LoaiVe.ListPlaceID);
                //parameters.Add("@PLISTEVENT", request.LoaiVe.ListEventID);
                parameters.Add("@PACTIVE", request.LoaiVe.Active);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    Domain.TicketType result  = await connection.QueryFirstAsync<Domain.TicketType>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    //var result = affectRow > 0;
                    //if (!result)
                    //    return Result<int>.Failure("Create Activity not success");
                    return Result<Domain.TicketType>.Success(result);
                }
            }
        }
    }
}
