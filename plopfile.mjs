export default (plop) => {
    plop.setGenerator("module", {
        description: "Generate a new module",
        prompts: [
            {
                type: "input",
                name: "moduleName",
                message: "Enter the module name:",
            },
            {
                type: "input",
                name: "baseUrl",
                message: "Enter the base url for the module: (default: 'kebabCase(moduleName)s')",
                default: (answers)=>`${answers.moduleName.toLowerCase().replace(/\s+/g, "-")+'s'}`
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/index.ts",
                templateFile: "templates/index.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/types.ts",
                templateFile: "templates/types.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/{{kebabCase moduleName}}-service.ts",
                templateFile: "templates/service.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/internal/store/{{kebabCase moduleName}}-db.ts",
                templateFile: "templates/db.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/internal/store/{{kebabCase moduleName}}-repository.ts",
                templateFile: "templates/repository.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/internal/{{kebabCase moduleName}}-reader.ts",
                templateFile: "templates/reader.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/internal/{{kebabCase moduleName}}-writer.ts",
                templateFile: "templates/writer.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/internal/{{kebabCase moduleName}}-util.ts",
                templateFile: "templates/util.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/rest-api/{{kebabCase moduleName}}-controller.ts",
                templateFile: "templates/controller.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/rest-api/{{kebabCase moduleName}}-router.ts",
                templateFile: "templates/router.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/rest-api/{{kebabCase moduleName}}-serializer.ts",
                templateFile: "templates/serializer.template.hbs",
            },
            {
                type: "add",
                path: "src/apps/backend/modules/{{kebabCase moduleName}}/rest-api/{{kebabCase moduleName}}-server.ts",
                templateFile: "templates/server.template.hbs",
            },
            {
                type: "modify",
                path: "src/apps/backend/app.ts",
                pattern: /(\/\/Module imports)/g,
                template: `$1\nimport { {{pascalCase moduleName}}Server } from './modules/{{kebabCase moduleName}}';`,
            },
            {
                type: "modify",
                path: "src/apps/backend/app.ts",
                pattern: /(\/\/ Module servers)/g,
                template: `$1\n\t\t\t{\n\t\t\t\tserverInstance: new {{pascalCase moduleName}}Server(),\n\t\t\t\trootFolderPath: path.join(__dirname, 'modules/{{kebabCase moduleName}}'),\n\t\t\t},`,
            },                        
        ],
    });
    plop.setHelper("kebabCase", (text) => {
        return text.toLowerCase().replace(/\s+/g, "-");
    });
};
