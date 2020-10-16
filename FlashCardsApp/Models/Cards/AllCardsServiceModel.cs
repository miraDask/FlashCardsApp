using System.Collections.Generic;

namespace FlashCardsApp.Models.Cards
{
    public class AllCardsServiceModel
    {
        public IEnumerable<CardServiceModel> Cards { get; set; }
    }
}
