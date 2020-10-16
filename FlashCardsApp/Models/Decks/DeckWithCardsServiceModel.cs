using System.Collections.Generic;
using FlashCardsApp.Models.Cards;

namespace FlashCardsApp.Models.Decks
{
    public class DeckWithCardsServiceModel
    {
        public string Name { get; set; }

        public IEnumerable<AllCardsServiceModel> Cards { get; set; }
    }
}
