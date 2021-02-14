using System;

namespace server.Data.Models.Base
{
    public class DeletableEntity : Entity, IDeletableEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
