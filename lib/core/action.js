const path = require("path");
const { downloadRepo } = require("../utils/repo");
const { pathNotExist } = require("../utils/logger");
const terminalCommand = require("../config/terminal");
const { commandSpawn } = require("../utils/terminal");
const { getCurrentOsVersion } = require("../utils/os");
const { isExists, getRootPath } = require("../utils/file");
const { compile, writeToFile, createDirSync } = require("../utils/file");
const { selectTemplate, selectFileOperation } = require("../utils/inquirer");

exports.createProject = async (projectName) => {
  try {
    const existsResult = isExists(getRootPath(projectName));
    if (existsResult) {
      const selectReuslt = await selectFileOperation(
        projectName,
        getRootPath(projectName)
      );
    }
    const templateResult = await selectTemplate();
    const downResult = await downloadRepo(templateResult, projectName);
  } catch (error) {
    console.log(error);
  }
};

exports.addComponent = async (componentName, dest) => {
  const result = await compile("component.vue3Ts.ejs", { componentName, dest });
  const targetPath = path.resolve(`./${dest}`, `${componentName}.vue`);
  writeToFile(targetPath, result);
};

exports.addPage = async (pageName, dest) => {
  const pageResult = await compile("component.vue3Ts.ejs", { pageName, dest });
  const routerResult = await compile("router.vue3Ts.ejs", { pageName, dest });

  if (createDirSync(`./${dest}`)) {
    const targetPagePath = path.resolve(`./${dest}`, `${pageName}.vue`);
    const targetRoutePath = path.resolve(`./${dest}`, `router.js`);

    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routerResult);
  }
};

exports.openBlog = async () => {
  const currentOsVersion = getCurrentOsVersion();
  const path = terminalCommand?.[currentOsVersion]?.blog;
  if (!path) {
    pathNotExist(`路径不存在`);
    return;
  }
  await commandSpawn("code", [path]);
  await commandSpawn("ttab", [path]);
};

exports.cdResource = async () => {
  const currentOsVersion = getCurrentOsVersion();
  const path = terminalCommand?.[currentOsVersion]?.resource;
  if (!path) {
    pathNotExist(`路径不存在`);
    return;
  }
  await commandSpawn("ttab", [path]);
};

exports.openNginx = async () => {
  const currentOsVersion = getCurrentOsVersion();
  const path = terminalCommand?.[currentOsVersion]?.nginx;
  if (!path) {
    pathNotExist(`路径不存在`);
    return;
  }
  await commandSpawn("code", [path]);
};
