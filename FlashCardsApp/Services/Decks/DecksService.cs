using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using FlashCardsApp.Data;

using FlashCardsApp.Models.Decks;
using FlashCardsApp.Models;
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

        public async Task<AllDecksServiceModel> GetAllAsync()
        {
            var decks = await this.dbContext
                .Decks
                .Select(x => new DecksServiceModel
                {
                    Name = x.Name,
                    Description = x.Description,
                })
                .ToListAsync();

            return new AllDecksServiceModel() { Decks = decks };
        }
    }
}
