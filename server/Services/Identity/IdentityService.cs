using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

using server.Data.Models;
using server.Models;
using server.Models.Identity;

using static server.Services.Constants.Errors;

namespace server.Services.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> userManager;

        public IdentityService(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<ResultModel<AuthResponseModel>> LoginAsync(string username, string password, string secret)
        {
            var user = await this.userManager.FindByNameAsync(username);
            if (user == null)
            {
                return new ResultModel<AuthResponseModel>
                {
                    Error = InvalidLoginAttempt,
                };
            }

            var passwordIsValid = await this.userManager.CheckPasswordAsync(user, password);

            if (!passwordIsValid)
            {
                return new ResultModel<AuthResponseModel>
                {
                    Error = InvalidLoginAttempt,
                };
            }

            var token = this.GenerateJwtToken(user.Id, secret);

            return new ResultModel<AuthResponseModel>
            {
                Result = new AuthResponseModel
                {
                    Token = token,
                },
                Success = true,
            };
        }

        public async Task<ResultModel<AuthResponseModel>> RegisterAsync(string username, string password, string secret)
        {
            var existingUser = await this.userManager.FindByNameAsync(username);

            if (existingUser != null)
            {
                return new ResultModel<AuthResponseModel>
                {
                    Error= string.Format(UserNameExists, username),
                };
            }

            var user = new User()
            {
                UserName = username,
            };

            var registerAtempt = await this.userManager.CreateAsync(user, password);

            if (!registerAtempt.Succeeded)
            {
                return new ResultModel<AuthResponseModel>
                {
                    Error = registerAtempt.Errors.Select(x => x.Description).FirstOrDefault(),
                };
            }

            var token = this.GenerateJwtToken(user.Id, secret);

            return new ResultModel<AuthResponseModel>
            {
                Result = new AuthResponseModel
                {
                    Token = token,
                },
                Success = true,
            };
        }

        private string GenerateJwtToken(string userId, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var identityClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(identityClaims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }
    }
}
