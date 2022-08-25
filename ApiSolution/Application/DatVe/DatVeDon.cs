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

namespace Application.DatVe
{
    public class DatVeDon
    {
        public class Command : IRequest<Result<int>>
        {
            public CartDetail addCartDetail { get; set; }
        }
        public class CommandValidator : AbstractValidator<CartDetail>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CustomerTypeID).NotEmpty().WithMessage("Tên khách hàng không được rỗng");
                RuleFor(x => x.TicketTypeID).NotEmpty().WithMessage("Loại vé không được rỗng");
                RuleFor(x => x.TicketPriceID).NotEmpty().WithMessage("Giá loại vé không được rỗng");
                RuleFor(x => x.Count).NotEmpty().WithMessage("Tổng giá vé không được rỗng");
                RuleFor(x => x.CartID).NotEmpty().WithMessage("Mã giỏ hàng không được rỗng");

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
                string spName = "SP_ADD_CARTDETAIL";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PCUSTYPEID", request.addCartDetail.CustomerTypeID);
                parameters.Add("@PTICTYPEID", request.addCartDetail.TicketTypeID);
                parameters.Add("@PTICPRICEID", request.addCartDetail.TicketPriceID);
                parameters.Add("@PCOUNT", request.addCartDetail.Count);
                parameters.Add("@PCARTID", request.addCartDetail.CartID);
                parameters.Add("@PCREATETIME", request.addCartDetail.CreatedTime);
                parameters.Add("@PUPDATETIME", request.addCartDetail.UpdateTime);
                
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
