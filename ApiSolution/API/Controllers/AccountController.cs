using Domain;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
//
using API.RequestEntity;
using Application.NguoiDung;
//using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.IO;
using System.Threading;
using System.Security.Cryptography;
using System.Text;
using MediatR;
using RestSharp;
using Application.PhanQuyen;
using Application.NhomVaiTro;
using Domain.RequestEntity;

namespace API.Controllers
{
    //[ApiController]
    //[Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IPasswordHasher<AppUser> _passwordHash;

        public AccountController(IWebHostEnvironment hostingEnvironment, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, IPasswordHasher<AppUser> passwordHash) : base(hostingEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _hostingEnvironment = hostingEnvironment;
            _passwordHash = passwordHash;
        }

        //[HttpGet]
        //public async Task<>

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
                return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                var userRole = Mediator.Send(new TruyVanPhanQuyenCuaNguoiDung.Query { username = loginDto.Username });

                return new UserDto
                {
                    DisplayName = user.UserName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    //Token = "day la cai token",
                    Username = user.UserName,
                    RoleId = userRole.Result.Value.RoleId
                };
            }

            return Unauthorized();
        }

        [HttpGet("danhsachvaitro")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachVaiTro(CancellationToken ct)
        {
            var lstResult = await Mediator.Send(new DanhSachVaiTro.Query(), ct);
            return HandlerResult(lstResult);
        }

        [HttpGet("danhsachvaitrotheomenu/{menuid}")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachVaiTroTheoMenu(int menuid, CancellationToken ct)
        {
            var lstResult = await Mediator.Send(new DanhSachPhanQuyenTheoMenu.Query { MenuId = menuid });
            return HandlerResult(lstResult);
        }

        [HttpPost]
        [Route("themphanquyen")]
        public async Task<IActionResult> ThemPhanQuyen(Authorize authorize)
        {
            var result = await Mediator.Send(new ThemPhanQuyenTrenMenu.Command { Entity = authorize });
            return HandlerResult(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("editaccount")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountRequest _request)
        {
            AppUser user = await _userManager.FindByIdAsync(_request.id);
            if (user != null)
            {
                user.PasswordHash = _passwordHash.HashPassword(user, _request.password);
                IdentityResult result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    var updateRole = await Mediator.Send(new CapNhatiVaiTroNguoiDung.Command { roleid = _request.roleid, username = _request.username });
                    return Ok();
                }
                return BadRequest("Cap nhat khong thanh cong");
            }
            return BadRequest("Cap nhat khong thanh cong");
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePassWord([FromBody] UpdateAccountRequest _request)
        {
            AppUser user = await _userManager.FindByIdAsync(_request.id);
            if (user != null)
            {
                user.PasswordHash = _passwordHash.HashPassword(user, _request.password);
                IdentityResult result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    //var updateRole = await Mediator.Send(new CapNhatiVaiTroNguoiDung.Command { roleid = _request.roleid, username = _request.username });
                    return Ok();
                }
                return BadRequest("Cap nhat khong thanh cong");
            }
            return BadRequest("Cap nhat khong thanh cong");
        }

        [HttpDelete]
        [Route("xoaphanquyen/{id}")]
        public async Task<IActionResult> XoaPhanQuyen(int id)
        {
            var result = await Mediator.Send(new XoaPhanQuyenTrenMenu.Command { Id = id });
            return HandlerResult(result);
        }

        [HttpPost("regisgeruser")]
        public async Task<ActionResult<UserDto>> RegisterUser(RegisterRequest _request)
        {
            var registerDto = new RegisterDto()
            {
                Email = _request.UserName + "@gmail.com",
                DisplayName = _request.FullName,
                Username = _request.UserName,
                Password = _request.Password
            };

            if (await _userManager.Users.AnyAsync(item => item.Email == registerDto.Email) || await _userManager.Users.AnyAsync(item => item.UserName == registerDto.Username))
            {
                return BadRequest("Email hoặc tên đăng nhập đã tồn tại");
            }

            var user = new AppUser
            {
                Displayname = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                var objRole = new MyUserRoles { RoleId = 5, UserName = _request.UserName };
                var createRoles = await Mediator.Send(new ThemMoiVaiTroNguoiDung.Command { Entity = objRole });

                return new UserDto
                {
                    DisplayName = user.Displayname,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
            }

            return BadRequest("Có lỗi khi tạo tài khoản này");
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Resgister(Employee _employee )           
        {
            var registerDto = new RegisterDto()
            {
                Email = _employee.UserName+"@gmail.com",
                DisplayName = _employee.FullName,
                Username = _employee.UserName,
                Password = _employee.PassWord               
            };
            if (await _userManager.Users.AnyAsync(item => item.Email == registerDto.Email))
            {
                return BadRequest("Email đã tồn tại");
            }
            if (await _userManager.Users.AnyAsync(item => item.UserName == registerDto.Username))
            {
                return BadRequest("Tên đăng nhập đã tồn tại");
            }
            var user = new AppUser
            {
                Displayname = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                var objRole = new MyUserRoles { RoleId = _employee.RoleID, UserName = _employee.UserName };
                var createRoles = await Mediator.Send(new ThemMoiVaiTroNguoiDung.Command { Entity = objRole });

                return new UserDto
                {
                    DisplayName = user.Displayname,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
            }
            return BadRequest("Có lỗi khi tạo tài khoản này");                     
        }       
    }
}
