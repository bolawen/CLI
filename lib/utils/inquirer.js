const ora = require("ora");
const chalk = require('chalk')
const inquirer = require("inquirer");
const exec = require("child_process").exec;
const { success, fatal } = require("./logger");
const { templateList } = require("../config/repo");

exports.selectTemplate = () => {
  return new Promise((resolve, reject) => {
    const questionList = [
      {
        type: "list",
        message: "请选择一种模板:",
        name: "template",
        choices: templateList,
        validate(val) {
          if (val === "") return "必须选择一种模板！";
          return true;
        },
      },
    ];
    inquirer.prompt(questionList).then((answers) => {
      const { template } = answers;
      resolve(template);
    });
  });
};
exports.selectFileOperation = (templateName,templatePath) => {
  return new Promise((resolve, reject) => {
    const choicesList = [
      {
        name: "operation",
        type: "list",
        message: `${chalk.cyan(templateName)} 项目已经存在`,
        choices: [
          { name: "覆盖", value: "overwrite" },
          {
            name: "合并",
            value: "merge",
          },
          {
            name: "返回",
            value: false,
          },
        ],
      },
    ];
    inquirer.prompt(choicesList).then(async (answers) => {
      const { operation } = answers;
      if (!operation) {
        resolve();
      } else if (operation === "overwrite") {
        const spinner = ora("Removing Template");
        spinner.start();
        await exec(`rm -rf ${templatePath}`);
        spinner.succeed();
        resolve();
      }
    });
  });
};
