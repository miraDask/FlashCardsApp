using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using server.Data.Models;
using server.Models.Decks;
using server.Services.Decks;

namespace server.Controllers
{
    public class DecksController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IDecksService decksService;

        public DecksController(UserManager<User> userManager, IDecksService decksService)
        {
            this.userManager = userManager;
            this.decksService = decksService;
        }

        [HttpPost]
        [Route("api/user/decks")]
        public async Task<ActionResult> Create([FromBody] CreateDeckInputModel input)
        {
            var userId = this.userManager.GetUserId(this.User);

            await this.decksService.CreateAsync(userId, input.Name, input.Description);

            return this.Ok();
        }

        [HttpGet]
        [Route("api/user/decks")]
        public async Task<ActionResult> GetAll()
        {
            var userId = this.userManager.GetUserId(this.User);

            var allDeckModel = await this.decksService.GetAllAsync(userId);

            return this.Ok(allDeckModel);
        }

        [HttpPatch]
        [Route("api/user/decks")]
        public async Task<ActionResult> Update([FromBody]UpdateDeckInputModel input)
        {
            var updateSuccess = await this.decksService.UdateAsync(input.Id, input.Name, input.Description);

            if (!updateSuccess)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        [HttpDelete]
        [Route("api/user/decks")]
        public async Task<ActionResult> Delete([FromBody] DeleteDeckInputModel input)
        {
            var deleteSuccess = await this.decksService.DeleteAsync(input.Id);

            if (!deleteSuccess)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }
    }
}
