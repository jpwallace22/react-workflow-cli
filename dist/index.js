#! /usr/bin/env node
"use strict";
/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var commander_1 = __importDefault(require("commander"));
var commands_1 = __importDefault(require("./src/commands"));
var config_1 = require("./src/config");
var main = function () {
    var commands = new commands_1.default();
    commander_1.default.arguments("<cmd> [name]");
    commander_1.default.command("help").action(function () { return commands.help(); });
    commander_1.default
        .command("add [name]")
        .option("-p, --path [path]")
        .action(function (name, opt) {
        commands.add(name, opt.path);
    });
    commander_1.default.command("init").action(function () {
        commands.init();
    });
    commander_1.default.command("config").action(function () {
        commands.config();
    });
    commander_1.default.command("test").action(function () {
        console.log(JSON.parse(fs_1.default.readFileSync("".concat(config_1.DEFAULT_DIR, "/config.json"), "utf-8")));
    });
    commander_1.default.parse(process.argv);
};
main();
