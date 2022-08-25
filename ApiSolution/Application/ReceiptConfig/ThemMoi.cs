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

namespace Application.ReceiptConfig
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<int>>
        {
            public CreateReceiptConfigRequest ReceiptConfig { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_RECEIPTCONFIG_INSERT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTKPHATHANH", request.ReceiptConfig.TaiKhoanPhatHanh);
                parameters.Add("@PMKPHATHANH", request.ReceiptConfig.MatKhauPhatHanh);
                parameters.Add("@PTKDICHVU", request.ReceiptConfig.TaiKhoanDichVu);
                parameters.Add("@PMKDICHVU", request.ReceiptConfig.MatKhauDichVu);
                parameters.Add("@PPUBLISHSVURL", request.ReceiptConfig.PublishServiceUrl);
                parameters.Add("@PPORTALSVURL", request.ReceiptConfig.PortalServiceUrl);
                parameters.Add("@PBUSINESSSVURL", request.ReceiptConfig.BusinessServiceUrl);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Thêm mới không thành công");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
