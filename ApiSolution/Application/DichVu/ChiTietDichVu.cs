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
    public class ChiTietDichVu
    {
        public class Query : IRequest<Result<Service>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Service>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<Service>> Handle(Query request, CancellationToken cancellationToken)
            {
                //var dichvu = await _context.Service.FindAsync(request.Id);
                //if (dichvu == null)
                //{
                //    return Result<Service>.Failure("Không tìm thấy dữ liệu");
                //}

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    DynamicParameters mParams = new DynamicParameters();
                    mParams.Add("@PID", request.Id);
                    var dichvu = await connection.QueryFirstOrDefaultAsync<Service>("SP_SERVICE_DANHSACH", param: mParams, commandType: System.Data.CommandType.StoredProcedure);
                    if (dichvu == null)
                    {
                        return Result<Service>.Failure("Không tìm thấy dữ liệu");
                    }


                    var lstImage = await connection.QueryAsync<Image>(new CommandDefinition("SP_DICHVU_DANHSACH_IMAGE", parameters: null, commandType: System.Data.CommandType.StoredProcedure));


                    dichvu.ListImage = new List<string>();
                    foreach (Image img in lstImage)
                    {
                        if (img.ServiceID == dichvu.ID)
                        {
                            dichvu.ListImage.Add(img.Url);
                        }
                    }
                    return Result<Service>.Success(dichvu);
                }
            }
        }
    }
}
