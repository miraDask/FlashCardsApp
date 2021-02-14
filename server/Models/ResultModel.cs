namespace server.Models
{
    public class ResultModel<T>
    {
        public bool Success { get; set; }

        public string Error { get; set; }

        public T Result { get; set; }
    }
}
