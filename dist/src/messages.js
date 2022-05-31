import chalk from "chalk";
import boxen from "boxen";
import { DEFAULT_PATH } from "./config.js";
export const HELP_MSG = boxen(`
${chalk.cyan.bold("Description:")} 
react-workflow-cli allows you to quickly create React components by providing an interface to implement your own custom template.

${chalk.cyan.bold("Usage:")} 
react-workflow <command> [name] [options]   ||
rwf <command> [name] [options]

${chalk.cyan.bold("Commands:")} 
${chalk.green("init")}     Initialize the cli
${chalk.green("add")}      Creates a new component using the provided name. ${chalk.bold(`default path: '${DEFAULT_PATH}'`)}. 
${chalk.green("info")}     show this screen (so meta)

${chalk.cyan.bold("Options:")} 
${chalk.green("add")} ${chalk.yellow("-p | --path")}  override default path.

${chalk.cyan.bold("License:")}
react-workflow-cli and all dependencies are under the MIT license

${chalk.cyan.bold("Author:")}
Justin Wallace (${chalk.underline('https://github.com/jpwallace22')})

${chalk.cyan.bold("Contributors:")} 
Gianni Valdambrini (${chalk.underline('https://github.com/gvaldambrini')})
Roberto Di Lillo (${chalk.underline('https://github.com/koop4')})
Valentino Gagliardi (${chalk.underline('https://github.com/valentinogagliardi/')})
`, {
    textAlignment: "left",
    borderStyle: "classic",
    padding: 1,
    title: chalk.magentaBright.bold.bgCyanBright("---- React Workflow CLI ----"),
    titleAlignment: "center",
});
export const WRONG_PATH_MSG = `The path provided does not exist. Double-check your spelling and try again.`;
export const PROJ_INIT = boxen(`${chalk.green("Successfully Initialized")}
  
  Templates & config.json are located in the .react-templates directory

  Edit the templates to best fit your project needs. Anywhere you add ${chalk.cyan("$name")} will be replaced with the designated components name upon creation. It is inherently recursive, so feel free to add sub-directories as well. 

  run ${chalk.bgGrey(" rwf info ")} for more information.

  🤘`, { borderStyle: 'classic', padding: 1 });
export const ALREADY_INIT = `The project has already been initialized. You can edit the config or templates in the the .react-templates directory.`;
