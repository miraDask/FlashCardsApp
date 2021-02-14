using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using server.Data.Models.Base;

using static server.Data.Validations.Deck;

namespace server.Data.Models
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
