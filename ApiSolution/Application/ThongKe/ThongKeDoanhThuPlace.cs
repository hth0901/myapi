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
    public class ThongKeDoanhThuPlace
    {
        public class Query : IRequest<Result<List<ThongKeDoanhThuTheoDiaDiem>>>
        {
            public string Date { get; set; }
            public string DateTo { get; set; }
            public string Place { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<ThongKeDoanhThuTheoDiaDiem>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<List<ThongKeDoanhThuTheoDiaDiem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    List<ReceiptStatisticByPlace> result = new List<ReceiptStatisticByPlace>();
                    List<GiaLoaiVeChenhLech> lst = new List<GiaLoaiVeChenhLech>();
                    var veTuyen = await connection.QueryAsync<GiaLoaiVe>("SP_THONGKE_DOANHTHU_THEODIADIEM_LOAIVETUYEN", commandType: System.Data.CommandType.StoredProcedure);
                    var veDon = await connection.QueryAsync<GiaLoaiVe>("SP_THONGKE_DOANHTHU_THEODIADIEM_LOAIVEDON", commandType: System.Data.CommandType.StoredProcedure);
                    foreach (var i in veTuyen)
                    {
                        GiaLoaiVeChenhLech obj = new GiaLoaiVeChenhLech
                        { 
                            ID = i.ID,
                            CustomerTypeID = i.CustomerTypeID,
                            TiketTypeID = i.TiketTypeID,
                            Price = i.Price,
                            ListPlaceID = i.ListPlaceID
                        };

                        int sum = 0;
                        int[] place = i.ListPlaceID.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
                        foreach (var x in veDon) 
                        {
                            int placeID = Int32.Parse(x.ListPlaceID);
                            bool check = place.Contains(placeID);
                            if (i.CustomerTypeID == x.CustomerTypeID && check == true)
                            {
                                sum += x.Price;
                            }
                        }
                        double ratio = Math.Round((((double)i.Price / (double)sum) * 100), 2);
                        obj.Ratio = ratio;
                        lst.Add(obj);
                    }

                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Date", request.Date);
                    parameters.Add("@DateTo", request.DateTo);
                    var dtVeTuyen = await connection.QueryAsync<DoanhThuTheoDiaDiemVeTuyen>("SP_THONGKE_DOANHTHU_THEODIADIEM_TONGVETUYEN", commandType: System.Data.CommandType.StoredProcedure, param: parameters);
                    var dtVeDon = await connection.QueryAsync<DoanhThuTheoDiaDiemVeDon>("SP_THONGKE_DOANHTHU_THEODIADIEM_TONGVEDON", commandType: System.Data.CommandType.StoredProcedure, param: parameters);

                    List<DoanhThuTheoDiaDiem> list = new List<DoanhThuTheoDiaDiem>();

                    foreach (var vt in dtVeTuyen)
                    {
                        double ratio = 0;
                        foreach (var l in lst)
                        {
                            if (vt.CustomerType == l.CustomerTypeID && vt.TicketTypeID == l.TiketTypeID)
                            {
                                ratio = l.Ratio;
                            }
                        }
                        int[] place = vt.ListPlaceID.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
                        foreach (int p in place)
                        {
                            DoanhThuTheoDiaDiem obj = new DoanhThuTheoDiaDiem
                            {
                                CustomerType = vt.CustomerType,
                                TicketTypeID = vt.TicketTypeID,
                                SoVeTuyen = vt.SoVe,
                                QuyDoiVeTuyen = ((vt.SoVe * ratio)/100),
                                PlaceID = p,
                                Ratio = ratio,
                            };
                            list.Add(obj);
                        }
                    }

                    foreach (var vd in dtVeDon)
                    {
                        bool flag = false;
                        foreach (var l in list)
                        {
                            if (Int32.Parse(vd.ListPlaceID) == l.PlaceID && vd.CustomerType == l.CustomerType)
                            {
                                flag = true;
                                l.SoVeDon = vd.SoVe;
                            }
                        }
                        if (flag == false)
                        {
                            DoanhThuTheoDiaDiem obj = new DoanhThuTheoDiaDiem
                            {
                                CustomerType = vd.CustomerType,
                                TicketTypeID = vd.TicketTypeID,
                                SoVeDon = vd.SoVe,
                                PlaceID = Int32.Parse(vd.ListPlaceID),
                            };
                            list.Add(obj);
                        }
                    }

                    foreach (var l in list)
                    {
                        foreach (var v in veDon)
                        {
                            if (l.CustomerType == v.CustomerTypeID && l.PlaceID == Int32.Parse(v.ListPlaceID))
                            {
                                double total = ((double)l.SoVeDon + l.QuyDoiVeTuyen) * v.Price;
                                l.TongDoanhThu = (int)Math.Round(total);
                            }
                        }
                    }

                    DynamicParameters param = new DynamicParameters();
                    param.Add("@PID", null);
                    var diadiem = await connection.QueryAsync<DiaDiemThamQuan>("SP_DIADIEM_DANHSACH", commandType: System.Data.CommandType.StoredProcedure, param: param);

                    foreach (var l in list)
                    {
                        foreach (var d in diadiem)
                        {
                            if (l.PlaceID == d.ID)
                            {
                                l.PlaceTitle = d.Title;
                            }
                        }
                    }

                    int[] filter = request.Place.Split(',').Select(n => Convert.ToInt32(n)).ToArray();

                    List<ThongKeDoanhThuTheoDiaDiem> grouped = list
                                    .Where(y => (string.IsNullOrEmpty(request.Place) || filter.Contains(y.PlaceID)))
                                    .GroupBy(l => l.PlaceID)
                                    .Select(g => new ThongKeDoanhThuTheoDiaDiem
                                    { 
                                        PlaceID = g.Key,
                                        Total = g.Sum(s => s.TongDoanhThu),
                                        PlaceTitle = g.First().PlaceTitle,
                                        SoVeDon = g.Sum(s => s.SoVeDon),
                                        SoVeTuyen = g.Sum(s => s.SoVeTuyen),
                                    }).ToList();

                    return Result<List<ThongKeDoanhThuTheoDiaDiem>>.Success(grouped.ToList());
                }
            }
        }
    }
}
