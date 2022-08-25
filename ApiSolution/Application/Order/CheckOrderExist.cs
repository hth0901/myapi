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
using Application.Core;
using Domain.ResponseEntity;

namespace Application.Order
{
    public class TicketCheckIn
    {
        public class Command: IRequest<Result<int>>
        {
            public Guid TicketId { get; set; }
            public string OrderId { get; set; }
            public int PlaceId { get; set; }
            public int Quantity { get; set; }
            public int CustomerType { get; set; }
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
                string spName = "SP_TICKET_WEB_SCAN_CHECKIN";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTICKETID", request.TicketId);
                parameters.Add("@PORDERID", request.OrderId);
                parameters.Add("@PPLACEID", request.PlaceId);
                parameters.Add("@PQUANTITY", request.Quantity);
                parameters.Add("@PCUSTOMERID", request.CustomerType);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);

                    if (affectRow <= 0)
                    {
                        return Result<int>.Failure("Cập nhật thất bại");
                    }

                    return Result<int>.Success(affectRow);
                }
            }
        }
    }

    public class ScanByMachine
    {
        public class Query : IRequest<Result<MachineScanResponse>>
        {
            public string TicketId { get; set; }
            public string OrderId { get; set; }
            public int PlaceId { get; set; }
            public int CustomerType { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MachineScanResponse>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<MachineScanResponse>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_ORDERTEMP_MACHINE_SCAN_V2";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTICKETID", request.TicketId);
                parameters.Add("@PORDERID", request.OrderId);
                parameters.Add("@PPLACEID", request.PlaceId);
                parameters.Add("@PCUSTOMERID", request.CustomerType);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<MachineScanResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<MachineScanResponse>.Success(result);
                }
            }
        }
    }
    public class CheckOrderExist
    {
        public class Query : IRequest<Result<MachineScanResponse>>
        {
            public string TicketId { get; set; }
            public string OrderId { get; set; }
            public int PlaceId { get; set; }
            public int CustomerType { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MachineScanResponse>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<MachineScanResponse>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_ORDERTEMP_CHECKEXIST_V2";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTICKETID", request.TicketId);
                parameters.Add("@PORDERID", request.OrderId);
                parameters.Add("@PPLACEID", request.PlaceId);
                parameters.Add("@PCUSTOMERID", request.CustomerType);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<MachineScanResponse>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    return Result<MachineScanResponse>.Success(result);
                }
            }
        }
    }
}
