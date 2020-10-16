using System.ComponentModel.DataAnnotations;

using FlashCardsApp.Data.Models.Base;

using static FlashCardsApp.Data.Validations.Card;

namespace FlashCardsApp.Data.Models
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
