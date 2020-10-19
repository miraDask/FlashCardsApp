using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using FlashCardsApp.Data;
using FlashCardsApp.Models.Decks;
using FlashCardsApp.Data.Models;

namespace FlashCardsApp.Services.Decks
{
    public class DecksService : IDecksService
    {
        private readonly ApplicationDbContext dbContext;

        public DecksService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateAsync(string userId, string name, string description)
        {
            var deck = new Deck
            {
                Name = name,
                Description = description,
                CreatorId = userId,
            };

            await this.dbContext.AddAsync(deck);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var deck = await this.dbContext.Decks.Where(x => x.Id == id).FirstOrDefaultAsync();
            this.dbContext.Remove(deck);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<AllDecksServiceModel> GetAllAsync(string userId)
        {
            var decks = await this.dbContext
                .Decks
                .Where(x => x.CreatorId == userId)
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new DecksServiceModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                })
                .ToListAsync();

            return new AllDecksServiceModel() { Decks = decks };
        }

        public async Task UdateAsync(int id, string name, string description)
        {
            var deck = await this.dbContext.Decks.Where(x => x.Id == id).FirstOrDefaultAsync();
            deck.Name = name;
            deck.Description = description;

            this.dbContext.Update(deck);
            await this.dbContext.SaveChangesAsync();
        }
    }
}
