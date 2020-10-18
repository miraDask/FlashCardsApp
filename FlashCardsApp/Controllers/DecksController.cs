using FlashCardsApp.Data.Models;
using FlashCardsApp.Models.Decks;
using FlashCardsApp.Services.Decks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FlashCardsApp.Controllers
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
        public async Task<ActionResult> Create([FromBody] DeckInputModel input)
        {
            var userId = this.userManager.GetUserId(this.User);

            await this.decksService.CreateAsync(userId, input.Name, input.Description);

            return this.Ok();
        }
    }
}
