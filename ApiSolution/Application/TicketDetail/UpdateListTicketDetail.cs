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
using AutoMapper;
using Application.Core;
using Newtonsoft.Json;
using Domain.RequestEntity;

namespace Application.TicketDetail
{
    public class UpdateListTicketDetail
    {
        public class Command : IRequest<Result<int>>
        {
            public EditTicketDetailRequest UpdateRequest { get; set; }
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
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    var transaction = connection.BeginTransaction();
                    try
                    {
                        string spName = "SP_TICKET_DETAIL_EDIT_QUANTITY";
                        foreach(var item in request.UpdateRequest.TicketDetails)
                        {
                            DynamicParameters mParams = new DynamicParameters();
                            mParams.Add("@PID", item.Id);
                            mParams.Add("@PQUANTITY", item.Quantity);
                            mParams.Add("@PUSERNAME", request.username);
                            var affectRow = await connection.ExecuteAsync(spName, mParams, transaction, commandType: System.Data.CommandType.StoredProcedure);
                            if (affectRow <= 0)
                            {
                                throw new Exception("Có gì đó sai sai rồi");
                            }

                        }

                        transaction.Commit();
                        return Result<int>.Success(request.UpdateRequest.TicketDetails.Count);
                    }
                    catch(Exception ex)
                    {
                        transaction.Rollback();
                        return Result<int>.Failure(ex.Message);
                    }
                }
            }
        }
    }
}
