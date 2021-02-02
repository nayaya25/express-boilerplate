module.exports.eslint = {
  env: {
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};

module.exports.gitignore = "node_modules\n.env";

module.exports.loader = `const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const router = require("./routes");

// MiddleWares Set Up
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, //10MB max file(s) size
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cors());

app.use(router);

module.exports = app;`;

module.exports.package = {
  name: "",
  version: "1.0.0",
  description: "",
  repository: "",
  main: "index.js",
  scripts: {
    dev: "nodemon index.js",
    start: "node index.js",
    test: 'echo "Error: no test specified" && exit 1',
  },
  keywords: [],
  author: "",
  license: "ISC",
  devDependencies: {
    eslint: "^7.15.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-config-prettier": "^7.0.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^3.2.0",
    prettier: "^2.2.1",
  },
  dependencies: {
    bcrypt: "^5.0.0",
    "body-parser": "^1.19.0",
    compression: "^1.7.4",
    cors: "^2.8.5",
    dotenv: "^8.2.0",
    express: "^4.17.1",
    "express-fileupload": "^1.2.0",
    "express-validator": "^6.8.0",
    helmet: "^4.2.0",
    jsonwebtoken: "^8.5.1",
    morgan: "^1.10.0",
  },
};

module.exports.route = `const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Welcome to the minimalistic Express API starter");
});

module.exports = router;
`;

module.exports.server = `const app = require("./loader");
const PORT = 3001;
app.listen(PORT, () => {
  console.log(\`Server Started at Port: \${PORT}\`);
});
`;
