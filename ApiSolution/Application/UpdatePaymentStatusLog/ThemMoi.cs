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
using Domain;


namespace Application.UpdatePaymentStatusLog
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<int>>
        {
            public Domain.RequestEntity.UpdateMerchantStatusRequest Entity { get; set; }
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
                Domain.UpdatePaymentStatusLog masterEntity = new Domain.UpdatePaymentStatusLog
                {
                    code = request.Entity.code,
                    message = request.Entity.message,
                    msgType = request.Entity.msgType,
                    txnId = request.Entity.txnId,
                    qrTrace = request.Entity.qrTrace,
                    bankCode = request.Entity.bankCode,
                    mobile = request.Entity.mobile,
                    accountNo = request.Entity.accountNo,
                    amount = request.Entity.amount,
                    payDate = request.Entity.payDate,
                    checksum = request.Entity.checksum
                };

                var insertMasterEntity = _context.UpdatePaymentStatusLog.Add(masterEntity);
                int insertMasterCount = await _context.SaveChangesAsync();
                if (insertMasterCount <= 0)
                {
                    //List<UpdatePaymentStatusLogDetail> lstDetail = new List<UpdatePaymentStatusLogDetail>();
                    //foreach(var item in request.Entity.addData)
                    //{
                    //    UpdatePaymentStatusLogDetail detailItem = new UpdatePaymentStatusLogDetail
                    //    {
                    //        MasterId = insertMasterEntity.Entity.Id,
                    //        productId = item.productId,
                    //        amount = item.amount,
                    //        tipAndFee = item.tipAndFee,
                    //        ccy = item.ccy,
                    //        qty = item.qty,
                    //        node = item.note
                    //    };

                    //    lstDetail.Add(detailItem);
                    //}

                    //await _context.UpdatePaymentStatusLogDetail.AddRangeAsync(lstDetail);
                    //await _context.SaveChangesAsync();

                    return Result<int>.Failure("fail");
                }

                return Result<int>.Success(insertMasterCount);
            }
        }
    }
}
