#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const fs = require("fs");
const util = require("util");
const folders = ["controllers", "models", "routes", "middlewares", "helpers"];
const createFolders = (root) => {
  if (fs.existsSync(`./${root}`)) {
    console.log(
      `Project Exists with Name: ${root}. Kindly change or rename the folder`
    );
    return;
  } else {
    fs.mkdirSync(`./${root}`, (err) => {
      if (err) console.log(`Couldnt Create Project folder: ${folder}`);
      console.log(`Project Folder ${folder}: created`);
    });
  }

  folders.map((folder) => {
    if (fs.existsSync(`./${root}/${folder}`)) {
      console.log(`${folder} exists already`);
    } else {
      fs.mkdirSync(`./${root}/${folder}`, (err) => {
        if (err) console.log(`Couldnt Create ${folder}`);
        console.log(`${folder}: created`);
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
      console.log(`${folder} exists already`);
    } else {
      fs.writeFile(`./${root}/${folder}/index.js`, "", (err) => {
        if (err) console.log(`Couldnt Create ${folder} Index File`);
        console.log(`${folder}: Index file created`);
      });
    }
  });

  fileNames.map((fileName) => {
    if (fs.existsSync(`./${root}/${fileName}`)) {
      console.log(`${fileName}: already Exists`);
    } else {
      fs.writeFile(`./${root}/${fileName}`, "", (err) => {
        if (err) console.log(`Couldnt Create ${fileName} File`);
        console.log(`${fileName}: created`);
      });
    }
  });
};

const createProject = (name) => {
  try {
    createFolders(name);
    console.log("Folders are created.");
    createFiles(name);
    console.log("Files are created.");
  } catch (e) {
    console.log(e);
    console.log("Error Creating Project Folder");
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
