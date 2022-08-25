﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ReceiptConfig
    {
        public int Id { get; set; }
        public string TaiKhoanPhatHanh { get; set; }
        public string MatKhauPhatHanh { get; set; }
        public string TaiKhoanDichVu { get; set; }
        public string MatKhauDichVu { get; set; }
        public string PublishServiceUrl { get; set; }
        public string PortalServiceUrl { get; set; }
        public string BusinessServiceUrl { get; set; }
        
    }
}
