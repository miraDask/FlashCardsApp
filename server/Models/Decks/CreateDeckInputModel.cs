using System.ComponentModel.DataAnnotations;

using static server.Models.Validations.Deck;

namespace server.Models.Decks
{
    public class CreateDeckInputModel
    {
        [Required]
        [MinLength(NameMinLength)]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }
    }
}
