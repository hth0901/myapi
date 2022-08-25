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
    public class ChiTiet
    {
        public class Query : IRequest<Result<Domain.TicketType>>
        {
            public int ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Domain.TicketType>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Domain.TicketType>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        string spname = "SP_VETHAMQUAN_DETAIL";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PID", request.ID);

                        var resultEntity = await connettion.QueryFirstOrDefaultAsync<Domain.TicketType>(spname, parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (resultEntity == null)
                        {
                            throw new Exception("Không tìm thấy dữ liệu");
                        }

                        return Result<Domain.TicketType>.Success(resultEntity);
                    }

                    catch (Exception ex)
                    {
                        return Result<Domain.TicketType>.Failure(ex.Message);
                    }
                }
            }
        }
    }
}
