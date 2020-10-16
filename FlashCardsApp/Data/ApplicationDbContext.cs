using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using FlashCardsApp.Data.Models;
using FlashCardsApp.Data.Models.Base;

namespace FlashCardsApp.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }

        public DbSet<Deck> Decks { get; set; }

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            this.ApplyAuditInformation();

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Deck>()
                .HasQueryFilter(x => !x.IsDeleted)
                .HasMany(x => x.Cards)
                .WithOne(x => x.Deck)
                .HasForeignKey(x => x.DeckId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Entity<User>()
                .HasMany(x => x.Decks)
                .WithOne(x => x.Creator)
                .HasForeignKey(x => x.CreatorId);

            builder
                .Entity<Card>()
                .HasQueryFilter(x => !x.IsDeleted)
                .HasOne(x => x.Deck)
                .WithMany(x => x.Cards)
                .HasForeignKey(x => x.DeckId)
                .OnDelete(DeleteBehavior.Restrict);
                
            base.OnModelCreating(builder);
        }

        private void ApplyAuditInformation()
        {
            var entries = this.ChangeTracker
                .Entries()
                .ToList();

            foreach (var entry in entries)
            {

                if (entry.Entity is IDeletableEntity deletableEntity)
                {
                    if (entry.State == EntityState.Deleted)
                    {
                        deletableEntity.DeletedOn = DateTime.UtcNow;
                        deletableEntity.IsDeleted = true;

                        entry.State = EntityState.Modified;

                        return;
                    }
                }

                if (entry.Entity is IEntity entity)
                {
                    if (entry.State == EntityState.Added)
                    {
                        entity.CreatedOn = DateTime.UtcNow;
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        entity.ModifiedOn = DateTime.UtcNow;
                    }
                }
            }
        }
    }
}
