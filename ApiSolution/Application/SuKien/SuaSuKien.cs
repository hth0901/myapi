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
    public class SuaSuKien
    {
        public class Command : IRequest<Result<int>>
        {
            public Event _event { get; set; }

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

                string spName = "SP_EDIT_EVENT";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request._event.ID);
                parameters.Add("@PTITLE", request._event.Title);
                parameters.Add("@PCONTENT", request._event.Content);
                //parameters.Add("@PCREATEDTIME", request._event.CreatedTime);
                //parameters.Add("@PCREATEDID", request._event.CreatedByID);
                parameters.Add("@PUPDATETIME", request._event.UpdateTime);
                parameters.Add("@PUPDATEID", request._event.UpdateByID);
                parameters.Add("@PIMAGEID", request._event.ImageID);
                parameters.Add("@PLATTITUDE", request._event.Lattitude);
                parameters.Add("@PLONGTIDUTE", request._event.Longtidute);
                parameters.Add("@PADDRESS", request._event.Address);
                parameters.Add("@POPENDATE", request._event.Open_date);
                parameters.Add("@PNOTE", request._event.Note);
                parameters.Add("@PEVENTTIME", request._event.EventTime);
                parameters.Add("@PISDAILY", request._event.IsDaily);
                parameters.Add("@PACTIVE", request._event.Active);





                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var affectRow = await connection.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    var result = affectRow > 0;
                    if (!result)
                        return Result<int>.Failure("Edit Event not success");
                    return Result<int>.Success(affectRow);
                }
            }
        }



    }
}
