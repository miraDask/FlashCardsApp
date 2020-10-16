using System;

namespace FlashCardsApp.Data.Models.Base
{
    public interface IDeletableEntity : IEntity
    {
        bool IsDeleted { get; set; }

        DateTime? DeletedOn { get; set; }
    }
}
