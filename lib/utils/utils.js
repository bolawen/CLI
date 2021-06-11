const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const compile = (templateName, data) => {
  return new Promise((resolve, reject) => {
    const templatePosition = `../templates/${templateName}`;
    const templatePath = path.resolve(__dirname, templatePosition);
    ejs.renderFile(templatePath, { data }, {}, (error, result) => {
      if (error) {
        console.log(error);
        rejects();
        return;
      }
      resolve(result);
    });
  });
};

const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};

const writeToFile = (path, content) => {
    return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createDirSync
};
