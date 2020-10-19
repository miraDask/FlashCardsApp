using System.ComponentModel.DataAnnotations;

using static FlashCardsApp.Models.Validations.Deck;

namespace FlashCardsApp.Models.Decks
{
    public class UpdateDeckInputModel
    {
        public int Id { get; set; }

        [Required]
        [MinLength(NameMinLength)]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }
    }
}
