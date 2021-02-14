using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

using server.Data.Models;
using server.Models.Decks;
using server.Services.Decks;

namespace Tests
{
    public class DecksServiseTests : TestBase
    {
        private IDecksService Service => this.ServiceProvider.GetRequiredService<IDecksService>();

        [Fact]
        public async Task CreateAsync_ShouldCreateNewDeckInDb()
        {
            var creatorId = Guid.NewGuid().ToString();
            var deckName = "Test deck";
            var deckDescription = "this is test deck";
            await this.Service.CreateAsync(creatorId, deckName, deckDescription);

            var deck = await this.DbContext.Decks.FirstOrDefaultAsync();
            var deckCount = await this.DbContext.Decks.CountAsync();

            Assert.Equal(1, deckCount);
            Assert.Equal(deckName, deck.Name);
            Assert.Equal(deckDescription, deck.Description);
        }

        [Fact]
        public async Task UpdateAsync_ShouldReturnFalseIfNotExistingDeckIdIsPassed()
        {
            var deckNewName = "Test deck";
            var deckNewDescription = "this is test deck";
            var success = await this.Service.UdateAsync(1, deckNewName, deckNewDescription);

            Assert.False(success);
        }

        [Fact]
        public async Task UpdateAsync_ShouldReturnTrueOnSuccess()
        {
            var deckId = await this.CreateDeckAsync("test", "test");

            var deckNewName = "Test deck 1";
            var deckNewDescription = "this is test for deck 1";
            var success = await this.Service.UdateAsync(deckId, deckNewName, deckNewDescription);
            var updatedDeck = await this.DbContext.Decks.Where(x => x.Id == deckId).FirstOrDefaultAsync();

            Assert.Equal(deckNewName, updatedDeck.Name);
            Assert.Equal(deckNewDescription, updatedDeck.Description);
            Assert.True(success);
        }

        [Fact]
        public async Task DeleteAsync_ShouldReturnFalseIfNotExistingDeckIdIsPassed()
        {
            var success = await this.Service.DeleteAsync(1);

            Assert.False(success);
        }

        [Fact]
        public async Task DeleteAsync_ShouldReturnTrueOnSuccess()
        {
            var deckId = await this.CreateDeckAsync("test", "test");

            var success = await this.Service.DeleteAsync(deckId);
            var deletedDeck = await this.DbContext.Decks.Where(x => x.Id == deckId).FirstOrDefaultAsync();

            Assert.Null(deletedDeck);
            Assert.True(success);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnCorrectModel()
        {
            var userId = Guid.NewGuid().ToString();
            var deckName = "Test deck 1";
            var deckDescription = "this is test for deck 1";
            
            await this.CreateDeckAsync(deckName, deckDescription, userId);

            var resultModel = await this.Service.GetAllAsync(userId);
            var resultDeck = resultModel.Decks.FirstOrDefault();

            Assert.IsAssignableFrom<AllDecksServiceModel>(resultModel);
            Assert.IsAssignableFrom<DecksServiceModel>(resultDeck);
            Assert.Equal(deckName, resultDeck.Name);
            Assert.Equal(deckDescription, resultDeck.Description);
        }

        [Fact]
        public async Task GetDeckNameAsync_ShouldReturnCorrectName()
        {
            var deckName = "Test deck 1";
            var deckDescription = "this is test for deck 1";

            var deckId = await this.CreateDeckAsync(deckName, deckDescription);

            var resultName = await this.Service.GetDeckNameAsync(deckId);

            Assert.Equal(deckName, resultName);
        }

        [Fact]
        public async Task GetDeckNameAsync_ShouldReturnNullIfNotExistingDeckIdIsPassed()
        {
            var resultName = await this.Service.GetDeckNameAsync(1);

            Assert.Null(resultName);
        }


        private async Task<int> CreateDeckAsync(string name, string description, string creatorId = null)
        {
            if (creatorId == null)
            {
                creatorId = Guid.NewGuid().ToString();
            }

            var deck = new Deck
            {
                Name = name,
                Description = description,
                CreatorId = creatorId,
            };

            await this.DbContext.Decks.AddAsync(deck);
            await this.DbContext.SaveChangesAsync();
            this.DbContext.Entry<Deck>(deck).State = EntityState.Detached;

            return deck.Id;
        }
    }
}
