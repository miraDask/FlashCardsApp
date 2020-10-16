using FlashCardsApp.Models.Decks;
using System.Threading.Tasks;

namespace FlashCardsApp.Services.Decks
{
    public interface IDecksService
    {
        Task<AllDecksServiceModel> GetAllAsync();
    }
}
