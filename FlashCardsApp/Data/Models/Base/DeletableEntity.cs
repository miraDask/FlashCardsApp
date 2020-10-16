using System;

namespace FlashCardsApp.Data.Models.Base
{
    public class DeletableEntity : Entity, IDeletableEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
