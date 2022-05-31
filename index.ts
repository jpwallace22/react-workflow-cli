#! /usr/bin/env node

/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 */

import fs from "fs";
import program from "commander";
import Commands from "./src/commands.js";
import { DEFAULT_TEMPLATE_DIR } from "./src/config.js";

(() => {
  const commands = new Commands();

  program.arguments("<cmd> [name]");

  program.command("help").action(() => commands.help());
  program.command("info").action(() => commands.help());

  program
    .command("add [name]")
    .option("-p, --path [path]")
    .action((name, opt) => {
      commands.add(name, opt.path);
    });

  program.command("init").action(() => {
    commands.init();
  });

  program.command("test").action(() => {
    console.log(
      JSON.parse(
        fs.readFileSync(`${DEFAULT_TEMPLATE_DIR}/config.json`, "utf-8")
      )
    );
  });

  program.parse(process.argv);
})();
