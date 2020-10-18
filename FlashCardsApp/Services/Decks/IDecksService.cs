using FlashCardsApp.Models.Decks;
using System.Threading.Tasks;

namespace FlashCardsApp.Services.Decks
{
    public interface IDecksService
    {
        Task<AllDecksServiceModel> GetAllAsync();

        Task CreateAsync(string userId, string name, string description);
    }
}
