namespace FlashCardsApp.Models
{
    public static class Validations
    {
        public static class Deck
        {
            public const int NameMinLength = 1;
            public const int NameMaxLength = 30;

            public const int DescriptionMaxLength = 300;
        }

        public static class Card
        {
            public const int TermMinLength = 1;
            public const int TermMaxLength = 100;

            public const int DefinitionMinLength = 1;
            public const int DefinitionMaxLength = 300;
        }
    }
}
