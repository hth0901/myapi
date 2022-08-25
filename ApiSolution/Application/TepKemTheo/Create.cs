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
using Microsoft.AspNetCore.Hosting;

namespace Application.TepKemTheo
{
    public class Create
    {
        public class Command : IRequest<Result<int>>
        {
            public TepKemTheoEntity Tep { get; set; }
        }

        public class CommandValidator : AbstractValidator<TepKemTheoEntity>
        {
            public CommandValidator()
            {

            }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration) { 
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_TEPKEMTHEO_INSERT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PDOITUONGID", request.Tep.DoiTuongSoHuu);
                parameters.Add("@PTENTEP", request.Tep.TenTep);
                parameters.Add("@PNOILUUTRU", request.Tep.NoiLuuTru);

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Create Activity not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
