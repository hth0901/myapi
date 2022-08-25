using API.DTOs;
using API.RequestEntity;
using API.Services;
using Application.Anh;
using Application.DiaDiem;
using Application.DiaDiemDaiNoi;
using Application.FileVideo;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public UserController(IWebHostEnvironment hostingEnvironment, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService) : base(hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        //[HttpPost("login")]
        //public async Task<ActionResult<UserDto>> Login(LoginDto _request)
        //{
        //    var user = await _userManager.FindByNameAsync(_request.Username);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //}
    }
}
