const program = require("commander");

const { createProject, addComponent, addPage } = require("./actions");

const createCommands = () => {
  program
    .command("create <projectName> [others...]")
    .description("正在克隆模板")
    .action(createProject);

  program
    .command("addComponent <componentName> [others...]")
    .description(
      "增加 vue 组件，例如：addComponent HelloWord -d src/components [-d src/components]"
    )
    .action((componentName) => {
      addComponent(componentName, program.dest || "/src/components");
    });

  program
    .command("addPage <pageName>")
    .description(
      "增加 vue 页面，例如：addPage HelloWord -d src/pages  [-d src/pages]"
    )
    .action((pageName) => {
      addPage(pageName, program.dest || "/src/pages");
    });
};

module.exports = createCommands;
