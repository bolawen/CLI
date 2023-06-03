const ora = require("ora");
const chalk = require('chalk')
const download = require("download-git-repo");
const {templateMap} = require("../config/repo");
const { success, fatal,log } = require("./logger");

exports.downloadRepo = (templateName,projectName) => {
  const selectTemplate = templateMap[templateName];
  return new Promise((resolve, reject) => {
    const spinner = ora("downloading template");
    spinner.start();
    download(selectTemplate, projectName, { clone: true }, (error) => {
      if (error) {
        spinner.fail();
        fatal(templateName + "远程仓库模板下载失败:" + err.message.trim());
        reject();
        return;
      }
      spinner.succeed();
      console.log('\n');
      success(templateName + "  远程模板下载成功！");
      success(`✨   ${chalk.yellow('创建 '+projectName+' 项目成功！')}`)
      success(`✨   ${chalk.green('yarn        安装依赖')}`);
      success(`✨   ${chalk.green('yarn  dev   运行项目')}`);
      console.log('\n');
      resolve();
    });
  });
};
