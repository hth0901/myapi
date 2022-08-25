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
using Microsoft.EntityFrameworkCore;

namespace Application.DichVu
{
    public class DanhSachDichVu
    {
        public class Query : IRequest<Result<List<Service>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Service>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<Service>>> Handle(Query request, CancellationToken cancellationToken)
            {

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    //var result = await _context.Service.ToListAsync<Service>();
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@PID", null);
                    var result = await connection.QueryAsync<Service>("SP_SERVICE_DANHSACH", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

                    var lstService = result.ToList();

                    var lstImage = await connection.QueryAsync<Image>(new CommandDefinition("SP_DICHVU_DANHSACH_IMAGE", parameters: null, commandType: System.Data.CommandType.StoredProcedure));

                    foreach(Service sv in lstService)
                    {
                        sv.ListImage = new List<string>();
                        foreach(Image img in lstImage)
                        {
                            if (img.ServiceID == sv.ID)
                            {
                                sv.ListImage.Add(img.Url);
                            }
                        }
                    }
                    return Result<List<Service>>.Success(lstService);
                }

            }
        }
    }
}
