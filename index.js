#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");
const fs = require("fs");

const {
  loader,
  gitignore,
  package,
  eslint,
  server,
  route,
} = require("./config");

const log = console.log;

const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const info = chalk.bold.blue;
const success = chalk.green;

const folders = ["controllers", "models", "routes", "middlewares", "helpers"];

yargs.version = "1.0.1";
const { name } = yargs.argv;

const createFolders = () => {
  if (fs.existsSync(`./${name}`)) {
    log(
      warning(
        `Project Exists with Name: ${info(
          name
        )}. Kindly change or rename the folder`
      )
    );
    return;
  } else {
    fs.mkdirSync(`./${name}`, (err) => {
      err
        ? log(error(`Couldnt Create Project folder: ${folder}`))
        : log(success(`Project Folder ${folder}: created`));
    });
  }

  folders.map((folder) => {
    if (fs.existsSync(`./${name}/${folder}`)) {
      log(warning(`${folder} exists already`));
    } else {
      fs.mkdirSync(`./${name}/${folder}`, (err) => {
        err
          ? log(error(`Couldnt Create ${folder}`))
          : log(success(`${folder}: created`));
      });
    }
  });
  log(success("Folders created."));
  createFiles(name);
};

const createFiles = () => {
  const fileNames = [
    ".env",
    ".eslintrc.json",
    ".gitignore",
    "loader.js",
    "package.json",
    "index.js",
  ];

  folders.map((folder) => {
    if (fs.existsSync(`./${name}/${folder}/index.js`)) {
      log(warning(`${folder} exists already`));
    } else {
      fs.writeFile(`./${name}/${folder}/index.js`, "", (err) => {
        err
          ? log(error(`Couldnt Create ${folder} Index File`))
          : log(success(`${folder}: Index file created`));
      });

      if (`./${name}/${folder}/index.js` === `./${name}/routes/index.js`) {
        fs.writeFile(`./${name}/${folder}/index.js`, route, function (err) {
          if (err) return console.log(err);
        });
      }
    }
  });

  fileNames.map((fileName) => {
    if (fs.existsSync(`./${name}/${fileName}`)) {
      log(warning(`${fileName}: already Exists`));
    } else {
      switch (fileName) {
        case "package.json":
          fs.writeFile(
            `./${name}/package.json`,
            JSON.stringify(package, null, 4),
            function (err) {
              if (err) return console.log(err);
            }
          );
          break;
        case ".eslintrc.json":
          fs.writeFile(
            `./${name}/.eslintrc.json`,
            JSON.stringify(eslint, null, 4),
            function (err) {
              if (err) return console.log(err);
            }
          );
          break;
        case ".gitignore":
          fs.writeFile(`./${name}/.gitignore`, gitignore, function (err) {
            if (err) return console.log(err);
          });
          break;
        case "index.js":
          fs.writeFile(`./${name}/index.js`, server, function (err) {
            if (err) return console.log(err);
          });
          break;
        case "loader.js":
          fs.writeFile(`./${name}/loader.js`, loader, function (err) {
            if (err) return console.log(err);
          });
          break;
        default:
          fs.writeFile(`./${name}/${fileName}`, "", (err) => {
            err
              ? log(error(`Couldnt Create ${fileName} File`))
              : log(success(`${fileName}: created`));
          });
          break;
      }
    }
  });
  log(success("Files: created."));
  log(
    info(`THE PROJECT IS BOOSTRAPPED. TO GET STARTED: 
  RUN
  cd ${name}
  npm install
  npm run dev
              `)
  );
};

const createProject = (name) => {
  try {
    createFolders(name);
    createFiles(name);
  } catch (e) {
    log(error(e));
    log(info("Error Creating Project"));
  }
};

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
