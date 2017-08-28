const copyfiles = require('copyfiles');
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

// This file will prepare the package for the `pack` command or the `publish` command.
// It creates a temp folder with the package output and the standard npm package files

const standardFilenames = [
  "package.json",
  "README",
  "CHANGES",
  "CHANGELOG",
  "HISTORY",
  "LICENSE",
  "LICENCE",
  "NOTICE"
];

const packageJsonProps = [
  "author",
  "bin",
  "bugs",
  "config",
  "dependencies",
  "description",
  "engines",
  "homepage",
  "keywords",
  "license",
  "main",
  "name",
  "repository",
  "typings",
  "version",
];

const destDir = process.argv[2] || path.join("temp", "package");

mkdirp(path.join(process.cwd(), destDir), () => {

  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json")));
  const files =
  [
    ...standardFilenames.map((filename) => {
      return filename.indexOf(".") < 0
        ? filename + ".*"
        : filename;
    }),
    ...(packageJson.files || []).filter((filename) => filename !== "dist").map((filename) => {
      return (fs.lstatSync(path.join(process.cwd(), filename)).isDirectory())
        ? path.join(filename, "**", "*.*")
        : filename;
    }),
    path.join(process.cwd(), destDir),
  ];

  copyfiles(
    files,
    (a) => {
      copyfiles(
        [
          "dist/**/*.*",
          path.join(process.cwd(), destDir),
        ],
        {
          up: 1,
        },
        () => {
          console.log("Copied files to", destDir);

          const pJsPath = path.join(process.cwd(), destDir, "package.json");
          let pJs = JSON.parse(fs.readFileSync(pJsPath).toString());

          const newPJs = {};

          packageJsonProps.map((prop) => {
            if (pJs.hasOwnProperty(prop)) {
              newPJs[prop] = pJs[prop];
            }
          });

          if (newPJs.main) {
            newPJs.main = newPJs.main.replace("dist/", "");
          }
          if (newPJs.typings) {
            newPJs.typings = newPJs.typings.replace("dist/", "");
          }

          const pJsRaw = JSON.stringify(newPJs, null, "  ");

          fs.writeFileSync(pJsPath, pJsRaw);
          console.log("Updated 'main' path in package.json");
        });
    });
});
