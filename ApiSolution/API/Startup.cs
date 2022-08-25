using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using System.Reflection;
using Application;
using Application.Core;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.MiddleWare;
using Microsoft.Extensions.FileProviders;
using System.IO;
using API.PdfUltility;
using DinkToPdf.Contracts;
using DinkToPdf;
using API.Settings;
using System.Configuration;
using API.Services;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using VeDienTu.Hubs;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var context = new CustomAssemblyLoadContext();
            context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), "libwkhtmltox.dll"));
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            services.AddControllersWithViews().AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });

            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                    //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000/");
                });
            });

            services.Configure<MailSettings>(_config.GetSection("MailSettings"));
            services.Configure<VNP_Settings>(_config.GetSection("VNP_Settings"));
            services.Configure<MyQrSettings>(_config.GetSection("MyQrSettings"));
            services.AddTransient<IMailServices, MailServices>();

            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "admin-tool/build";
            });

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Logs/mylog-{Date}.txt");
            app.UseMiddleware<ExceptionMiddleWare>();

            //if (env.IsDevelopment())
            //{
            //    //app.UseDeveloperExceptionPage();
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            //}
            //app.UseSwagger();
            //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));

            app.UseHttpsRedirection();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "upload")),
                RequestPath = "/upload"
            });

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MessageHub>("/message");
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "admin-tool";

                //if (env.IsDevelopment())
                //{
                //    spa.UseReactDevelopmentServer(npmScript: "start");
                //}
            });
        }
    }
}
