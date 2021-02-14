using System.ComponentModel.DataAnnotations;

using static server.Models.Validations.Card;

namespace server.Models.Cards
{
    public class UpdateCardInputModel
    {
        public int Id { get; set; }

        [Required]
        [MinLength(TermMinLength)]
        [MaxLength(TermMaxLength)]
        public string Term { get; set; }

        [Required]
        [MinLength(DefinitionMinLength)]
        [MaxLength(DefinitionMaxLength)]
        public string Definition { get; set; }
    }
}
