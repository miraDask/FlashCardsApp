using System.Linq;
using System.Threading.Tasks;

using FlashCardsApp.Data;
using FlashCardsApp.Data.Models;
using FlashCardsApp.Models.Cards;

using Microsoft.EntityFrameworkCore;

namespace FlashCardsApp.Services.Cards
{
    public class CardsService : ICardsService
    {
        private readonly ApplicationDbContext dbContext;

        public CardsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateAsync(int deckId, string term, string definition)
        {
            var card = new Card
            {
                Term = term,
                Definition = definition,
                DeckId = deckId,
            };

            await this.dbContext.AddAsync(card);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var card = await this.dbContext.Cards.Where(x => x.Id == id).FirstOrDefaultAsync();
            this.dbContext.Remove(card);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<AllCardsServiceModel> GetAllAsync(int deckId)
        {
            var cards = await this.dbContext
                .Cards
                .Where(x => x.DeckId == deckId)
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new CardServiceModel
                {
                    Id = x.Id,
                    Term = x.Term,
                    Definition = x.Definition,
                })
                .ToListAsync();

            return new AllCardsServiceModel() { Cards = cards };
        }

        public async Task UdateAsync(int id, string term, string definition)
        {
            var card = await this.dbContext.Cards.Where(x => x.Id == id).FirstOrDefaultAsync();
            card.Term = term;
            card.Definition = definition;

            this.dbContext.Update(card);
            await this.dbContext.SaveChangesAsync();
        }
    }
}
