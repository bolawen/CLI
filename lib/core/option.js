const program = require("commander");

module.exports = () => {
  program.option("-b --bolawen <a>", "bolawen CLI");
  program.option("-d --dest <dest>", "描述文件,例如 -d /src/components");
  program.option("-f --framework <framework>", "选择框架：vue react node");
};
