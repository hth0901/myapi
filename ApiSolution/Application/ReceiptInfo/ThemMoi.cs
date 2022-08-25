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
using Domain.RequestEntity;

namespace Application.ReceiptInfo
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<string>>
        {
            public CreateReceiptInfoRequest ReceiptInfo { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_RECEIPTINFO_INSERT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PNAME", request.ReceiptInfo.Fullname);
                parameters.Add("@PEMAIL", request.ReceiptInfo.Email);
                parameters.Add("@PPHONENUMBER", request.ReceiptInfo.PhoneNumber);
                parameters.Add("@PTAXNUMBER", request.ReceiptInfo.TaxNumber);
                parameters.Add("@PADDRESS", request.ReceiptInfo.Address);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.ExecuteScalarAsync<string>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    
                    if (string.IsNullOrEmpty(result))
                        return Result<string>.Failure("Create Activity not success");
                    return Result<string>.Success(result);
                }
            }
        }
    }
}
