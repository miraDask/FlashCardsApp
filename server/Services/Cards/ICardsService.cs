using System.Threading.Tasks;

using server.Models.Cards;

namespace server.Services.Cards
{
    public interface ICardsService
    {
        Task<AllCardsServiceModel> GetAllAsync(int deckId);

        Task<bool> CreateAsync(int deckId, string term, string definition);

        Task<bool> UdateAsync(int id, string term, string definition);

        Task<bool> DeleteAsync(int id);
    }
}
