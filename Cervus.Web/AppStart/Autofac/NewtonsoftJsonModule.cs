using Autofac;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Cervus.Web.AppStart.Autofac
{
    public class NewtonsoftJsonModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new CamelCaseJsonSerializerSettings();

            builder
                .RegisterInstance(settings)
                .AsSelf()
                .SingleInstance();
        }

        private class CamelCaseJsonSerializerSettings : DefaultContractResolver
        {
            protected override string ResolvePropertyName(string propertyName)
            {
                var firstLetterLowerCase = propertyName[0].ToString().ToLowerInvariant();
                var restOfTheWord = propertyName.Substring(1);

                return $"{firstLetterLowerCase}{restOfTheWord}";
            }
        }
    }
}
