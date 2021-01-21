#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const fs = require("fs");

const log = console.log;
chalk.BackgroundColor = "bgGray";
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const info = chalk.bold("cyan");
const success = chalk.green;

const folders = ["controllers", "models", "routes", "middlewares", "helpers"];
const createFolders = (root) => {
  if (fs.existsSync(`./${root}`)) {
    log(
      warning(
        `Project Exists with Name: ${root}. Kindly change or rename the folder`
      )
    );
    return;
  } else {
    fs.mkdirSync(`./${root}`, (err) => {
      err
        ? log(error(`Couldnt Create Project folder: ${folder}`))
        : log(success(`Project Folder ${folder}: created`));
    });
  }

  folders.map((folder) => {
    if (fs.existsSync(`./${root}/${folder}`)) {
      log(warning(`${folder} exists already`));
    } else {
      fs.mkdirSync(`./${root}/${folder}`, (err) => {
        err
          ? log(error(`Couldnt Create ${folder}`))
          : log(success(`${folder}: created`));
      });
    }
  });
};

const createFiles = (root) => {
  const fileNames = [
    ".env",
    ".eslintrc.json",
    ".gitignore",
    "loader.js",
    "package.json",
    "index.js",
  ];

  folders.map((folder) => {
    if (fs.existsSync(`./${root}/${folder}/index.js`)) {
      log(warning(`${folder} exists already`));
    } else {
      fs.writeFile(`./${root}/${folder}/index.js`, "", (err) => {
        err
          ? log(error(`Couldnt Create ${folder} Index File`))
          : log(success(`${folder}: Index file created`));
      });
    }
  });

  fileNames.map((fileName) => {
    if (fs.existsSync(`./${root}/${fileName}`)) {
      log(warning(`${fileName}: already Exists`));
    } else {
      fs.writeFile(`./${root}/${fileName}`, "", (err) => {
        err
          ? log(error(`Couldnt Create ${fileName} File`))
          : log(success(`${fileName}: created`));
      });
    }
  });
};

const createProject = (name) => {
  try {
    createFolders(name);
    log(info("All Folders created."));
    createFiles(name);
    log(info("All Files created."));
  } catch (e) {
    log(error(e));
    log(info("Error Creating Project Folder"));
  }
};

yargs.version = "1.0.1";
const { name } = yargs.argv;
yargs.command({
  command: "start",
  describe: "This Command create a simple Express App Boilerplate",
  builder: {
    name: "Project Name",
    demandOptions: true,
    type: "string",
  },
  handler: createProject(name),
});
