using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Backend.Models
{
    public class DateFormatConverter : IsoDateTimeConverter
    {
        public DateFormatConverter()
        {
            base.DateTimeFormat  = "yyyy-MM-dd"; ;
        }
    }
}
