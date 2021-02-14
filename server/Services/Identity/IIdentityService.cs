using System.Threading.Tasks;
using server.Models;
using server.Models.Identity;

namespace server.Services.Identity
{
    public interface IIdentityService
    {
        Task<ResultModel<AuthResponseModel>> RegisterAsync(string userName, string password, string secret);

        Task<ResultModel<AuthResponseModel>> LoginAsync(string userName, string password, string secret);
    }
}
