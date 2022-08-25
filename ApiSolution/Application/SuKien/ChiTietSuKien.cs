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

namespace Application.SuKien
{
    public class ChiTietSuKien
    {
        public class Query : IRequest<Result<Event>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Event>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                //string spName = $"select * from Activities where Id='{request.Id}'";
                string spName = "SP_GET_EVENTBYID";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.Id);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryFirstOrDefaultAsync<Event>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    if (result == null)
                    {
                        return Result<Event>.Failure("Không có dữ liệu!");
                    }

                    var lstImage = await connection.QueryAsync<Image>(new CommandDefinition("SP_SUKIEN_DANHSACH_IMAGE", parameters: null, commandType: System.Data.CommandType.StoredProcedure));

                    result.ListImage = new List<string>();

                    foreach (Image img in lstImage)
                    {
                        if (img.EventID == result.ID)
                        {
                            result.ListImage.Add(img.Url);
                        }
                    }

                    return Result<Event>.Success(result);
                }
            }
        }
    }
}
