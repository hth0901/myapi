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

namespace Application.NguoiDung
{
    public class SuaNguoiDung
    {
        public class Command : IRequest<Result<int>>
        {
            public Employee _Nguoidung { get; set; }

        }
        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IConfiguration configuration, IMapper mapper)
            {
                _context = context;
                _configuration = configuration;
                _mapper = mapper;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                string spName = "SP_EDIT_NGUOIDUNG";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request._Nguoidung.ID);
                parameters.Add("@PFULLNAME", request._Nguoidung.FullName);
                parameters.Add("@PDESCRIPTION", request._Nguoidung.Description);
                parameters.Add("@PROLEID", request._Nguoidung.RoleID);
                parameters.Add("@PUPDATETIME", DateTime.Now);
                parameters.Add("@PUPDATEBYID", 1);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Edit user not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
