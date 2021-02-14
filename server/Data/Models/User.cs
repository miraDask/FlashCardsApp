using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace server.Data.Models
{
    public class User : IdentityUser
    {
        public ICollection<Deck> Decks { get; set; }
    }
}
