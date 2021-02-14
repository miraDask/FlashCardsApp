using System.ComponentModel.DataAnnotations;

using server.Data.Models.Base;

using static server.Data.Validations.Card;

namespace server.Data.Models
{
    public class Card : DeletableEntity
    {
        public int Id { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [MaxLength(TermMaxLength)]
        public string Term { get; set; }
        
        [Required]
        [MaxLength(DefinitionMaxLength)]
        public string Definition { get; set; }

        public Deck Deck { get; set; }

        public int DeckId { get; set; }
    }
}
