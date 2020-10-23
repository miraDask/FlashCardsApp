using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using FlashCardsApp.Models.Cards;
using FlashCardsApp.Services.Cards;

namespace FlashCardsApp.Controllers
{
    public class CardsController : ApiController
    {
        private readonly ICardsService cardsService;

        public CardsController(ICardsService cardsService)
        {
            this.cardsService = cardsService;
        }

        [HttpGet]
        [Route("api/user/decks/{deckId}/cards")]
        public async Task<ActionResult> GetAll(int deckId)
        {
            var allCards = await this.cardsService.GetAllAsync(deckId);

            return this.Ok(allCards);
        }

        [HttpPost]
        [Route("api/user/decks/{deckId}/cards")]
        public async Task<ActionResult> Create(int deckId, [FromBody] CreateCardInputModel input)
        {
            var success = await this.cardsService.CreateAsync(deckId, input.Term, input.Definition);

            if (!success)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        [HttpPatch]
        [Route("api/user/decks/{deckId}/cards")]
        public async Task<ActionResult> Update([FromBody] UpdateCardInputModel input)
        {
            var updateSuccess = await this.cardsService.UdateAsync(input.Id, input.Term, input.Definition);

            if (!updateSuccess)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        [HttpDelete]
        [Route("api/user/decks/{deckId}/cards")]
        public async Task<ActionResult> Delete([FromBody] DeleteCardInputModel input)
        {
            var deleteSuccess = await this.cardsService.DeleteAsync(input.Id);

            if (!deleteSuccess)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }
    }
}
