export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("basics", {
    description: "this is a skeleton plopfile",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name your resource: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/types.ts",
        templateFile: "templates/types.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/{{snakeCase name}}-service.ts",
        templateFile: "templates/service.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/{{snakeCase name}}-service-manager.ts",
        templateFile: "templates/service-manager.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/rest-api/{{snakeCase name}}-controller.ts",
        templateFile: "templates/controller.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/rest-api/{{snakeCase name}}-rest-api-server.ts",
        templateFile: "templates/rest-api-server.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/rest-api/{{snakeCase name}}-router.ts",
        templateFile: "templates/router.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/internal/{{snakeCase name}}-writer.ts",
        templateFile: "templates/writer.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/internal/{{snakeCase name}}-reader.ts",
        templateFile: "templates/reader.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/internal/{{snakeCase name}}-utils.ts",
        templateFile: "templates/utils.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/internal/store/{{snakeCase name}}-db.ts",
        templateFile: "templates/db.template.hbs",
      },
      {
        type: "add",
        path: "src/apps/backend/modules/{{snakeCase name}}/internal/store/{{snakeCase name}}-repository.ts",
        templateFile: "templates/repository.template.hbs",
      },
    ],
  });

  plop.setHelper("titleCase", (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  });

  plop.setHelper("snakeCase", (str) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-");
  });

  plop.setHelper("titleCase", (str) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      .join("");
  });

  plop.setHelper("camleCase", (str) => {
    const string = str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      .join("");
    return string.charAt(0).toLowerCase() + string.substr(1)
  });
}