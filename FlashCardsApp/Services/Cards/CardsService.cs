using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using FlashCardsApp.Data;
using FlashCardsApp.Data.Models;
using FlashCardsApp.Models.Cards;
using FlashCardsApp.Services.Decks;

namespace FlashCardsApp.Services.Cards
{
    public class CardsService : ICardsService
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IDecksService decksService;

        public CardsService(ApplicationDbContext dbContext, IDecksService decksService)
        {
            this.dbContext = dbContext;
            this.decksService = decksService;
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
            var deckName = await this.decksService.GetDeckNameAsync(deckId);

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

            return new AllCardsServiceModel()
            { 
                DeckName = deckName,
                Cards = cards 
            };
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
