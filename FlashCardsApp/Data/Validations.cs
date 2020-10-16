namespace FlashCardsApp.Data
{
    public static class Validations
    {
        public static class Card
        {
            public const int TermMaxLength = 100;

            public const int DefinitionMaxLength = 300;
        }

        public static class Deck
        {
            public const int NameMaxLength = 100;

            public const int DescriptionMaxLength = 250;
        }
    }
}
