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

namespace Application.DiaDiem
{
   public class ThemDiaDiem
    {
        public class Command : IRequest<Result<Place>>
        {
            public Place addPlace { get; set; }
        }



        public class CommandValidator : AbstractValidator<Place>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().WithMessage("tiêu đề không được rỗng");
                RuleFor(x => x.Content).NotEmpty().WithMessage("nội dung, không được rỗng");
                RuleFor(x => x.Longtidute).NotEmpty().WithMessage("kinh độ không được rỗng");
                RuleFor(x => x.Lattitude).NotEmpty().WithMessage("Vĩ độ không được rỗng");


            }
        }

        public class Handler : IRequestHandler<Command, Result<Place>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<Place>> Handle(Command request, CancellationToken cancellationToken)
            {
                //_context.Activities.Add(request.Activity);
                //await _context.SaveChangesAsync();
                //return Unit.Value;

                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    var transaction = await connection.BeginTransactionAsync();

                    try
                    {
                        string spName = "SP_ADD_PLACE";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PTITLE", request.addPlace.Title);
                        parameters.Add("@PADDRESS", request.addPlace.Address);
                        parameters.Add("@PCONTENT", request.addPlace.Content);
                        parameters.Add("@PCREATEDTIME", request.addPlace.CreatedTime);
                        parameters.Add("@PCREATEDID", request.addPlace.CreatedByID);
                        parameters.Add("@PLATTITUDE", request.addPlace.Lattitude);
                        parameters.Add("@PLONGTIDUTE", request.addPlace.Longtidute);
                        parameters.Add("@PACTIVE", request.addPlace.Active);
                        parameters.Add("@PINTRODUCE", request.addPlace.Introduce);

                        var placeInsertResult = await connection.QueryFirstOrDefaultAsync<Place>(spName, parameters, transaction, commandType: System.Data.CommandType.StoredProcedure);

                        if (placeInsertResult == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        string spname2 = "SP_VETHAMQUAN_CREATE";
                        DynamicParameters parameters2 = new DynamicParameters();
                        parameters2.Add("@PNAME", request.addPlace.Title);
                        parameters2.Add("@PCONTENT", request.addPlace.Content);
                        parameters2.Add("@PACTIVE", request.addPlace.Active);
                        parameters2.Add("@PTYPEVALUE", 1);
                        parameters2.Add("@PDATETOEXPIRED", 2);

                        var insertId = await connection.ExecuteScalarAsync<int>(spname2, parameters2, transaction, commandType: System.Data.CommandType.StoredProcedure);
                        if (insertId <= 0)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        string spName3 = "SP_VETHAMQUAN_CHITIET_CREATE";
                        DynamicParameters mParams3 = new DynamicParameters();
                        mParams3.Add("@PPLACEID", placeInsertResult.ID);
                        mParams3.Add("@PTYPEID", insertId);

                        var rowcount = await connection.ExecuteAsync(spName3, mParams3, transaction, commandType: System.Data.CommandType.StoredProcedure);
                        if (rowcount <= 0)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        transaction.Commit();
                        return Result<Place>.Success(placeInsertResult);
                    }

                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        return Result<Place>.Failure(ex.Message);
                    }

                    
                }

               // string spName = "SP_ADD_PLACE";
               // DynamicParameters parameters = new DynamicParameters();
               // parameters.Add("@PTITLE", request.addPlace.Title);
               // //parameters.Add("@PTITLEEN", request.addPlace.TitleEn);
               // parameters.Add("@PADDRESS", request.addPlace.Address);
               // parameters.Add("@PCONTENT", request.addPlace.Content);
               // //parameters.Add("@PCONTENTEN", request.addPlace.ContentEn);
               // parameters.Add("@PCREATEDTIME", request.addPlace.CreatedTime);
               // parameters.Add("@PCREATEDID", request.addPlace.CreatedByID);               
               //// parameters.Add("@PIMAGEID", request.addPlace.ImageID);
               ////parameters.Add("@PVIDEOID", request.addPlace.VideoID);
               // parameters.Add("@PLATTITUDE", request.addPlace.Lattitude);
               // parameters.Add("@PLONGTIDUTE", request.addPlace.Longtidute);
               // parameters.Add("@PACTIVE", request.addPlace.Active);
               // parameters.Add("@PINTRODUCE", request.addPlace.Introduce);


               // using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
               // {
               //     connection.Open();
               //     var result = await connection.QueryFirstAsync<Place>(spName, parameters, commandType: System.Data.CommandType.StoredProcedure);                  
               //     return Result<Place>.Success(result);
               // }
            }
        }
    }
}
