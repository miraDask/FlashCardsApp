using System.Threading.Tasks;

using FlashCardsApp.Models.Decks;

namespace FlashCardsApp.Services.Decks
{
    public interface IDecksService
    {
        Task<AllDecksServiceModel> GetAllAsync(string userId);

        Task CreateAsync(string userId, string name, string description);

        Task UdateAsync(int id, string name, string description);

        Task DeleteAsync(int id);
    }
}
