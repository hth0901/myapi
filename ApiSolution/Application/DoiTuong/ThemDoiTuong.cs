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


namespace Application.DoiTuong
{
    public class ThemDoiTuong
    {
        public class Command : IRequest<Result<int>>
        {
            public CustomerType DoiTuong { get; set; }
        }
        public class CommandValidator : AbstractValidator<CustomerType>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty().WithMessage("Tên đối tượng không được rỗng");
                RuleFor(x => x.Note).NotEmpty().WithMessage(" Nội dung áp dụng không được rỗng");
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
                string spName = "SP_ADD_DOITUONG";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PNAME", request.DoiTuong.Name);
                parameters.Add("@PNOTE", request.DoiTuong.Note);
                parameters.Add("@PCREATEDBYID", 1);
                parameters.Add("@PCREATEDTIME", DateTime.Now);
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
