﻿using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using server.Data;
using server.Data.Models;
using server.Models.Cards;
using server.Services.Decks;

namespace server.Services.Cards
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

        public async Task<bool> CreateAsync(int deckId, string term, string definition)
        {
            var deckName = await this.decksService.GetDeckNameAsync(deckId);

            if (deckName == null)
            {
                return false;
            }

            var card = new Card
            {
                Term = term,
                Definition = definition,
                DeckId = deckId,
            };

            await this.dbContext.AddAsync(card);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var card = await this.GetCardByIdAsync(id);

            if (card == null)
            {
                return false;
            }

            this.dbContext.Remove(card);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<AllCardsServiceModel> GetAllAsync(int deckId)
        {
            var deckName = await this.decksService.GetDeckNameAsync(deckId);

            var cards = await this.dbContext
                .Cards
                .AsNoTracking()
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

        public async Task<bool> UdateAsync(int id, string term, string definition)
        {
            var card = await this.GetCardByIdAsync(id);

            if (card == null)
            {
                return false;
            }

            card.Term = term;
            card.Definition = definition;

            this.dbContext.Update(card);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Card> GetCardByIdAsync(int id)
            => await this.dbContext.Cards
            .AsNoTracking()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
    }
}
