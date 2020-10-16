using System.Collections.Generic;

namespace FlashCardsApp.Models.Decks
{
    public class AllDecksServiceModel
    {
        public IEnumerable<DecksServiceModel> Decks { get; set; }
    }
}
