using Domain.RequestEntity;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.PdfUltility
{
    public static class BitmapExtension
    {
        public static byte[] BitmapToByteArray(this Bitmap bitmap)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                bitmap.Save(ms, ImageFormat.Png);
                return ms.ToArray();
            }
        }
    }
    public static class TemplateGenerator
    {
        public static string HtmlString(string imgData)
        {

            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\QRTemplate.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", $"<img src='{imgData}' style='width: 200px; height: 200px' />");
            htmlText = htmlText.Replace("[username]", "hihihehe");
            htmlText = htmlText.Replace("[email]", "kuxidaica@gmail.com");
            return htmlText;
        }

        public static string GenTicketHtmlStringToDownLoad(DownloadTicketRequest _request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\muave_taive_bk20220128.html";
            //string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\taive_new_design.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", _request.qrString);
            htmlText = htmlText.Replace("[orderId]", _request.orderId);
            htmlText = htmlText.Replace("[placesName]", _request.placesName);
            //htmlText = htmlText.Replace("[adultQuantity]", _request.adultQuantity.ToString());
            //htmlText = htmlText.Replace("[childrenQuantity]", _request.childrenQuantity.ToString());
            htmlText = htmlText.Replace("[totalQuantity]", _request.totalQuantity.ToString());
            htmlText = htmlText.Replace("[email]", _request.email);
            htmlText = htmlText.Replace("[fullName]", _request.fullName);
            htmlText = htmlText.Replace("[phoneNumber]", _request.phoneNumber);
            htmlText = htmlText.Replace("[totalPrice]", _request.totalPrice.ToString());
            htmlText = htmlText.Replace("[uniqId]", _request.uniqId);


            return htmlText;
        }

        public static string GenTicketHtmlStringToSendMail(DownloadTicketRequest _request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\muave_taive_bk20220128.html";
            //string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\taive_new_design.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", _request.qrString);
            htmlText = htmlText.Replace("[orderId]", _request.orderId);
            htmlText = htmlText.Replace("[placesName]", _request.placesName);
            //htmlText = htmlText.Replace("[adultQuantity]", _request.adultQuantity.ToString());
            //htmlText = htmlText.Replace("[childrenQuantity]", _request.childrenQuantity.ToString());
            htmlText = htmlText.Replace("[totalQuantity]", _request.totalQuantity.ToString());
            htmlText = htmlText.Replace("[email]", _request.email);
            htmlText = htmlText.Replace("[fullName]", _request.fullName);
            htmlText = htmlText.Replace("[phoneNumber]", _request.phoneNumber);
            htmlText = htmlText.Replace("[totalPrice]", _request.totalPrice.ToString());
            htmlText = htmlText.Replace("[uniqId]", _request.uniqId);


            return htmlText;
        }

        public static string GenTicketHtmlString(DownloadTicketRequest _request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\muave_taive_bk20220128.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", _request.qrString);
            htmlText = htmlText.Replace("[orderId]", _request.orderId);
            htmlText = htmlText.Replace("[placesName]", _request.placesName);
            //htmlText = htmlText.Replace("[adultQuantity]", _request.adultQuantity.ToString());
            //htmlText = htmlText.Replace("[childrenQuantity]", _request.childrenQuantity.ToString());
            htmlText = htmlText.Replace("[totalQuantity]", _request.totalQuantity.ToString());
            htmlText = htmlText.Replace("[email]", _request.email);
            htmlText = htmlText.Replace("[fullName]", _request.fullName);
            htmlText = htmlText.Replace("[phoneNumber]", _request.phoneNumber);
            htmlText = htmlText.Replace("[totalPrice]", _request.totalPrice.ToString());
            htmlText = htmlText.Replace("[uniqId]", _request.uniqId);


            return htmlText;
        }

        public static string CreateTicketHtmlString(DownloadTicketRequest _request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\muave_taive_bk20220128.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", _request.qrString);
            htmlText = htmlText.Replace("[orderId]", _request.orderId);
            htmlText = htmlText.Replace("[placesName]", _request.placesName);
            htmlText = htmlText.Replace("[adultQuantity]", _request.adultQuantity.ToString());
            htmlText = htmlText.Replace("[childrenQuantity]", _request.childrenQuantity.ToString());
            htmlText = htmlText.Replace("[totalQuantity]", _request.totalQuantity.ToString());
            htmlText = htmlText.Replace("[email]", _request.email);
            htmlText = htmlText.Replace("[fullName]", _request.fullName);
            htmlText = htmlText.Replace("[phoneNumber]", _request.phoneNumber);
            htmlText = htmlText.Replace("[totalPrice]", _request.totalPrice.ToString());
            htmlText = htmlText.Replace("[uniqId]", _request.uniqId);


            return htmlText;
        }

        public static string GenTicketHtmlPrintString(DownloadTicketRequest _request)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\inve.txt";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", _request.qrString);
            htmlText = htmlText.Replace("[orderId]", _request.orderId);
            htmlText = htmlText.Replace("[placesName]", _request.placesName);
            //htmlText = htmlText.Replace("[adultQuantity]", _request.adultQuantity.ToString());
            //htmlText = htmlText.Replace("[childrenQuantity]", _request.childrenQuantity.ToString());
            htmlText = htmlText.Replace("[totalQuantity]", _request.totalQuantity.ToString());
            htmlText = htmlText.Replace("[email]", _request.email);
            htmlText = htmlText.Replace("[fullName]", _request.fullName);
            htmlText = htmlText.Replace("[phoneNumber]", _request.phoneNumber);
            htmlText = htmlText.Replace("[totalPrice]", _request.totalPrice.ToString());
            htmlText = htmlText.Replace("[uniqId]", _request.uniqId);


            return htmlText;
        }

        public static string GenTicketHtmlPrintString_New(DownloadTicketRequest _request)
        {
            string dateIssue = $"{_request.orderId.Substring(6, 2)}/{_request.orderId.Substring(4, 2)}/{_request.orderId.Substring(0, 4)}";
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\inve_20220607.html";
            //string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\muave_inve_design_new.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", _request.qrString);
            htmlText = htmlText.Replace("[orderId]", _request.orderId);
            htmlText = htmlText.Replace("[placesName]", _request.placesName);
            htmlText = htmlText.Replace("[issue_date]", dateIssue);
            //htmlText = htmlText.Replace("[adultQuantity]", _request.adultQuantity.ToString());
            //htmlText = htmlText.Replace("[childrenQuantity]", _request.childrenQuantity.ToString());
            htmlText = htmlText.Replace("[totalQuantity]", _request.totalQuantity.ToString());
            htmlText = htmlText.Replace("[email]", _request.email);
            htmlText = htmlText.Replace("[fullName]", _request.fullName);
            htmlText = htmlText.Replace("[phoneNumber]", _request.phoneNumber);
            htmlText = htmlText.Replace("[totalPrice]", _request.totalPrice.ToString());
            htmlText = htmlText.Replace("[uniqId]", _request.uniqId);
            htmlText = htmlText.Replace("[customerTypeName]", _request.customerTypeName);

            byte[] imageArray = System.IO.File.ReadAllBytes(Directory.GetCurrentDirectory() + @"\HtmlTemplate\qrimg.png");
            string bgQRImage = Convert.ToBase64String(imageArray);
            htmlText = htmlText.Replace("[qr_bg_image]", bgQRImage);

            string icoName = "";
            if (_request.customerTypeId == 1)
            {
                icoName = "ico_nguoilon.png";
            }
            else if (_request.customerTypeId == 2)
            {
                icoName = "ico_treem.png";
            }
            else
            {
                icoName = "ico_chinhsach.png";
            }

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qRCodeInfo = qrGenerator.CreateQrCode(_request.qrString, QRCodeGenerator.ECCLevel.Q);
            QRCode qRCode = new QRCode(qRCodeInfo);
            //Bitmap qrBitMap = qRCode.GetGraphic(60);
            Bitmap qrBitMap = qRCode.GetGraphic(100, Color.Black, Color.White, (Bitmap)Bitmap.FromFile($"qrIcon/{icoName}"), 35);
            Bitmap resized = new Bitmap(qrBitMap, new Size(140, 140));
            byte[] bitmapArray = resized.BitmapToByteArray();
            string qrUri = $"data:image/png;base64,{Convert.ToBase64String(bitmapArray)}";
            htmlText = htmlText.Replace("[qr_image]", qrUri);

            return htmlText;
        }

        public static string HtmlTicket(string imgData)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\muave_taive.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            //htmlText = htmlText.Replace("[qrimage]", $"<img src='{imgData}' style='width: 65px; height: 65px' />");
            htmlText = htmlText.Replace("[qrimage]", imgData);
            //<img style="height: 65px;" src="images/logo.svg" alt="" />
            //htmlText = htmlText.Replace("[username]", "hihihehe");
            //htmlText = htmlText.Replace("[email]", "kuxidaica@gmail.com");
            return htmlText;
        }
        public static string GetHTMLString(string name, string email)
        {
            //var employees = DataStorage.GetAllEmployee();
            QRCodeGenerator QrGenerator = new QRCodeGenerator();
            QRCodeData QrCodeInfo = QrGenerator.CreateQrCode($"<{name}>|<{email}>", QRCodeGenerator.ECCLevel.Q);

            QRCode QrCode = new QRCode(QrCodeInfo);
            Bitmap QrBitmap = QrCode.GetGraphic(60);
            byte[] BitmapArray = QrBitmap.BitmapToByteArray();
            string QrUri = string.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapArray));

            string FilePath = Directory.GetCurrentDirectory() + "\\HtmlTemplate\\QRTemplate.html";
            StreamReader strReader = new StreamReader(FilePath);
            string htmlText = strReader.ReadToEnd();
            strReader.Close();
            htmlText = htmlText.Replace("[qrimage]", $"<img src='{QrUri}' style='width: 200px; height: 200px' />");
            htmlText = htmlText.Replace("[username]", name);
            htmlText = htmlText.Replace("[email]", email);
            return htmlText;

            /*
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <head>
                            </head>
                            <body>
                                <div class='header'><h1>This is the generated PDF report!!!</h1></div>
                                <table align='center'>
                                    <tr>
                                        <th>Name</th>
                                        <th>LastName</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                    </tr>");
            sb.Append(@"
                                </table>");
            sb.Append($"<img src='{QrUri}' style='width: 200px; height: 200px' />");
            sb.Append(@"
                            </body>
                        </html>");
            return sb.ToString();
            */
        }
    }
}
