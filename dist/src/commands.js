import fs from "fs";
import inquirer from "inquirer";
import * as messages from "./messages.js";
import { DEFAULT_TEMPLATE_DIR, DEFAULT_PATH, TEMPLATE_DIR } from "./config.js";
import chalk from "chalk";
const warnAndExit = (msg) => {
    console.log(chalk.yellow(msg));
    process.exit(-1);
};
class Commands {
    help() {
        console.log(messages.HELP_MSG);
    }
    init() {
        try {
            if (TEMPLATE_DIR === DEFAULT_TEMPLATE_DIR)
                warnAndExit(messages.ALREADY_INIT);
            inquirer.prompt(questions).then(function (answers) {
                fs.cpSync(TEMPLATE_DIR, DEFAULT_TEMPLATE_DIR, { recursive: true });
                fs.writeFileSync(`${DEFAULT_TEMPLATE_DIR}/config.json`, JSON.stringify(answers));
                console.log(messages.PROJ_INIT);
            });
        }
        catch (err) {
            console.log(err);
            warnAndExit(`Cannot create the directory "${DEFAULT_TEMPLATE_DIR}".`);
        }
    }
    add(name, path = DEFAULT_PATH) {
        if (!fs.existsSync(path))
            warnAndExit(messages.WRONG_PATH_MSG);
        const newPath = `${path}/${name}`;
        try {
            fs.mkdirSync(newPath, { recursive: true });
        }
        catch (err) {
            console.log(err);
            warnAndExit(`Cannot create the directory "${path}/${name}".`);
        }
        const regex = /\$+(\()?name+(, )?(\{([\D]{0,})?\})?(\))?/gm;
        const files = fs
            .readdirSync(DEFAULT_TEMPLATE_DIR)
            .filter(file => file !== "config.json");
        files.forEach(file => {
            try {
                const data = fs.readFileSync(`${DEFAULT_TEMPLATE_DIR}/${file}`, "utf-8");
                const updatedData = data.replace(regex, name);
                const updatedFileName = file.replace("$name", name);
                fs.writeFileSync(`${newPath}/${file}`, updatedData, "utf-8");
                fs.renameSync(`${newPath}/${file}`, `${newPath}/${updatedFileName}`);
                console.log(`Created ${newPath}/${updatedFileName}`);
            }
            catch (err) {
                console.log(err);
                warnAndExit(`Error creating "${newPath}/${file.replace("$name", name)}".`);
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
        message: "Do you want to enable the support for Storybook?",
        default: true,
    },
];
export default Commands;
