using System;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using server.Data.Models;

namespace server.Data.Seeding
{
    public class DataSeeder : ISeeder
    {
        private const string FirstUserPassword = "123456";
        private const string FirstUserEmail = "user@user.com";
        private const string FirstUserUserName = "firstUser";
        private const string DeckName = "Deck {0}";
        private const string DeckDescription = "Description for deck {0}";
        private const string CardTerm = "Term {0}";
        private const string CardDefinition = "Definition for card {0}";

        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            var firstUserId = await CreateFirstUser(userManager, FirstUserUserName, FirstUserEmail, FirstUserPassword);

            if (!dbContext.Decks.Any())
            {
                await CreateDecks(firstUserId, dbContext);
                await CreateCardsForFirstDeck(dbContext);
            }
        }

        private async Task CreateCardsForFirstDeck(ApplicationDbContext dbContext)
        {
            var deck = await dbContext.Decks.FirstAsync();

            for (int i = 1; i <= 6; i++)
            {
                var card = new Card
                {
                    DeckId = deck.Id,
                    Term = String.Format(CardTerm, i),
                    Definition = String.Format(CardDefinition, i),
                };

                await dbContext.AddAsync(card);
            }

            await dbContext.SaveChangesAsync();
        }

        private async Task CreateDecks(string firstUserId, ApplicationDbContext dbContext)
        {
            for (int i = 1; i <= 3; i++)
            {
                var deck = new Deck
                {
                    CreatorId = firstUserId,
                    Name = String.Format(DeckName, i),
                    Description = String.Format(DeckDescription, i),
                };

                await dbContext.AddAsync(deck);
            }

            await dbContext.SaveChangesAsync();
        }

        private static async Task<string> CreateFirstUser(
           UserManager<User> userManager,
           string userName,
           string email, string password)
        {
            var user = new User
            {
                UserName = userName,
                Email = email,
            };

            if (!userManager.Users.Any())
            {
                await userManager.CreateAsync(user, password);
            }

            return user.Id;
        }
    }
}
