using System;

namespace server.Data.Models.Base
{
    public interface IEntity
    {
        DateTime CreatedOn { get; set; }

        DateTime? ModifiedOn { get; set; }
    }
}
