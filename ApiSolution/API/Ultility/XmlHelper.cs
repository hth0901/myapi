using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Domain.RequestEntity;

namespace VeDienTu.Ultility
{
    public class XmlHelper
    {
        public static XmlDocument UpdateCusBody(string name, string code, string taxcode, string address, string email, string phonenumber, string cusType)
        {
            var doc = new XmlDocument();
            var Customers = doc.AppendChild(doc.CreateElement("Customers"));
            var Customer = Customers.AppendChild(doc.CreateElement("Customer"));
            Customer.AppendChild(doc.CreateElement("Name")).InnerText = name;
            Customer.AppendChild(doc.CreateElement("Code")).InnerText = code;
            Customer.AppendChild(doc.CreateElement("TaxCode")).InnerText = taxcode;
            Customer.AppendChild(doc.CreateElement("Address")).InnerText = address;
            Customer.AppendChild(doc.CreateElement("Email")).InnerText = email;
            Customer.AppendChild(doc.CreateElement("Phone")).InnerText = phonenumber;
            Customer.AppendChild(doc.CreateElement("CusType")).InnerText = cusType;

            return doc;
        }

        public static XmlDocument CreateImportAndPublishInv(string fkey, string cusCode, string address, string name, int totalPrice, List<Domain.ResponseEntity.OrderDetailShortResponse> lstProducts)
        {
            var doc = new XmlDocument();
            var Invoices = doc.AppendChild(doc.CreateElement("Invoices"));
            var Inv = Invoices.AppendChild(doc.CreateElement("Inv"));
            Inv.AppendChild(doc.CreateElement("key")).InnerText = fkey;
            var Invoice = Inv.AppendChild(doc.CreateElement("Invoice"));
            Invoice.AppendChild(doc.CreateElement("CusCode")).InnerText = cusCode;
            Invoice.AppendChild(doc.CreateElement("ArisingDate")).InnerText = DateTime.Today.ToString("dd/MM/yyyy");
            Invoice.AppendChild(doc.CreateElement("CusAddress")).InnerText = address;
            Invoice.AppendChild(doc.CreateElement("CusName"));
            Invoice.AppendChild(doc.CreateElement("Buyer")).InnerText = name;
            Invoice.AppendChild(doc.CreateElement("Total")).InnerText = totalPrice.ToString();
            Invoice.AppendChild(doc.CreateElement("Amount")).InnerText = totalPrice.ToString();
            Invoice.AppendChild(doc.CreateElement("AmountInWords")).InnerText = NumberHelper.NumberToText(totalPrice);
            Invoice.AppendChild(doc.CreateElement("VATAmount")).InnerText = "0";
            Invoice.AppendChild(doc.CreateElement("VATRate")).InnerText = "0";
            Invoice.AppendChild(doc.CreateElement("PaymentMethod")).InnerText = "Chuyển khoản";
            Invoice.AppendChild(doc.CreateElement("Extra"));
            var Products = Invoice.AppendChild(doc.CreateElement("Products"));
            foreach(var item in lstProducts)
            {

                var Product = Products.AppendChild(doc.CreateElement("Product"));
                Product.AppendChild(doc.CreateElement("Code"));
                Product.AppendChild(doc.CreateElement("ProdName")).InnerText = item.Name;
                Product.AppendChild(doc.CreateElement("ProdUnit")).InnerText = "lượt";
                Product.AppendChild(doc.CreateElement("ProdQuantity")).InnerText = item.Quantity.ToString();
                Product.AppendChild(doc.CreateElement("ProdPrice")).InnerText = item.UnitPrice.ToString();
                Product.AppendChild(doc.CreateElement("Amount")).InnerText = item.TotalPrice.ToString();
            }

            return doc;
        }
        public static XmlDocument ImportAndPublishInv()
        {
            //var soapNs = @"http://schemas.xmlsoap.org/soap/envelope/";
            //var bodyNs = @"http://tempuri.org/";
            var doc = new XmlDocument();
            //var root = doc.AppendChild(doc.CreateElement("soapenv", "Envelope", soapNs));
            //root.Attributes.Append(doc.CreateAttribute("xmlns:tem")).Value = bodyNs;

            //var header = root.AppendChild(doc.CreateElement("soapenv", "Header", soapNs));
            //var body = root.AppendChild(doc.CreateElement("soapenv", "Body", soapNs));

            //var XacThucThongTinCongDan = body.AppendChild(doc.CreateElement("tem", "ImportAndPublishInv", bodyNs));
            //var xmlInvData = XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "xmlInvData", bodyNs));

            //var CDATA = doc.AppendChild(doc.CreateElement("CDATA"));
            var Invoices = doc.AppendChild(doc.CreateElement("Invoices"));
            var Inv = Invoices.AppendChild(doc.CreateElement("Inv"));
            Inv.AppendChild(doc.CreateElement("key")).InnerText = "111aerfasd3";
            var Invoice = Inv.AppendChild(doc.CreateElement("Invoice"));
            Invoice.AppendChild(doc.CreateElement("CusCode")).InnerText = "KHT001";
            Invoice.AppendChild(doc.CreateElement("ArisingDate")).InnerText = "06/06/2022";
            Invoice.AppendChild(doc.CreateElement("CusAddress")).InnerText = "Địa chỉ";
            Invoice.AppendChild(doc.CreateElement("CusName"));
            Invoice.AppendChild(doc.CreateElement("Buyer")).InnerText = "Nguyễn văn E";
            Invoice.AppendChild(doc.CreateElement("Total")).InnerText = "300000";
            Invoice.AppendChild(doc.CreateElement("Amount")).InnerText = "600000";
            Invoice.AppendChild(doc.CreateElement("AmountInWords")).InnerText = "Saus trăm ngàn đồng";
            Invoice.AppendChild(doc.CreateElement("VATAmount")).InnerText = "0";
            Invoice.AppendChild(doc.CreateElement("VATRate")).InnerText = "0";
            Invoice.AppendChild(doc.CreateElement("PaymentMethod")).InnerText = "Chuyển khoản";
            Invoice.AppendChild(doc.CreateElement("Extra"));
            var Products = Invoice.AppendChild(doc.CreateElement("Products"));
            var Product = Products.AppendChild(doc.CreateElement("Product"));
            Product.AppendChild(doc.CreateElement("Code"));
            Product.AppendChild(doc.CreateElement("ProdName")).InnerText = "Vé tham quan Đại Nội Huế - Người lớn";
            Product.AppendChild(doc.CreateElement("ProdUnit")).InnerText = "1";
            Product.AppendChild(doc.CreateElement("ProdQuantity")).InnerText = "2";
            Product.AppendChild(doc.CreateElement("ProdPrice")).InnerText = "300000";
            Product.AppendChild(doc.CreateElement("Amount")).InnerText = "600000";


            //xmlInvData.InnerText = $"<![CDATA[{CDATA.InnerXml}]]>";


            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "Account", bodyNs)).InnerText = "ditichhueadmin";
            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "ACpass", bodyNs)).InnerText = "Einv@oi@vn#pt20";
            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "username", bodyNs)).InnerText = "tichhop";
            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "password", bodyNs)).InnerText = "123456aA@";
            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "convert", bodyNs)).InnerText = "0";

            return doc;
        }

        public static XmlDocument TraCuuThongTinCongDan()
        {
            var soapNs = @"http://schemas.xmlsoap.org/soap/envelope/";
            var bodyNs = @"http://tempuri.org/";
            var doc = new XmlDocument();
            var root = doc.AppendChild(doc.CreateElement("soapenv", "Envelope", soapNs));
            root.Attributes.Append(doc.CreateAttribute("xmlns:tem")).Value = bodyNs;

            var header = root.AppendChild(doc.CreateElement("soapenv", "Header", soapNs));
            var body = root.AppendChild(doc.CreateElement("soapenv", "Body", soapNs));

            var XacThucThongTinCongDan = body.AppendChild(doc.CreateElement("tem", "ImportAndPublishInv", bodyNs));
            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "xmlInvData", bodyNs)).InnerText = "<![CDATA[]]>";
            var xmlInvData = XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "xmlInvData", bodyNs));

            var CDATA = doc.CreateElement("CDATA");
            var Invoices = CDATA.AppendChild(doc.CreateElement("Invoices"));
            var Inv = Invoices.AppendChild(doc.CreateElement("Inv"));
            Inv.AppendChild(doc.CreateElement("key")).InnerText = "111aerfasd3";
            var Invoice = Inv.AppendChild(doc.CreateElement("Invoice"));
            Invoice.AppendChild(doc.CreateElement("CusCode")).InnerText = "KHT001";
            Invoice.AppendChild(doc.CreateElement("ArisingDate")).InnerText = "06/06/2022";
            Invoice.AppendChild(doc.CreateElement("CusAddress")).InnerText = "Địa chỉ";
            Invoice.AppendChild(doc.CreateElement("CusName"));
            Invoice.AppendChild(doc.CreateElement("Buyer")).InnerText = "Nguyễn văn E";
            Invoice.AppendChild(doc.CreateElement("Total")).InnerText = "300000";
            Invoice.AppendChild(doc.CreateElement("Amount")).InnerText = "600000";
            Invoice.AppendChild(doc.CreateElement("AmountInWords")).InnerText = "Saus trăm ngàn đồng";
            Invoice.AppendChild(doc.CreateElement("VATAmount")).InnerText = "0";
            Invoice.AppendChild(doc.CreateElement("VATRate")).InnerText = "0";
            Invoice.AppendChild(doc.CreateElement("PaymentMethod")).InnerText = "Chuyển khoản";
            Invoice.AppendChild(doc.CreateElement("Extra"));
            var Products = Invoice.AppendChild(doc.CreateElement("Products"));
            var Product = Products.AppendChild(doc.CreateElement("Product"));
            Product.AppendChild(doc.CreateElement("Code"));
            Product.AppendChild(doc.CreateElement("ProdName")).InnerText = "Vé tham quan Đại Nội Huế - Người lớn";
            Product.AppendChild(doc.CreateElement("ProdUnit")).InnerText = "1";
            Product.AppendChild(doc.CreateElement("ProdQuantity")).InnerText = "2";
            Product.AppendChild(doc.CreateElement("ProdPrice")).InnerText = "300000";
            Product.AppendChild(doc.CreateElement("Amount")).InnerText = "600000";


            xmlInvData.InnerText = $"<![CDATA[{CDATA.InnerXml}]]>";


            XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "Account", bodyNs)).InnerText = "ditichhueadmin";
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "ACpass", bodyNs)).InnerText = "Einv@oi@vn#pt20";
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "username", bodyNs)).InnerText = "tichhop";
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "password", bodyNs)).InnerText = "123456aA@";
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("tem", "convert", bodyNs)).InnerText = "0";

            return doc;
        }
        public XmlDocument CreateXml()
        {
            var randomCode = string.Empty;


            var soapNs = @"http://schemas.xmlsoap.org/soap/envelope/";
            var bodyNs = @"http://dancuquocgia.bca";

            var doc = new XmlDocument();
            var root = doc.AppendChild(doc.CreateElement("soapenv", "Envelope", soapNs));
            root.Attributes.Append(doc.CreateAttribute("xmlns:qldc")).Value = bodyNs;

            var header = root.AppendChild(doc.CreateElement("soapenv", "Header", soapNs));
            var body = root.AppendChild(doc.CreateElement("soapenv", "Body", soapNs));

            var XacThucThongTinCongDan = body.AppendChild(doc.CreateElement("qldc", "XacThucThongTinCongDan", bodyNs));
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "MaYeuCau", bodyNs)).InnerText = randomCode;
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "MaDVC", bodyNs)).InnerText = "G15-TP110";
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "MaTichHop", bodyNs)).InnerText = "003";
            XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "MaCanBo", bodyNs)).InnerText = "tthieu.stttt";          //"NGSP_BTTTT"
            //if (sodinhdanh.Length <= 9)
            //    XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "SoCMND", bodyNs)).InnerText = sodinhdanh;
            //else
            //    XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "SoDinhDanh", bodyNs)).InnerText = sodinhdanh;

            //XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "HoVaTen", bodyNs)).InnerText = hovaten;
            //var ngaythangnamsinh = XacThucThongTinCongDan.AppendChild(doc.CreateElement("qldc", "NgayThangNamSinh", bodyNs));
            //ngaythangnamsinh.AppendChild(doc.CreateElement("qldc", "NgayThangNam", bodyNs)).InnerText = ngaysinh;

            return doc;
        }
    }
}
