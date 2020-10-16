using System.Threading.Tasks;
using FlashCardsApp.Models;
using FlashCardsApp.Models.Identity;

namespace FlashCardsApp.Services.Identity
{
    public interface IIdentityService
    {
        Task<ResultModel<AuthResponseModel>> RegisterAsync(string userName, string password, string secret);

        Task<ResultModel<AuthResponseModel>> LoginAsync(string userName, string password, string secret);
    }
}
