const program = require("commander");
const { createProject, addComponent, addPage } = require("./action");

module.exports=() => {
  program
    .command("create <projectName>")
    .description("创建项目 例如: create Demo")
    .action(createProject);

  program
    .command("addC <componentName>")
    .description(
      "增加 vue 组件，例如：addComponent HelloWord -d src/components [-d src/components]"
    )
    .action((componentName) => {
      addComponent(componentName, program.dest || "/src/components");
    });

  program
    .command("addP <pageName>")
    .description(
      "增加 vue 页面，例如：addPage HelloWord -d src/pages  [-d src/pages]"
    )
    .action((pageName) => {
      addPage(pageName, program.dest || "/src/pages");
    });
};

