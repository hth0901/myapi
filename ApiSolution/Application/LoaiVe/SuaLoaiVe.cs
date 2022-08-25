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

namespace Application.LoaiVe
{
    public class SuaLoaiVe
    {
        public class Command : IRequest<Result<int>>
        {
            public Domain.TicketType LoaiVe { get; set; }

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

                string spName = "SP_EDIT_LOAIVE";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request.LoaiVe.ID);
                parameters.Add("@PNAME", request.LoaiVe.Name);
                parameters.Add("@PCONTENT", request.LoaiVe.Content);
                parameters.Add("@PUPDATEBYID", 1);
                parameters.Add("@PUPDATETIME", DateTime.Now);
                //parameters.Add("@PVETUYEN", request.LoaiVe.Is_VeTuyen);
                //parameters.Add("@PLISTPLACE", request.LoaiVe.ListPlaceID);
                //parameters.Add("@PLISTEVENT", request.LoaiVe.ListEventID);
                parameters.Add("@PACTIVE", request.LoaiVe.Active);
                parameters.Add("@PNUMBERDAYCANUSE", request.LoaiVe.NumberOfDayCanUse);
                parameters.Add("@PDATETOEXPIRED", request.LoaiVe.DateToExpired);


                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Edit Place not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }
    }
}
