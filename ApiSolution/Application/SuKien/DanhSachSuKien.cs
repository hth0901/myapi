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
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.ResponseEntity;

namespace Application.SuKien
{
    public class DanhSachSuKien
    {
        public class Query : IRequest<Result<List<Event>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Event>>>
        {
            private readonly IConfiguration _configuration;
            private readonly DataContext _context;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _configuration = configuration;
                _context = context;
            }
            public async Task<Result<List<Event>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_SUKIEN_DANHSACH_1";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", null);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    //var result = await connection.QueryAsync<Activity>(spName);
                    var result = await connection.QueryAsync<Event>(new CommandDefinition(spName, parameters: parameters, commandType: System.Data.CommandType.StoredProcedure, cancellationToken: cancellationToken));

                    var lstImage = await connection.QueryAsync<Image>(new CommandDefinition("SP_SUKIEN_DANHSACH_IMAGE", parameters: null, commandType: System.Data.CommandType.StoredProcedure));

                    foreach (Event el in result)
                    {
                        el.ListImage = new List<string>();
                        foreach (Image subEl in lstImage)
                        {
                            if (subEl.EventID == el.ID)
                            {
                                el.ListImage.Add(subEl.Url);
                            }
                        }
                    }

                    return Result<List<Event>>.Success(result.ToList());
                }
            }
        }
    }
}
