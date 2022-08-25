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
using System.Security.Cryptography;


namespace Application.NguoiDung
{
    public class ThemNguoiDung
    {
        public class Command : IRequest<Result<int>>
        {
            public Employee _nguoiDung { get; set; }
        }



        public class CommandValidator : AbstractValidator<Employee>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserName).NotEmpty().WithMessage("Tên đăng nhập không được rỗng");
                RuleFor(x => x.PassWord).NotEmpty().WithMessage("Mật khẩu không được rỗng");
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

                string spName = "SP_ADD_EMPLOYEE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PFULLNAME", request._nguoiDung.FullName);
                parameters.Add("@PDESCRIPTION", request._nguoiDung.Description);
                parameters.Add("@PROLEID", request._nguoiDung.RoleID);
                parameters.Add("@PCREATEDID", 1);
                parameters.Add("@PCREATEDTIME", DateTime.Now);
                parameters.Add("@PUSERNAME", request._nguoiDung.UserName);
                string hash = BitConverter.ToString(MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(request._nguoiDung.PassWord))).Replace("-", "");
                parameters.Add("@PPASSWORD", hash);

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
