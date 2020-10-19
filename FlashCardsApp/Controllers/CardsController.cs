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
            await this.cardsService.CreateAsync(deckId, input.Term, input.Definition);

            return this.Ok();
        }

        [HttpPatch]
        [Route("api/user/decks/{deckId}/cards")]
        public async Task<ActionResult> Update([FromBody] UpdateCardInputModel input)
        {
            await this.cardsService.UdateAsync(input.Id, input.Term, input.Definition);

            return this.Ok();
        }

        [HttpDelete]
        [Route("api/user/decks/{deckId}/cards")]
        public async Task<ActionResult> Delete([FromBody] DeleteCardInputModel input)
        {
            await this.cardsService.DeleteAsync(input.Id);

            return this.Ok();
        }
    }
}
