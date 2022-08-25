using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            // Bỏ tiền tố AspNet của các bảng: mặc định
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName();
                if (tableName.StartsWith("AspNet"))
                {
                    entityType.SetTableName(tableName.Substring(6));
                }
            }          
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<MyRoles> MyRoles { get; set; }
        public DbSet<Authorize> Authorize { get; set; }
        public DbSet<Image> Image { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<TicketDetail> TicketDetail { get; set; }
        public DbSet<MyUserRoles> MyUserRoles { get; set; }
        public DbSet<EmailConfig> EmailConfig { get; set; }
        public DbSet<ReceiptInfo> ReceiptInfo { get; set; }
        public DbSet<ReceiptConfig> ReceiptConfig { get; set; }
        public DbSet<FeedbackReplyTemplate> FeedbackReplyTemplate { get; set; }
        public DbSet<UpdatePaymentStatusLog> UpdatePaymentStatusLog { get; set; }
        public DbSet<UpdatePaymentStatusLogDetail> UpdatePaymentStatusLogDetail { get; set; }
        public DbSet<ReceiptTemplateConfig> ReceiptTemplateConfig { get; set; }
        public DbSet<TicketOrder> TicketOrder { get; set; }
    }
}
