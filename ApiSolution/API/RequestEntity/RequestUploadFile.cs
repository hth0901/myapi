using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestEntity
{
    public class RequestUploadFile
    {
        public List<IFormFile> files { get; set; } = new List<IFormFile>();
        public string data { get; set; }
        public List<IFormFile> videos { get; set; } = new List<IFormFile>();

    }
}
