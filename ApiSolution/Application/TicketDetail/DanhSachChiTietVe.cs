using Domain;
using Dapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;

namespace Application.TicketDetail
{
    public class TicketId
    {
        public class Query : IRequest<Result<Guid>>
        {
            public string OrderId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Guid>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Guid>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_ID_QUERY";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.OrderId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryFirstOrDefaultAsync<Guid>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<Guid>.Success(result);
                }
            }
        }
    }

    public class ListTicketDetail
    {
        public class Query : IRequest<Result<List<Domain.TicketPlaceDetail>>>
        {
            public string TicketId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<Domain.TicketPlaceDetail>>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Domain.TicketPlaceDetail>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid g = new Guid();
                Guid.TryParse(request.TicketId, out g);
                string spName = "SP_TICKET_DETAIL_QUERY_V2";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTICKETID", g);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Domain.TicketPlaceDetail>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Domain.TicketPlaceDetail>>.Success(result.ToList());
                }
            }
        }
    }

    //public class DanhSachChiTietVeTheoDoiTuong
    //{
    //    public class Query : IRequest
    //}

    public class DanhSachChiTietVe
    {
        public class Query : IRequest<Result<List<Domain.TicketPlaceDetail>>> {
            public string OrderId { get; set; } 
        }

        public class Handler : IRequestHandler<Query, Result<List<Domain.TicketPlaceDetail>>>
        {
            private readonly IConfiguration _configuration;
            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Domain.TicketPlaceDetail>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_TICKET_DETAIL_QUERY";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request.OrderId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Domain.TicketPlaceDetail>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Domain.TicketPlaceDetail>>.Success(result.ToList());
                }
            }
        }
    }
}
