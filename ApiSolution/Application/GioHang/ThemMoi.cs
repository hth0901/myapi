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

namespace Application.GioHang
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<int>>
        {
            public CreateCartRequest CartRequest { get; set; }
            public string username { get; set; }
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
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    var transaction = connettion.BeginTransaction();

                    try
                    {
                        string spName = "SP_USERCART_INSERT";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PTICKETTYPEID", request.CartRequest.TicketTypeId);
                        parameters.Add("@PUSERNAME", request.username);

                        var cartId = await connettion.ExecuteScalarAsync(spName, parameters, transaction, commandType: System.Data.CommandType.StoredProcedure);

                        if (cartId == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        foreach(var item in request.CartRequest.PriceDetail)
                        {
                            if (item.CustommerTypeId == 1)
                            {
                                item.Quantity = 1;
                            }
                            DynamicParameters mParams = new DynamicParameters();
                            mParams.Add("@PCARTID", cartId);
                            mParams.Add("@PTICKETTYPEID", item.TicketTypeId);
                            mParams.Add("@PCUSTOMERTYPEID", item.CustommerTypeId);
                            mParams.Add("@PQUANTITY", item.Quantity);

                            var affectRow = await connettion.ExecuteAsync("SP_USERCART_DETAIL_INSERT", mParams, transaction, commandType: System.Data.CommandType.StoredProcedure);

                            if (affectRow <= 0)
                            {
                                throw new Exception("Thêm mới không thành công");
                            }
                        }

                        await transaction.CommitAsync();

                        return Result<int>.Success((int)cartId);
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        return Result<int>.Failure(ex.Message);
                    }
                }
            }
        }
    }
}
