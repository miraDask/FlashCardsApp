using System.Collections.Generic;

namespace FlashCardsApp.Models.Cards
{
    public class AllCardsServiceModel
    {
        public string DeckName { get; set; }

        public IEnumerable<CardServiceModel> Cards { get; set; }
    }
}
