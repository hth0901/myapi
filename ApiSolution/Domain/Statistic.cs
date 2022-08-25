using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ReceiptStatistic
    {
        public int TicketTypeId { get; set; }
        public string Name { get; set; }
        public int CustomerType { get; set; }
        public string CustomerTypeName { get; set; }
        public int DoanhThu { get; set; }
        public int SoVe { get; set; }
    }

    public class ReceiptStatisticCustomerType
    {
        public int TicketTypeId { get; set; }
        public string Name { get; set; }
        public List<ReceiptStatisticEachCustomerType> ReceiptStatistic { get; set; }
    }

    public class ReceiptStatisticEachCustomerType
    {
        public int CustomerType { get; set; }
        public string CustomerTypeName { get; set; }
        public int DoanhThu { get; set; }
        public int SoVe { get; set; }
    }

    public class ReceiptStatisticPoint
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int TotalAmount { get; set; }
        public int SoVe { get; set; }
        public int IsForeign { get; set; }
    }

    public class ReceiptStatisticByPlace
    {
        public int TicketTypeId { get; set; }
        public string Name { get; set; }
        public int DoanhThu { get; set; }
        public bool Is_veTuyen { get; set; }
        public string ListPlaceID { get; set; }
    }

    public class VisitStatistic
    {
        public int PlaceId { get; set; }
        public string Title { get; set; }
        public int SoLuotTrongNuoc { get; set; }
        public int SoLuotQuocTe { get; set; }
    }

    public class VisitStatisticYear
    {
        public int Nam { get; set; }
        public int SoLuotTrongNuoc { get; set; }
        public int SoLuotQuocTe { get; set; }
    }
    public class GiaLoaiVe
    {
        public int ID { get; set; }
        public int CustomerTypeID { get; set; }
        public int TiketTypeID { get; set; }
        public int Price { get; set; }
        public string ListPlaceID { get; set; }
    }

    public class GiaLoaiVeChenhLech
    {
        public int ID { get; set; }
        public int CustomerTypeID { get; set; }
        public int TiketTypeID { get; set; }
        public int Price { get; set; }
        public string ListPlaceID { get; set; }
        public double Ratio { get; set; }
    }

    public class DoanhThuTheoDiaDiemVeTuyen
    {
        public int CustomerType { get; set; }
        public int TicketTypeID { get; set; }
        public int SoVe { get; set; }
        public string ListPlaceID { get; set; }
        public double Ratio { get; set; }
    }

    public class DoanhThuTheoDiaDiemVeDon
    {
        public int CustomerType { get; set; }
        public int TicketTypeID { get; set; }
        public int SoVe { get; set; }
        public string ListPlaceID { get; set; }
    }

    public class DoanhThuTheoDiaDiem
    {
        public int CustomerType { get; set; }
        public int TicketTypeID { get; set; }
        public int SoVeDon { get; set; }
        public int SoVeTuyen { get; set; }
        public double QuyDoiVeTuyen { get; set; }
        public int PlaceID { get; set; }
        public string PlaceTitle { get; set; }
        public double Ratio { get; set; }
        public int TongDoanhThu { get; set; }
    }

    public class ThongKeDoanhThuTheoDiaDiem
    {
        public int PlaceID { get; set; }
        public int Total { get; set; }
        public string PlaceTitle { get; set; }
        public int SoVeDon { get; set; }
        public int SoVeTuyen { get; set; }
    }

    public class DiaDiemThamQuan
    {
        public int ID { get; set; }
        public string Title { get; set; }
    }
}
