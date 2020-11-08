using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Xunit;

using FlashCardsApp.Services.Cards;
using FlashCardsApp.Data.Models;
using FlashCardsApp.Models.Cards;

namespace Tests
{
    public class CardsServiceTests : Testsbase
    {
        private ICardsService Service => this.ServiceProvider.GetRequiredService<ICardsService>();

        [Fact]
        public async Task CreateAsync_ShouldCreateNewCardInDb()
        {
            var term = "term";
            var definition = "this is test";
            var deckId = await this.CreateDeckAsync();

            var success = await this.Service.CreateAsync(deckId, term, definition);

            var card = await this.DbContext.Cards.FirstOrDefaultAsync();
            var cardsCount = await this.DbContext.Cards.CountAsync();

            Assert.True(success);
            Assert.Equal(1, cardsCount);
            Assert.Equal(term, card.Term);
            Assert.Equal(definition, card.Definition);
        }

        [Fact]
        public async Task CreateAsync_ShouldReturnFalseIfNotExistingDeckIdIsPassed()
        {
            var term = "term";
            var definition = "this is test";
            var success = await this.Service.CreateAsync(1, term, definition);

            Assert.False(success);
        }

        [Fact]
        public async Task UpdateAsync_ShouldReturnFalseIfNotExistingCardIdIsPassed()
        {
            var term = "term";
            var definition = "this is test";
            var success = await this.Service.UdateAsync(1, term, definition);

            Assert.False(success);
        }

        [Fact]
        public async Task UpdateAsync_ShouldReturnTrueOnSuccess()
        {
            var deckId = await this.CreateDeckAsync();
            var cardId = await this.CreateCardAsync(deckId);

            var cardUpdatedTerm = "Test deck 1";
            var cardUpdatedDefinition = "this is test for deck 1";
            var success = await this.Service.UdateAsync(cardId, cardUpdatedTerm, cardUpdatedDefinition);
            var updatedCard = await this.DbContext.Cards.Where(x => x.Id == deckId).FirstOrDefaultAsync();

            Assert.Equal(cardUpdatedTerm, updatedCard.Term);
            Assert.Equal(cardUpdatedDefinition, updatedCard.Definition);
            Assert.True(success);
        }

        [Fact]
        public async Task DeleteAsync_ShouldReturnFalseIfNotExistingCardIdIsPassed()
        {
            var success = await this.Service.DeleteAsync(32);

            Assert.False(success);
        }

        [Fact]
        public async Task DeleteAsync_ShouldReturnTrueOnSuccess()
        {
            var deckId = await this.CreateDeckAsync();
            var cardId = await this.CreateCardAsync(deckId);

            var success = await this.Service.DeleteAsync(cardId);
            var deletedCard = await this.DbContext.Cards.Where(x => x.Id == cardId).FirstOrDefaultAsync();

            Assert.Null(deletedCard);
            Assert.True(success);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnCorrectModel()
        {
            var deckName = "test deck";
            var term = "term";
            var definition = "this is test";

            var deckId = await this.CreateDeckAsync(deckName);
            await this.CreateCardAsync(deckId, term, definition);

            var resultModel = await this.Service.GetAllAsync(deckId);
            var resultDeckName = resultModel.DeckName;
            var resultCard = resultModel.Cards.FirstOrDefault();

            Assert.IsAssignableFrom<AllCardsServiceModel>(resultModel);
            Assert.IsAssignableFrom<CardServiceModel>(resultCard);
            Assert.Equal(deckName, resultDeckName);
            Assert.Equal(term, resultCard.Term);
            Assert.Equal(definition, resultCard.Definition);
        }

        private async Task<int> CreateDeckAsync(string name = null)
        {
            var deck = new Deck
            {
                Name = name ?? "test deck",
                Description = "test",
                CreatorId = Guid.NewGuid().ToString(),
            };

            await this.DbContext.Decks.AddAsync(deck);
            await this.DbContext.SaveChangesAsync();
            this.DbContext.Entry<Deck>(deck).State = EntityState.Detached;

            return deck.Id;
        }

        private async Task<int> CreateCardAsync(int deckId, string term = null, string definition = null)
        {
            var card = new Card
            {
                Term = term ?? "test term",
                Definition = definition ?? "test definition",
                DeckId = deckId,
            };

            await this.DbContext.Cards.AddAsync(card);
            await this.DbContext.SaveChangesAsync();
            this.DbContext.Entry<Card>(card).State = EntityState.Detached;

            return card.Id;
        }
    }
}
