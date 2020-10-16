using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using FlashCardsApp.Data;

using FlashCardsApp.Models.Decks;

namespace FlashCardsApp.Services.Decks
{
    public class DecksService : IDecksService
    {
        private readonly ApplicationDbContext dbContext;

        public DecksService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
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
