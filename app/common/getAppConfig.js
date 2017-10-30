const fs = require('fs');
const rootRequireDir = '../../..';
const { rootFileDir } = require('./getRootFileDir');
const appConfig = require(`${rootRequireDir}/appConfig`);

module.exports = () => {
  const appStructure = {
    Components: {},
    GlobalSchema: {},
    GlobalRoutes: {},
    GlobalServices: {},
    GlobalCommon: {}
  };
  const commonFiles = fs.readdirSync(`${rootFileDir}/app/common`);
  commonFiles.forEach(file => {
    file = file.replace('.js', '');
    funcs = require(`${rootRequireDir}/app/common/${file}`);
    appStructure.GlobalCommon[file] = Object.keys(funcs);
  });
  Object.keys(appConfig.Components).forEach(component => {
    appStructure.Components[component] = {
      files: {},
      config: require(`${rootRequireDir}/app/${component.toLowerCase()}/config`)
    };
    // Controllers
    appStructure.Components[component].config.controllers = Object.keys(
      require(`${rootRequireDir}/app/${component.toLowerCase()}/controllers`)
    );
    // Schema
    if (appConfig.Components[component].Schema) {
      appStructure.Components[component].files.schema = fs
        .readFileSync(
          `${rootFileDir}/app/${component.toLowerCase()}/schema.js`,
          'utf-8'
        )
        .split('\n');
      Object.keys(
        appStructure.Components[component].config.schema
      ).forEach(schemaName => {
        appStructure.GlobalSchema[schemaName] = Object.assign(
          {},
          appStructure.GlobalSchema[schemaName],
          appStructure.Components[component].config.schema[schemaName]
        );
      });
    }

    // Routes
    if (appConfig.Components[component].Routes) {
      appStructure.Components[component].files.routes = fs
        .readFileSync(
          `${rootFileDir}/app/${component.toLowerCase()}/routes.js`,
          'utf-8'
        )
        .split('\n');
      appStructure.Components[component].files.controllers = fs
        .readFileSync(
          `${rootFileDir}/app/${component.toLowerCase()}/controllers.js`,
          'utf-8'
        )
        .split('\n');
      Object.keys(
        appStructure.Components[component].config.routes
      ).forEach(root => {
        appStructure.GlobalRoutes[root] = Object.assign(
          {},
          appStructure.GlobalRoutes[root],
          appStructure.Components[component].config.routes[root]
        );
      });
    }

    //Services
    if (appConfig.Components[component].Services) {
      const componentServices = require(`${rootRequireDir}/app/${component.toLowerCase()}/services`);
      appStructure.GlobalServices[component] = Object.keys(componentServices);
    }
  });
  return { appStructure, appConfig };
};
