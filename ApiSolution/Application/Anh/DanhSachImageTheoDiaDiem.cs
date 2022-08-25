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

namespace Application.Anh
{
    public class DanhSachImageTheoDiaDiem
    {
        public class Query : IRequest<Result<List<Image>>>
        {
            public int placeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Image>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Image>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_IMAGE_DANHSACH_THEO_DIADIEM";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.placeId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Image>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Image>>.Success(result.ToList());
                }
            }
        }
    }
    public class DanhSachImageTheoSuKien
    {
        public class Query : IRequest<Result<List<Image>>>
        {
            public int eventId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Image>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Image>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_IMAGE_DANHSACH_THEO_SUKIEN";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.eventId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Image>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Image>>.Success(result.ToList());
                }
            }
        }
    }
    public class DanhSachImageTheoDaiNoi
    {
        public class Query : IRequest<Result<List<Image>>>
        {
            public int dainoiId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Image>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<Image>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_IMAGE_DANHSACH_THEO_DAINOI";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.dainoiId);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Image>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Image>>.Success(result.ToList());
                }
            }
        }
    }
}
