using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using FlashCardsApp.Models;
using FlashCardsApp.Models.Identity;
using FlashCardsApp.Services.Identity;

namespace FlashCardsApp.Controllers
{

    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService identityService;
        private readonly AppSettings appSettings;

        public IdentityController(
            IOptions<AppSettings> appSettings,
            IIdentityService identityService)
        {
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("api/user/register")]
        public async Task<ActionResult<AuthResponseModel>> Register([FromBody] UserRequestModel input)
        {
            var registerResult = await this.identityService.RegisterAsync(input.UserName, input.Password, this.appSettings.Secret);

            if (!registerResult.Success)
            {
                return this.BadRequest(
                new ErrorResponseModel
                {
                    Error = registerResult.Error,
                });
            }

            return registerResult.Result;
        }

        [HttpPost]
        [Route("api/user/login")]
        public async Task<ActionResult<AuthResponseModel>> Login([FromBody] UserRequestModel input)
        {
            var loginResult = await this.identityService.LoginAsync(input.UserName, input.Password, this.appSettings.Secret);

            if (!loginResult.Success)
            {
                return this.Unauthorized(new ErrorResponseModel
                {
                    Error = loginResult.Error,
                });
            }

            return loginResult.Result;
        }
    }
}
