#! /usr/bin/env node
"use strict";
/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 */
var fs = require("fs");
var program = require("commander");
var Commands = require("./src/commands");
var DEFAULT_DIR = require("./src/config").DEFAULT_DIR;
var main = function () {
    var commands = new Commands();
    program.arguments("<cmd> [name]");
    program.command("help").action(function () { return commands.help(); });
    program
        .command("add [name]")
        .option("-p, --path [path]")
        .action(function (name, opt) {
        commands.add(name, opt.path);
    });
    program.command("init").action(function () {
        commands.init();
    });
    program.command("config").action(function () {
        commands.config();
    });
    program.command("test").action(function () {
        console.log(JSON.parse(fs.readFileSync("".concat(DEFAULT_DIR, "/config.json"), "utf-8")));
    });
    program.parse(process.argv);
};
main();
