const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

exports.isExists = (templatePath) => {
  return fs.existsSync(templatePath);
};
exports.getRootPath = (templatePath) => {
  return path.normalize(path.join(process.cwd(), templatePath));
};
exports.getTemplatePath = (templatePath) => {
  return path.isAbsolute(templatePath)
    ? templatePath
    : path.normalize(path.join(process.cwd(), templatePath));
};
exports.createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};
exports.writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};
exports.compile = (templateName, data) => {
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
