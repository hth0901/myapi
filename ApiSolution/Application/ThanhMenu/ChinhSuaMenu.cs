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

namespace Application.ThanhMenu
{
    public class ChinhSuaMenu
    {
        public class Command : IRequest<Result<int>>
        {
            public Menu _menu { get; set; }

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

                string spName = "SP_EDIT_MENU";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", request._menu.ID);
                parameters.Add("@PNAME", request._menu.Name);
                parameters.Add("@PPARENTID", request._menu.ParentID);
                parameters.Add("@PISACTIVE", request._menu.IsActive);
                parameters.Add("@PPATH", request._menu.Path);
                parameters.Add("@PDISPLAYORRDER", request._menu.DisplayOrder);
                parameters.Add("@PISLEAF", request._menu.IsLeaf);
                parameters.Add("@PICON", request._menu.Icon);
                parameters.Add("@PISADMIN", request._menu.IsAdminTool);


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
