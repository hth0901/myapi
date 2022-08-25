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
namespace Application.DiaDiemDaiNoi
{
    public class DanhSachDaiNoi
    {
        public class Query : IRequest<Result<List<DaiNoi>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<DaiNoi>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<DaiNoi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_DAINOI_DANHSACH";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<DaiNoi>(new CommandDefinition(spName, parameters, commandType: System.Data.CommandType.StoredProcedure));
                    var lstImage = await connection.QueryAsync<Image>(new CommandDefinition("SP_DAINOI_DANHSACH_IMAGE", parameters: null, commandType: System.Data.CommandType.StoredProcedure));

                    foreach(DaiNoi el in result)
                    {
                        el.ListImage = new List<string>();
                        foreach(Image subEl in lstImage)
                        {
                            if (subEl.DaiNoiID == el.ID)
                            {
                                el.ListImage.Add(subEl.Url);
                            }
                        }
                    }

                    return Result<List<DaiNoi>>.Success(result.ToList());
                }
            }
        }
    }

    public class DanhSachAnhDaiNoi
    {
        public class Query : IRequest<Result<List<Image>>>
        {

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
                string spName = "SP_DAINOI_DANHSACH_IMAGE";
                //DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Place>(spName);
                    var result = await connection.QueryAsync<Image>(new CommandDefinition(spName, parameters: null, commandType: System.Data.CommandType.StoredProcedure));
                    return Result<List<Image>>.Success(result.ToList());
                }
            }
        }
    }
}
