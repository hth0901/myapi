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

namespace Application.Order
{
    public class OrderInsert
    {
        public class Command : IRequest<Result<OrderTemp>>
        {
            public OrderRequest OrderRequest { get; set; }
            public string username { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<OrderTemp>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<OrderTemp>> Handle(Command request, CancellationToken cancellationToken)
            {

                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    var transaction = connettion.BeginTransaction();
                    try
                    {
                        string spName = "SP_ORDERTEMP_INSERT";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PORDERID", request.OrderRequest.Order.ID);
                        parameters.Add("@PTOTALPRICE", request.OrderRequest.Order.TotalPrice);
                        parameters.Add("@PFULLNAME", request.OrderRequest.Order.FullName);
                        parameters.Add("@PPHONENUMBER", request.OrderRequest.Order.PhoneNumber);
                        parameters.Add("@PEMAIL", request.OrderRequest.Order.Email);
                        parameters.Add("@PUNIQID", "");
                        parameters.Add("@PUSERNAME", request.username);

                        OrderTemp orderTemp = await connettion.QueryFirstOrDefaultAsync<OrderTemp>(spName, parameters, transaction, commandType: System.Data.CommandType.StoredProcedure);

                        string spName2 = "SP_TICKET_DETAIL_INSERT_V2";
                        foreach(var item in request.OrderRequest.TicketDetails)
                        {
                            DynamicParameters mParams = new DynamicParameters();
                            mParams.Add("@PPLACEID", item.PlaceId);
                            mParams.Add("@PSERVICEID", item.ServiceId);
                            mParams.Add("@PEVENTID", item.EventId);
                            mParams.Add("@PQUANTITY", item.Quantity);
                            mParams.Add("@PCUSTOMERTYPE", item.CustomerType);
                            mParams.Add("@PORDERID", orderTemp.ID);
                            mParams.Add("@PTICKETTYPEID", item.TicketTypeId);
                            mParams.Add("@PUSERNAME", request.username);

                            var affectRow = await connettion.ExecuteAsync(spName2, mParams, transaction, commandType: System.Data.CommandType.StoredProcedure);
                            if (affectRow <= 0)
                            {
                                throw new Exception("sai sai chi do roi");
                            }
                            //throw new Exception("test thoi");
                        }

                        foreach(var item in request.OrderRequest.OrderDetails)
                        {
                            DynamicParameters mParams = new DynamicParameters();
                            mParams.Add("@PORDERID", orderTemp.ID);
                            mParams.Add("@PTICKETTYPEID", item.TicketTypeId);
                            mParams.Add("@PQUANTITY", item.Quantity);
                            mParams.Add("@PCUSTOMERTYPE", item.CustomerType);
                            mParams.Add("@PUNITPRICE", item.UnitPrice);
                            mParams.Add("@PUSERNAME", request.username);

                            var affectRow = await connettion.ExecuteAsync("SP_ORDERDETAIL_CREATE", mParams, transaction, commandType: System.Data.CommandType.StoredProcedure);
                            if (affectRow <= 0)
                            {
                                throw new Exception("sai sai chi do roi");
                            }
                        }

                        foreach(var item in request.OrderRequest.Cart)
                        {
                            DynamicParameters mParams = new DynamicParameters();
                            mParams.Add("@PCARTID", item);
                            var affectRow = await connettion.ExecuteAsync("SP_USERCART_DELETE", mParams, transaction, commandType: System.Data.CommandType.StoredProcedure);
                        }

                        transaction.Commit();
                        //transaction.Rollback();

                        return Result<OrderTemp>.Success(orderTemp);
                    }

                    catch(Exception ex)
                    {
                        transaction.Rollback();
                        return Result<OrderTemp>.Failure(ex.Message);
                    }
                }
            }
        }
    }
}
