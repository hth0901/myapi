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

namespace Application.TicketType
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<int>>
        {
            public TicketTypeInsertRequest Request { get; set; }
            public string username { get; set; }
        }

        public class CommandValidator : AbstractValidator<TicketTypeInsertRequest>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ListPlaceId).NotEmpty().WithMessage("Hãy chọn điểm đến");
            }
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
                        string spname = "SP_VETHAMQUAN_CREATE";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PNAME", request.Request.Name);
                        parameters.Add("@PCONTENT", request.Request.Content);
                        parameters.Add("@PACTIVE", request.Request.Active);
                        parameters.Add("@PTYPEVALUE", request.Request.TypeValue);
                        parameters.Add("@PDATETOEXPIRED", request.Request.DateToExpired);

                        var insertId = await connettion.ExecuteScalarAsync<int>(spname, parameters, transaction, commandType: System.Data.CommandType.StoredProcedure);
                        if (insertId <= 0)
                        {
                            throw new Exception("có gì đó sai sai rồi");
                        }

                        string spName2 = "SP_VETHAMQUAN_CHITIET_CREATE";
                        string[] arrPlaceid = request.Request.ListPlaceId.Split(',');
                        foreach(string plId in arrPlaceid)
                        {
                            DynamicParameters mParams = new DynamicParameters();
                            mParams.Add("@PPLACEID", plId.Trim());
                            mParams.Add("@PTYPEID", insertId);

                            var rowcount = await connettion.ExecuteAsync(spName2, mParams, transaction, commandType: System.Data.CommandType.StoredProcedure);
                            if (rowcount <= 0)
                            {
                                throw new Exception("có gì đó sai sai rồi");
                            }
                        }

                        transaction.Commit();

                        return Result<int>.Success(insertId);
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return Result<int>.Failure(ex.Message);
                    }
                }
            }
        }
    }
}
