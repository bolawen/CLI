const program = require("commander");
module.exports = () => {
  program.version(require("../../package").version);
  program.version(require("../../package.json").version, "-v,--version");
};
