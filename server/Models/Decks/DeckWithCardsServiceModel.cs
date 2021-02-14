using System.Collections.Generic;
using server.Models.Cards;

namespace server.Models.Decks
{
    public class DeckWithCardsServiceModel
    {
        public string Name { get; set; }

        public IEnumerable<AllCardsServiceModel> Cards { get; set; }
    }
}
