/**
 * @description: 通过 promisify 使得 download 可以支持 Promise
 */
const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
const path = require("path");

const { viteVueTsRepo, viteReactTsRepo } = require("../config/repo");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");

const createProject = async (project) => {
  try {
    await download(viteVueTsRepo, project, { clone: true });

    await commandSpawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["install"],
      { cwd: `./${project}` }
    );
  } catch (error) {
    console.log(error);
  }
};

const addComponent = async (componentName, dest) => {
  const result = await compile("component.vue3Ts.ejs", { componentName, dest });

  const targetPath = path.resolve(`./${dest}`, `${componentName}.vue`);

  writeToFile(targetPath, result);
};

const addPage = async (pageName, dest) => {
  const pageResult = await compile("component.vue3Ts.ejs", { pageName, dest });
  const routerResult = await compile("router.vue3Ts.ejs", { pageName, dest });

  if (createDirSync(`./${dest}`)) {
    const targetPagePath = path.resolve(`./${dest}`, `${pageName}.vue`);
    const targetRoutePath = path.resolve(`./${dest}`, `router.js`);

    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routerResult);
  }
};

module.exports = {
  createProject,
  addComponent,
  addPage,
};
