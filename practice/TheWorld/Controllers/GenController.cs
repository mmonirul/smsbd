using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NSwag;
using NSwag.CodeGeneration.TypeScript;
using NJsonSchema.CodeGeneration;
using NJsonSchema;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TheWorld.Controllers
{
    public class TypescriptPropertyNameGenerator : IPropertyNameGenerator
    {
        public virtual string Generate(JsonProperty property)
        {
            return property.Name;
            
        }
    }

    public class GenController : Controller
    {
        private IHostingEnvironment _env;

        public GenController(IHostingEnvironment env)
        {
            _env = env;
        }

        /// <summary>
        /// Generates typescript client for api...
        /// </summary>
        /// <returns></returns>
        public async Task<string> GenerateTsClient()
        {
            //Generate clients and compile TypeScript, only in debug mode.
#if DEBUG

            //Generate client for new api
            var document = await SwaggerDocument.FromUrlAsync("http://localhost:50008/swagger/v1/swagger.json");

            var settings = new SwaggerToTypeScriptClientGeneratorSettings
            {
                ClassName = "{controller}Client",
                Template = TypeScriptTemplate.JQueryPromises,
                OperationNameGenerator = new NSwag.CodeGeneration.OperationNameGenerators.MultipleClientsFromPathSegmentsOperationNameGenerator(),

                ClientBaseClass = "base.CoreApiBaseClient",
                ConfigurationClass = "base.CoreApiConfig",
                ImportRequiredTypes = true,
                UseTransformOptionsMethod = true,

                GenerateClientInterfaces = true,
                GenerateDtoTypes = true,
                GenerateOptionalParameters = true,
                GenerateClientClasses = true
            };
            settings.CodeGeneratorSettings.PropertyNameGenerator = new TypescriptPropertyNameGenerator();


            var generator = new SwaggerToTypeScriptClientGenerator(document, settings);
            var code = generator.GenerateFile();
            code = code.Insert(0, "import * as base from 'services/CoreApiBaseClient';\n");

            var webRoot = _env.WebRootPath;
            var file = System.IO.Path.Combine(webRoot, "TsClient/apiclients.ts");
            System.IO.File.WriteAllText(file, code);
            
#endif
            return "Ok";
        }

    }
}
