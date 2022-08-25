using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Displayname = "kdc",
                        UserName = "kdc",
                        Email = "kdc@email.com"
                    },
                    new AppUser
                    {
                        Displayname = "super",
                        UserName = "super",
                        Email = "super@email.com"
                    }
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Kdc123#@!");
                }
            }

            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "hieuht",
                    Content = "hjieuht test"
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
