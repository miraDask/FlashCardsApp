using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using FlashCardsApp.Data.Models.Base;

using static FlashCardsApp.Data.Validations.Deck;

namespace FlashCardsApp.Data.Models
{
    public class Deck : DeletableEntity
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public User Creator { get; set; }

        public string CreatorId { get; set; }

        public ICollection<Card> Cards { get; set; }
    }
}
