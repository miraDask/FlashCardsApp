using System.Collections.Generic;

namespace server.Models.Decks
{
    public class AllDecksServiceModel
    {
        public IEnumerable<DecksServiceModel> Decks { get; set; }
    }
}
