using Newtonsoft.Json;
using System;

namespace Cervus.Web.Extensions
{
    public static class ObjectExtensions
    {
        public static string ToJson(this object instance, 
            JsonSerializerSettings jsonSerializerSettings)
        {
            if (instance == null)
            {
                throw new ArgumentNullException(nameof(instance));
            }
            if (jsonSerializerSettings == null)
            {
                throw new ArgumentNullException(nameof(jsonSerializerSettings));
            }

            return JsonConvert.SerializeObject(instance, jsonSerializerSettings);
        }
    }
}
