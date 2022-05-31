import fs from "fs";
import inquirer from "inquirer";

import * as messages from "./messages.js";
import { DEFAULT_TEMPLATE_DIR, DEFAULT_PATH, TEMPLATE_DIR } from "./config.js";
import {
  makeDirAndWriteRecursive,
  readAndWrite,
  warnAndExit,
} from "../lib/functions.js";
import path from "path";

class Commands {
  help() {
    console.log(messages.HELP_MSG);
  }

  init() {
    try {
      if (TEMPLATE_DIR === DEFAULT_TEMPLATE_DIR)
        warnAndExit(messages.ALREADY_INIT);

      inquirer.prompt(questions).then(function (answers) {
        fs.cpSync(
          `${TEMPLATE_DIR}/${answers.storybook ? "Storybook" : null}${
            answers.typescript ? "Typescript" : null
          }Templates`,
          DEFAULT_TEMPLATE_DIR,
          { recursive: true }
        );
        fs.writeFileSync(
          `${DEFAULT_TEMPLATE_DIR}/config.json`,
          JSON.stringify(answers)
        );
        console.log(messages.PROJ_INIT);
      });
    } catch (err) {
      console.log(err);
      warnAndExit(`Cannot create the directory "${DEFAULT_TEMPLATE_DIR}".`);
    }
  }

  add(name: string, userPath: string = DEFAULT_PATH) {
    if (!fs.existsSync(userPath)) warnAndExit(messages.WRONG_PATH_MSG);
    const newPath = path.resolve(userPath, name);

    try {
      fs.mkdirSync(newPath, { recursive: true });
    } catch (err) {
      console.log(err);
      warnAndExit(`Cannot create the directory "${userPath}/${name}".`);
    }

    const files = fs
      .readdirSync(DEFAULT_TEMPLATE_DIR)
      .filter(file => file !== "config.json");
    files.forEach(file => {
      const originPath = path.resolve(DEFAULT_TEMPLATE_DIR, file);
      if (fs.statSync(originPath).isDirectory()) {
        makeDirAndWriteRecursive(
          originPath,
          `${newPath}/${file.replace("$name", name)}`,
          name
        );
      } else {
        readAndWrite(file, name, originPath, newPath);
      }
    });
  }
}

const questions = [
  {
    type: "input",
    name: "path",
    message: "Please, provide the path where your components will be stored",
    default: DEFAULT_PATH,
  },
  {
    type: "confirm",
    name: "storybook",
    message: "Do you want to enable support for Storybook?",
    default: true,
  },
  {
    type: "confirm",
    name: "typescript",
    message: "Does your project use Typescript?",
    default: true,
  },
];

export default Commands;
