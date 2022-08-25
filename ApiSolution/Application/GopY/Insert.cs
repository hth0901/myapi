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
using Domain.RequestEntity;

namespace Application.GopY
{
    public class Insert
    {
        public class Command : IRequest<Result<int>>
        {
            public SendFeedBackRequest _request { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;
            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                string spName = "SP_FEEDBACK_INSERT";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PTITLE", request._request.Title);
                parameters.Add("@PCONTENT", request._request.Content);
                parameters.Add("@PFULLNAME", request._request.FullName);
                parameters.Add("@PEMAIL", request._request.Email);

                using (var connecttion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connecttion.OpenAsync();
                    int insertRow = await connecttion.ExecuteAsync(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);
                    if (insertRow > 0)
                    {
                        return Result<int>.Success(insertRow);
                    }
                    return Result<int>.Failure("Send feedback not success!");
                }
            }
        }
    }
}
