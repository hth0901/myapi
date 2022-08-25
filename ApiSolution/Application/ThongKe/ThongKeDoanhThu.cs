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
using Application.Core;

namespace Application.ThongKe
{
    public class ThongKeDoanhThu
    {
        public class Query : IRequest<Result<List<ReceiptStatisticCustomerType>>>
        {
            public string Date { get; set; }
            public string DateTo { get; set; }
            public string TicketType { get; set; }
            public string CustomerType { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<ReceiptStatisticCustomerType>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<ReceiptStatisticCustomerType>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string spName = "SP_THONGKE_DOANHTHU";

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Date", request.Date);
                parameters.Add("@DateTo", request.DateTo);
                parameters.Add("@TicketType", request.TicketType);
                parameters.Add("@CustomerType", request.CustomerType);
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    var result = await connection.QueryAsync<ReceiptStatistic>(spName, commandType: System.Data.CommandType.StoredProcedure, param: parameters);
                    List<ReceiptStatisticCustomerType> lst = new List<ReceiptStatisticCustomerType>();

                    if (request.CustomerType != "0")
                    {
                        int[] ticket = request.TicketType.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
                        int[] customer = request.CustomerType.Split(',').Select(n => Convert.ToInt32(n)).ToArray();

                        foreach (int tid in ticket)
                        {
                            var filter = result.Where(t => t.TicketTypeId == tid);
                            if (filter.Any())
                            {
                                ReceiptStatisticCustomerType res = new ReceiptStatisticCustomerType
                                {
                                    TicketTypeId = filter.FirstOrDefault().TicketTypeId,
                                    Name = filter.FirstOrDefault().Name
                                };
                                List<ReceiptStatisticEachCustomerType> ect = new List<ReceiptStatisticEachCustomerType>();
                                foreach (int c in customer)
                                {
                                    foreach (var f in filter)
                                    {
                                        if (f.CustomerType == c)
                                        {
                                            ReceiptStatisticEachCustomerType item = new ReceiptStatisticEachCustomerType
                                            {
                                                CustomerType = f.CustomerType,
                                                CustomerTypeName = f.CustomerTypeName,
                                                SoVe = f.SoVe,
                                                DoanhThu = f.DoanhThu
                                            };
                                            ect.Add(item);
                                        }
                                    }
                                }
                                res.ReceiptStatistic = ect;
                                lst.Add(res);
                            }
                        }
                    }
                    else if (request.CustomerType == "0")
                    {
                        int[] ticket = request.TicketType.Split(',').Select(n => Convert.ToInt32(n)).ToArray();

                        foreach (int tid in ticket)
                        {
                            var filter = result.Where(t => t.TicketTypeId == tid);
                            if (filter.Any())
                            {
                                List<ReceiptStatisticEachCustomerType> ect = new List<ReceiptStatisticEachCustomerType>();
                                ReceiptStatisticEachCustomerType item = new ReceiptStatisticEachCustomerType
                                {
                                    CustomerType = 0,
                                    CustomerTypeName = null,
                                    SoVe = filter.FirstOrDefault().SoVe,
                                    DoanhThu = filter.FirstOrDefault().DoanhThu
                                };
                                ect.Add(item);

                                ReceiptStatisticCustomerType res = new ReceiptStatisticCustomerType
                                {
                                    TicketTypeId = filter.FirstOrDefault().TicketTypeId,
                                    Name = filter.FirstOrDefault().Name,
                                    ReceiptStatistic = ect
                                };

                                lst.Add(res);
                            }
                        }
                    }
                    return Result<List<ReceiptStatisticCustomerType>>.Success(lst.ToList());
                }
            }
        }
    }
}
