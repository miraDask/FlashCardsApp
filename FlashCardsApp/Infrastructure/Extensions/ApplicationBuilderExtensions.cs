using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using FlashCardsApp.Data;
using FlashCardsApp.Data.Seeding;

namespace FlashCardsApp.Infrastructure.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<ApplicationDbContext>();

            dbContext.Database.Migrate();

            new ApplicationDbContextSeeder().SeedAsync(dbContext, services.ServiceProvider).GetAwaiter().GetResult();
        }
    }
}
