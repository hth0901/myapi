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
   public class DanhSachChiTietVe2
    {
        public class Query : IRequest<Result<List<TicketPlaceDetail>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<TicketPlaceDetail>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<TicketPlaceDetail>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_LIST_DETAIL_QUERY";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<TicketPlaceDetail>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<TicketPlaceDetail>>.Success(result.ToList());
                }
            }
        }
    }
    public class DanhSachChiTietVeTheoNgay
    {
        public class Query : IRequest<Result<List<TicketPlaceDetail>>>
        {
            public string _dateString { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<TicketPlaceDetail>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<TicketPlaceDetail>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_LIST_DETAIL_QUERY_BYDATE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PORDERID", request._dateString);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<TicketPlaceDetail>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<TicketPlaceDetail>>.Success(result.ToList());
                }
            }
        }

    }
}
