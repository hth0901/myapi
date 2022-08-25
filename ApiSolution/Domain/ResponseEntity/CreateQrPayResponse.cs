using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ResponseEntity
{
    public class CreateQrPayResponse
    {
        public string code { get; set; }
        public string message { get; set; }
        public string data { get; set; }
        public string url { get; set; }
        public string checksum { get; set; }
        public string isDelete { get; set; }
        public string idQrcode { get; set; }
    }
}

/*
{
    "code": "00",
    "message": "Success",
    "data": "000201010211262900069704360115068000000000005530370454062345675802VN5922TT Bảo tồn di tích Huế6005HANOI6105100006281011020220808080318TTBAOTONDITICH HUE052202301231115920220808020708200779730903AME63041214",
    "url": "",
    "checksum": "46260A5115847A2B4EAFA2019FDE500E",
    "isDelete": "true",
    "idQrcode": "1401964"
}
 */
