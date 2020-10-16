using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace FlashCardsApp.Data.Models
{
    public class User : IdentityUser
    {
        public ICollection<Deck> Decks { get; set; }
    }
}
