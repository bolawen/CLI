const { exec, spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stdout.pipe(process.stderr);
    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
    commandSpawn,
};
