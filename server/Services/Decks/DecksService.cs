using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using server.Data;
using server.Models.Decks;
using server.Data.Models;

namespace server.Services.Decks
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

        public async Task<bool> DeleteAsync(int id)
        {
            var deck = await this.GetDeckByIdAsync(id);
            if (deck == null)
            {
                return false;
            }

            this.dbContext.Remove(deck);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<AllDecksServiceModel> GetAllAsync(string userId)
        {
            var decks = await this.dbContext
                .Decks
                .AsNoTracking()
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

        public async Task<string> GetDeckNameAsync(int id)
        => await this.dbContext
            .Decks
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => x.Name)
            .FirstOrDefaultAsync();

        public async Task<bool> UdateAsync(int id, string name, string description)
        {
            var deck = await this.GetDeckByIdAsync(id);

            if (deck == null)
            {
                return false;
            }

            deck.Name = name;
            deck.Description = description;

            this.dbContext.Update(deck);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Deck> GetDeckByIdAsync(int id)
         =>  await this.dbContext.Decks
            .AsNoTracking()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
    }
}
