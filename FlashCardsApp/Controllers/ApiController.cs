using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlashCardsApp.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ApiController : ControllerBase
    {
    }
}
